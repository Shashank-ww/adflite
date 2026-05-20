import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

const RESERVED = [
  "admin",
  "settings",
  "messages",
  "projects",
  "profile",
  "api",
];

export async function GET(
  req: Request
) {

  const { searchParams } =
    new URL(req.url);

  const username =
    searchParams
      .get("username")
      ?.trim()
      .toLowerCase();

  if (!username) {
    return NextResponse.json({
      available: false,
    });
  }

  const valid =
    /^[a-z0-9]+$/.test(username);

  if (!valid) {
    return NextResponse.json({
      available: false,
      error:
        "only lowercase letters and numbers",
    });
  }

  if (
    RESERVED.includes(username)
  ) {
    return NextResponse.json({
      available: false,
      error:
        "reserved username",
    });
  }

  const existing =
    await prisma.user.findUnique({
      where: {
        username,
      },
    });

  return NextResponse.json({
    available: !existing,
  });
}