import { requireAdmin } from "@/lib/admin-auth";

export async function requireAdminAction() {
    await requireAdmin();
}