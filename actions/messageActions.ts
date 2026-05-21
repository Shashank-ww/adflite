"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export async function sendMessage(
  receiverId: string,
  text: string,
  projectId?: string
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const sender =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!sender) {
    throw new Error("User not found");
  }

const message =
  await prisma.message.create({
    data: {
      text,
      senderId: sender.id,
      receiverId,
      projectId,
    },
  });

revalidatePath("/messages");

return message;
}