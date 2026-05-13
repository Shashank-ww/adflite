"use server";

import { prisma } from "@/lib/prisma";

import { authOptions } from "@/auth";

import { getServerSession } from "next-auth";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(
  formData: FormData
) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },

    data: {
      name:
        formData.get("name") as string,

      headline:
        formData.get(
          "headline"
        ) as string,

      bio:
        formData.get("bio") as string,

      location:
        formData.get(
          "location"
        ) as string,

      status:
      formData.get("status") as string,

      hourlyRate:
      formData.get("hourlyRate") as string,

      experience: Number(
      formData.get("experience")
      ),

      languages: (
      formData.get("languages") as string
      )
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    },
  });

  revalidatePath("/profile");
  redirect("/profile");
}