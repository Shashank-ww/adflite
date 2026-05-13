"use server";

import { prisma } from "@/lib/prisma";

import { authOptions } from "@/auth";

import { getServerSession } from "next-auth";

import { revalidatePath } from "next/cache";

export async function applyToProject(
  projectId: string
) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.application.create({
    data: {
      userId: user.id,
      projectId,
    },
  });

  revalidatePath("/");
}