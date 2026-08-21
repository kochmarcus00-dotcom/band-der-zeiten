import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderEmailItem = {
    productName: string;
    quantity: number;
    price: unknown;
};

type SendOrderEmailParams = {
    to: string;
    firstName: string;
    orderId: string;
    subtotal: unknown;
    shipping: unknown;
    total: unknown;
    items: OrderEmailItem[];
};

function euro(value: unknown) {
    return Number(value).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
    });
}

export async function sendOrderEmail({
    to,
    firstName,
    orderId,
    subtotal,
    shipping,
    total,
    items,
}: SendOrderEmailParams) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY fehlt.");
    }

    const itemsHtml = items
        .map(
            (item) => `
                <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eee;">
                        ${item.productName}
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;">
                        ${item.quantity}
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;">
                        ${euro(Number(item.price) * item.quantity)}
                    </td>
                </tr>
            `
        )
        .join("");

    const { data, error } = await resend.emails.send({
        from: "Nordwind <nordwind@valhalla-im-herzen.de>",
        to: [to],
        subject: `Deine Bestellung #${orderId} – VikingShop`,
        html: `
            <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#222;">
                
                <h1 style="font-size:28px;">
                    Vielen Dank, ${firstName}!
                </h1>

                <p>
                    deine Zahlung war erfolgreich und deine Bestellung
                    wurde bei VikingShop aufgenommen.
                </p>

                <p>
                    <strong>Bestellnummer:</strong><br>
                    #${orderId}
                </p>

                <h2 style="margin-top:30px;">Deine Bestellung</h2>

                <table style="width:100%;border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th style="text-align:left;padding-bottom:10px;">
                                Artikel
                            </th>
                            <th style="text-align:center;padding-bottom:10px;">
                                Menge
                            </th>
                            <th style="text-align:right;padding-bottom:10px;">
                                Betrag
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div style="margin-top:25px;border-top:1px solid #ddd;padding-top:15px;">
                    <p>
                        Zwischensumme:
                        <strong>${euro(subtotal)}</strong>
                    </p>

                    <p>
                        Versand:
                        <strong>${euro(shipping)}</strong>
                    </p>

                    <p style="font-size:20px;">
                        Gesamt:
                        <strong>${euro(total)}</strong>
                    </p>
                </div>

                <p style="margin-top:35px;">
                    Deine Bestellung wird nun vorbereitet.
                </p>

                <p>
                    Vielen Dank für dein Vertrauen!
                </p>

                <p style="margin-top:40px;color:#777;font-size:13px;">
                    VikingShop
                </p>

            </div>
        `,
    });

    if (error) {
        throw new Error(
            `Resend Fehler: ${error.message}`
        );
    }

    return data;
}