import { redirect } from "next/navigation";
import { isAdminAuthenticated, loginAdmin } from "@/lib/admin-auth";
import PasswordInput from "./PasswordInput";

async function login(formData: FormData) {
    "use server";

    const password = String(formData.get("password") || "");

    const success = await loginAdmin(password);

    if (!success) {
        redirect("/admin-login?error=1");
    }

    redirect("/admin/bestellungen");
}

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const authenticated = await isAdminAuthenticated();

    if (authenticated) {
        redirect("/admin/bestellungen");
    }

    const params = await searchParams;
    const hasError = params.error === "1";

    return (
        <main className="min-h-screen bg-[#090909] px-6 py-24 text-white">
            <div className="mx-auto max-w-md">
                <div className="mb-10 text-center">
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c8a46b]">
                        VikingShop
                    </p>

                    <h1 className="font-serif text-4xl">
                        Adminbereich
                    </h1>

                    <p className="mt-4 text-stone-400">
                        Dieser Bereich ist geschützt.
                    </p>
                </div>

                <form
                    action={login}
                    className="rounded-3xl border border-white/10 bg-[#111] p-8"
                >
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm text-stone-300"
                    >
                        Passwort
                    </label>

                    <PasswordInput />

                    {hasError && (
                        <p className="mt-3 text-sm text-red-400">
                            Falsches Passwort.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-xl bg-[#c8a46b] px-5 py-3 font-semibold text-[#111] transition hover:bg-[#d8b16d]"
                    >
                        Anmelden
                    </button>
                    <div className="mt-4 flex gap-3">
                        <a
                            href="/"
                            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-stone-400 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                        >
                            ← Zur Hauptseite
                        </a>

                        <a
                            href="/vikingshop"
                            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-stone-400 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                        >
                            Zum Shop →
                        </a>
                    </div>
                </form>
            </div>
        </main>
    );
}