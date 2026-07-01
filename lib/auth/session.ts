import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const SESSION_COOKIE_NAME = "session_token";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionUser {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

function getAuthSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    sub: String(user.id),
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getAuthSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecretKey());

    if (!payload.sub || typeof payload.email !== "string") return null;

    return {
      id: Number(payload.sub),
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : null,
      role: typeof payload.role === "string" ? payload.role : "admin",
    };
  } catch {
    return null;
  }
}

/**
 * Verifies the session token and re-checks the user still exists in the DB.
 * Returns null if the token is invalid/expired or the user was deleted.
 */
export async function getCurrentUser(
  token: string | undefined
): Promise<SessionUser | null> {
  if (!token) return null;

  const sessionUser = await verifySessionToken(token);
  if (!sessionUser) return null;

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, sessionUser.id))
    .limit(1);

  return user ?? null;
}
