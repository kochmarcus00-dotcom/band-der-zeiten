"use client";

import { useFormStatus } from "react-dom";

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:border-red-500 hover:bg-red-500/10 disabled:cursor-wait disabled:opacity-50"
        >
            {pending ? "Löscht..." : "Löschen"}
        </button>
    );
}

type Props = {
    productName: string;
    productId: string;
    deleteProduct: (formData: FormData) => void | Promise<void>;
};

export default function DeleteProductButton({
    productName,
    productId,
    deleteProduct,
}: Props) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const confirmed = window.confirm(
            `Möchtest du „${productName}“ wirklich löschen?\n\nDas Produkt und sein gespeichertes Produktbild werden endgültig gelöscht.`
        );

        if (!confirmed) {
            event.preventDefault();
        }
    }

    return (
        <form action={deleteProduct} onSubmit={handleSubmit}>
            <input
                type="hidden"
                name="id"
                value={productId}
            />

            <DeleteButton />
        </form>
    );
}