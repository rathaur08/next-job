import { cookies, headers } from "next/headers";
import { getIPAddress } from "./location";
import crypto from "crypto";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";
import { SESSION_LIFETIME } from "@/config/constant";
import { log } from "console";

const generateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
}

const createUserSession = async ({ token, userId, ip, userAgent }) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  // console.log("userId", userId);
  // console.log("token", token);
  // console.log("IP", ip);
  // console.log("userAgent", userAgent);
  // console.log("hashedToken", hashedToken);

  const [session] = await db.insert(sessions).values({
    id: hashedToken,
    userId,
    ip,
    userAgent,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
  });

  return session;
};

export const createSessionAndCookies = async (userId) => {

  // console.log("userId", userId);

  const token = generateSessionToken();
  const ip = await getIPAddress();
  const headersList = await headers();

  await createUserSession({
    userId,
    token,
    ip,
    userAgent: headersList.get("user-agent") || " ",
  });

  const createCookie = await cookies();

  createCookie.set("session", token, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
  });

}