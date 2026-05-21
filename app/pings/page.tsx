"use server";

import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";
import { pingProject } from "@/actions/pingActions";

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

              orderBy: {
                createdAt: "desc",
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* BACK */}
      <div className="mb-5">

        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← home
        </Link>

      </div>

      {/* PAGE HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          pings
        </h1>

        <p className="mt-2 text-sm text-gray-500">

          people interested in your listings
          and looking to connect

        </p>

      </div>

      {/* PROJECTS */}
      <div className="flex flex-col gap-6">

        {user.projects.length > 0 ? (
          user.projects.map(
            (project: any) => (
              <div
                key={project.id}
                className="border border-gray-300 bg-white"
              >

                {/* PROJECT HEADER */}
                <div className="border-b border-gray-200 px-4 py-3">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <h2 className="font-bold">
                        {project.title}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">

                        {project.pings.length}{" "}
                        {project.pings.length ===
                        1
                          ? "ping"
                          : "pings"}

                      </p>

                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm text-gray-500 hover:text-black"
                    >
                      view listing
                    </Link>

                  </div>

                </div>

                {/* PINGS */}
                <div className="p-4">

                  {project.pings.length >
                  0 ? (
                    <div className="flex flex-col gap-3">

                      {project.pings.map(
                        (ping: any) => {
                          const createdAt =
                            new Date(
                              ping.createdAt
                            );

                          const formatted =
                            createdAt.toLocaleString(
                              "en-IN",
                              {
                                day: "numeric",
                                month:
                                  "short",
                                hour:
                                  "numeric",
                                minute:
                                  "2-digit",
                              }
                            );

                          return (
                            <div
                              key={ping.id}
                              className="flex items-start justify-between gap-4 border border-gray-200 bg-gray-50 px-4 py-3"
                            >

                              {/* LEFT */}
                              <div className="min-w-0 flex-1">

                                <p className="text-sm leading-6">

                                  <span className="font-semibold">

                                    {ping.sender
                                      ?.username ||
                                      "anonymous"}

                                  </span>{" "}

                                  pinged this
                                  listing on{" "}

                                  <span className="text-gray-500">

                                    {formatted}

                                  </span>

                                </p>

                              </div>

                              {/* ACTIONS */}
                              <div className="flex shrink-0 items-center gap-2">

                                <Link
                                  href={`/messages?user=${ping.senderId}&project=${project.slug}`}
                                  className="px-3 py-1.5 text-xs text-white hover:opacity-90"
                                >
                                  message
                                </Link>

                                <form
                                  action={async () => {
                                    "use server";

                                    await pingProject(project.id);
                                  }}
                                >

                                  <button
                                    type="submit"
                                    className="border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-100"
                                  >
                                    ping back
                                  </button>

                                </form>


                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>
                  ) : (
                    <div className="py-6 text-sm text-gray-500">

                      no pings yet

                    </div>
                  )}

                </div>

              </div>
            )
          )
        ) : (
          <div className="border border-gray-300 bg-white px-4 py-8 text-center">

            <h3 className="font-semibold">

              no listings yet

            </h3>

            <p className="mt-2 text-sm text-gray-500">

              create a listing to start
              receiving pings

            </p>

          </div>
        )}

      </div>

    </main>
  );
}