import { put } from "@vercel/blob";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData =
    await request.formData();

  const file =
    formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  if (
    file.type !==
    "application/pdf"
  ) {
    return NextResponse.json(
      { error: "PDF only" },
      { status: 400 }
    );
  }

  if (
    file.size >
    5 * 1024 * 1024
  ) {
    return NextResponse.json(
      { error: "Max 5MB" },
      { status: 400 }
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },

      select: {
        id: true,
      },
    });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const blob = await put(
    `resumes/${user.id}/resume.pdf`,
    file,
    {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    }
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      resumeUrl: blob.url,
      resumeUpdatedAt:
        new Date(),
      resumeFileName: file.name,
      resumeSize: file.size,
    },
  });

  return NextResponse.json({
    success: true,
    url: blob.url,
  });
}