import { prisma } from "@/lib/prisma";
import { sendResetEmail } from "@/lib/mail";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  // Silently succeed if no user – prevents email enumeration
  if (user) {
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 min
    await prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt: expires }
    });
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;
    await sendResetEmail(user.email, link);
  }

  return NextResponse.json({ ok: true });
}
