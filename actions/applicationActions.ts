"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { revalidatePath } from "next/cache";

/* =========================
   APPLY TO PROJECT
========================= */

export async function applyToProject(
  formData: FormData
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

const projectId =
  formData.get(
    "projectId"
  ) as string;

const email = user.email;

const resume =
  formData.get("resume") as string;

  const phone =
    formData.get("phone") as string;

  const existing =
    await prisma.application.findFirst({
      where: {
        userId: user.id,
        projectId,
      },
    });

  if (existing) {
    return {
      ok: true,
      status: "already_applied",
    };
  }

await prisma.application.create({
  data: {
    user: {
      connect: {
        id: user.id,
      },
    },
    project: {
      connect: {
        id: projectId,
      },
    },
    email,
    resume,
    phone,
  },
});

  revalidatePath("/");
  revalidatePath("/applications");

  return {
    ok: true,
    status: "applied",
  };
}

/* =========================
   WITHDRAW APPLICATION
========================= */

export async function withdrawApplication(
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

  await prisma.application.deleteMany({
    where: {
      userId: user.id,
      projectId,
    },
  });

  revalidatePath("/");
  revalidatePath("/applications");

  return {
    success: true,
  };
}