import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/admin-auth-action";
import LogoutButton from "../LogoutButton";
import AdminHeader from "../AdminHeader";

async function updateOrderStatus(formData: FormData) {
    "use server";

    await requireAdminAction();

    // alles darunter bleibt exakt wie es ist

    const orderId = String(formData.get("orderId") || "");
    const status = String(formData.get("status") || "");

    const allowedStatuses = [
        "PENDING",
        "PAID",
        "PROCESSING",
        "SHIPPED",
        "COMPLETED",
        "CANCELLED",
    ];

    if (!orderId || !allowedStatuses.includes(status)) {
        return;
    }

    await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: status as
                | "PENDING"
                | "PAID"
                | "PROCESSING"
                | "SHIPPED"
                | "COMPLETED"
                | "CANCELLED",
        },
    });

    revalidatePath("/admin/bestellungen");
}

function formatPrice(value: unknown) {
    return Number(value).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
    });
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("de-DE", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

function paymentLabel(status: string) {
    switch (status) {
        case "PAID":
            return "Bezahlt";
        case "FAILED":
            return "Fehlgeschlagen";
        case "REFUNDED":
            return "Erstattet";
        default:
            return "Offen";
    }
}

function orderLabel(status: string) {
    switch (status) {
        case "PAID":
            return "Bezahlt";
        case "PROCESSING":
            return "In Bearbeitung";
        case "SHIPPED":
            return "Versendet";
        case "COMPLETED":
            return "Abgeschlossen";
        case "CANCELLED":
            return "Storniert";
        default:
            return "Offen";
    }
}

export default async function BestellungenAdmin() {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return (
        <main className="min-h-screen bg-[#090909] px-6 py-12 text-white">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c8a46b]">
                        VikingShop Admin
                    </p>

                    <AdminHeader title="Bestellungen" />

                    <p className="mt-3 text-stone-400">
                        {orders.length}{" "}
                        {orders.length === 1
                            ? "Bestellung"
                            : "Bestellungen"}{" "}
                        insgesamt.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-[#101010] p-10 text-center">
                        <p className="text-xl text-stone-300">
                            Noch keine Bestellungen vorhanden.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <article
                                key={order.id}
                                className="rounded-2xl border border-white/10 bg-[#101010] p-6"
                            >
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="font-serif text-2xl">
                                                Bestellung #{order.id}
                                            </h2>

                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs ${order.paymentStatus === "PAID"
                                                    ? "border-green-500/40 text-green-400"
                                                    : order.paymentStatus === "FAILED"
                                                        ? "border-red-500/40 text-red-400"
                                                        : "border-[#c8a46b]/40 text-[#c8a46b]"
                                                    }`}
                                            >
                                                Zahlung:{" "}
                                                {paymentLabel(
                                                    order.paymentStatus
                                                )}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm text-stone-500">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>

                                    <div className="text-left lg:text-right">
                                        <p className="text-sm text-stone-500">
                                            Gesamt
                                        </p>

                                        <p className="text-2xl font-semibold text-[#c8a46b]">
                                            {formatPrice(order.total)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-8 lg:grid-cols-2">

                                    <div>
                                        <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[#c8a46b]">
                                            Kunde
                                        </h3>

                                        <div className="space-y-1 text-stone-300">
                                            <p>
                                                <strong>
                                                    {order.customer.firstName}{" "}
                                                    {order.customer.lastName}
                                                </strong>
                                            </p>

                                            <p>{order.customer.email}</p>

                                            {order.customer.phone && (
                                                <p>
                                                    {order.customer.phone}
                                                </p>
                                            )}

                                            <p className="pt-2">
                                                {order.customer.street}{" "}
                                                {order.customer.houseNumber}
                                            </p>

                                            <p>
                                                {order.customer.postalCode}{" "}
                                                {order.customer.city}
                                            </p>

                                            <p>{order.customer.country}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[#c8a46b]">
                                            Produkte
                                        </h3>

                                        <div className="space-y-3">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between border-b border-white/5 pb-3"
                                                >
                                                    <div>
                                                        <p className="text-stone-200">
                                                            {item.productName}
                                                        </p>

                                                        <p className="text-sm text-stone-500">
                                                            {item.quantity} ×{" "}
                                                            {formatPrice(
                                                                item.price
                                                            )}
                                                        </p>
                                                    </div>

                                                    <p className="text-stone-300">
                                                        {formatPrice(
                                                            Number(item.price) *
                                                            item.quantity
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <p className="text-sm text-stone-500">
                                            Bestellstatus
                                        </p>

                                        <p className="mt-1 text-stone-200">
                                            {orderLabel(order.status)}
                                        </p>
                                    </div>

                                    <form
                                        action={updateOrderStatus}
                                        className="flex flex-wrap gap-3"
                                    >
                                        <input
                                            type="hidden"
                                            name="orderId"
                                            value={order.id}
                                        />

                                        <select
                                            name="status"
                                            defaultValue={order.status}
                                            className="rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                        >
                                            <option value="PENDING">
                                                Offen
                                            </option>
                                            <option value="PAID">
                                                Bezahlt
                                            </option>
                                            <option value="PROCESSING">
                                                In Bearbeitung
                                            </option>
                                            <option value="SHIPPED">
                                                Versendet
                                            </option>
                                            <option value="COMPLETED">
                                                Abgeschlossen
                                            </option>
                                            <option value="CANCELLED">
                                                Storniert
                                            </option>
                                        </select>

                                        <button
                                            type="submit"
                                            className="rounded-xl border border-[#c8a46b]/50 px-5 py-3 text-sm text-[#c8a46b] transition hover:bg-[#c8a46b] hover:text-[#111]"
                                        >
                                            Status speichern
                                        </button>
                                    </form>
                                </div>

                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}