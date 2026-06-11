"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { revalidatePath } from "next/cache";

/* =========================
   APPLY TO PROJECT
========================= */

export async function applyToProject(formData: FormData) {
  const session = await getServerSession(authOptions);

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

  if (!user.resumeUrl) {
  return {
    ok: false,
    status: "resume_required",
  };
}

  const projectId = formData.get("projectId") as string;

  // AUTO-RESUME SOURCE (IMPORTANT)
  const resumeUrl = user.resumeUrl || null;

  const message =
  formData.get("message") as string;

  const phone = formData.get("phone") as string;

  const existing = await prisma.application.findFirst({
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

  const project =
  await prisma.project.findUnique({
    where: {
      id: projectId,
    },

    select: {
      id: true,
      slug: true,
      title: true,

      user: {
        select: {
          id: true,
        },
      },
    },
  });

  await prisma.application.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      project: {
        connect: { id: projectId },
      },
      email: user.email,
      phone,

      // AUTOMATIC URL
      resume: user.resumeUrl,
    },
  });

  if (
  message?.trim() &&
  project?.user?.id
) {

await prisma.message.create({
  data: {
    senderId: user.id,

    receiverId:
      project.user.id,

    projectId,

    text: `Application for: ${project.title}

${message.trim()}`,
  },
});

}

revalidatePath("/");
revalidatePath("/applications");
revalidatePath(`/projects/${project?.slug}`);
revalidatePath("/messages");

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