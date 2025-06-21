import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token, password } = await req.json();

  const record = await prisma.passwordReset.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: hash }
    }),
    prisma.passwordReset.delete({ where: { id: record.id } })
  ]);

  return NextResponse.json({ ok: true });
}
