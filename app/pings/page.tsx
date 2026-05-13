"use server";

import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function PingsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },

      include: {
        projects: {
          include: {
            pings: {
              include: {
                sender: true,
              },
            },
          },
        },
      },
    });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">

      <div className="mb-4">

        <Link
          href="/"
          className="text-sm hover:underline"
        >
          ← home
        </Link>

      </div>

      <h1 className="mb-6 text-xl font-bold">
        pings
      </h1>

      <div className="flex flex-col gap-4">

        {user.projects.map((project: any) => (
          <div
            key={project.id}
            className="border border-gray-300 bg-white p-4"
          >

            <h2 className="font-bold">
              {project.title}
            </h2>

            <div className="mt-3 flex flex-col gap-2 text-sm">

              {project.pings.length > 0 ? (
                project.pings.map((ping: any) => (
                  <div
                    key={ping.id}
                    className="border border-gray-200 px-3 py-2"
                  >

                    <p>

                      <span className="font-bold">
                        {ping.sender?.name ||
                          "anonymous"}
                      </span>{" "}

                      pinged this listing

                    </p>

                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  no pings yet
                </p>
              )}

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}