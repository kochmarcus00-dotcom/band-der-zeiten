import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Keine Datei ausgewählt." },
                { status: 400 }
            );
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Bitte nur Bilder hochladen." },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "Das Bild darf maximal 4 MB groß sein." },
                { status: 400 }
            );
        }

        const extension =
            file.name.split(".").pop()?.toLowerCase() || "jpg";

        const filename = `products/${crypto.randomUUID()}.${extension}`;

        const blob = await put(filename, file, {
            access: "public",
        });

        return NextResponse.json({
            url: blob.url,
        });
    } catch (error) {
        console.error("Upload error:", error);

        return NextResponse.json(
            { error: "Bild konnte nicht hochgeladen werden." },
            { status: 500 }
        );
    }
}