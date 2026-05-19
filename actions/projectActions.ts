"use server";

import {slugify} from "@/lib/slugify";

import { prisma } from "@/lib/prisma";

import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

function generateSlug(title: string) {
  return (
    slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    }) +
    "-" +
    Date.now()
  );
}

/* =========================
   CREATE PROJECT
========================= */

export async function createProject(
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

  const title =
    formData.get("title") as string;

  const slug = generateSlug(title);

  await prisma.project.create({
    data: {
      title,

      slug,

      description:
        formData.get(
          "description"
        ) as string,

      budget:
        formData.get("budget") as string,

      timeline:
        formData.get("timeline") as string,

      category:
        formData.get("category") as string,

      location:
        formData.get("location") as string,

      userId: user.id,
    },
  });

  revalidatePath("/");

  redirect("/");
}


/* =========================
   SAVE PROJECT
========================= */

export async function saveProject(projectId: string) {
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

  const existing =
    await prisma.savedProject.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId,
        },
      },
    });

  // UNSAVE
  if (existing) {
    await prisma.savedProject.delete({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId,
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/saved");

    return {
      status: "unsaved",
    };
  }

  // SAVE
  await prisma.savedProject.create({
    data: {
      userId: user.id,
      projectId,
    },
  });

  revalidatePath("/");
  revalidatePath("/saved");

  return {
    status: "saved",
  };
}

/* =========================
   UPDATE PROJECT
========================= */

export async function updateProject(
  projectId: string,
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

  const existingProject =
    await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

  if (!existingProject) {
    throw new Error(
      "Project not found"
    );
  }

  if (
    existingProject.userId !== user.id
  ) {
    throw new Error("Forbidden");
  }

  const updatedProject =
    await prisma.project.update({
      where: {
        id: projectId,
      },

      data: {
        title:
          formData.get("title") as string,

        description:
          formData.get(
            "description"
          ) as string,

        budget:
          formData.get("budget") as string,

        timeline:
          formData.get(
            "timeline"
          ) as string,

        category:
          formData.get(
            "category"
          ) as string,

        location:
          formData.get(
            "location"
          ) as string,
      },
    });

  revalidatePath("/");
  revalidatePath("/profile");

  revalidatePath(
    `/projects/${updatedProject.slug}`
  );

  redirect(
    `/projects/${updatedProject.slug}`
  );
}

/* =========================
   DELETE PROJECT
========================= */

export async function deleteProject(
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

  if (project.userId !== user.id) {
    throw new Error("Forbidden");
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath("/");

  redirect("/");
}

