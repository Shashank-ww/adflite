"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { revalidatePath } from "next/cache";

export async function pingProject(
  projectId: string
) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    throw new Error("User not found");
  }

  const project =
    await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

  if (!project) {
    throw new Error("Project not found");
  }

  // prevent self ping
  if (project.userId === user.id) {
    return {
      ok: false,
      message:
        "Cannot ping your own listing",
    };
  }

  // prevent duplicate ping
  const existing =
    await prisma.ping.findFirst({
      where: {
        senderId: user.id,
        projectId,
      },
    });

  if (existing) {
    return {
      ok: true,
      duplicate: true,
    };
  }

  await prisma.ping.create({
    data: {
      senderId: user.id,
      projectId,
    },
  });

  revalidatePath("/");
  revalidatePath("/pings");

  return { ok: true };
}