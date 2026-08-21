import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "viking_admin_session";
const SESSION_MAX_AGE = 60 * 10; // 10 Minuten

function getSecret() {
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!secret) {
        throw new Error("ADMIN_SESSION_SECRET fehlt.");
    }

    return secret;
}

function createSignature(payload: string) {
    return crypto
        .createHmac("sha256", getSecret())
        .update(payload)
        .digest("hex");
}

function createSessionToken() {
    const timestamp = Date.now().toString();
    const payload = `admin.${timestamp}`;
    const signature = createSignature(payload);

    return `${payload}.${signature}`;
}

function isValidSession(token: string | undefined) {
    if (!token) {
        return false;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
        return false;
    }

    const [role, timestamp, signature] = parts;

    if (role !== "admin") {
        return false;
    }

    const timestampNumber = Number(timestamp);

    if (!Number.isFinite(timestampNumber)) {
        return false;
    }

    const age = Date.now() - timestampNumber;

    if (age < 0 || age > SESSION_MAX_AGE * 1000) {
        return false;
    }

    const payload = `${role}.${timestamp}`;
    const expectedSignature = createSignature(payload);

    try {
        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );
    } catch {
        return false;
    }
}

export async function isAdminAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    return isValidSession(token);
}

export async function requireAdmin() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        redirect("/admin-login");
    }
}

export async function requireAdminApi() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        return false;
    }

    return true;
}
export async function loginAdmin(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        throw new Error("ADMIN_PASSWORD fehlt.");
    }

    if (password !== adminPassword) {
        return false;
    }

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, createSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE,
    });

    return true;
}

export async function logoutAdmin() {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
}