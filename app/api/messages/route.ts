import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json([]);
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    return NextResponse.json([]);
  }

  const { searchParams } =
    new URL(req.url);

  const receiverId =
    searchParams.get("receiverId");

  if (!receiverId) {
    return NextResponse.json([]);
  }

  const messages =
    await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: user.id,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: user.id,
          },
        ],
      },

      orderBy: {
        createdAt: "asc",
      },
    });

  return NextResponse.json(messages);
}