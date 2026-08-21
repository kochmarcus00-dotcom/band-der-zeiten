"use server";

import { logoutAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function adminLogout() {
    await logoutAdmin();
    redirect("/admin-login");
}