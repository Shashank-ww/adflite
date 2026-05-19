import Link from "next/link";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { withdrawApplication } from "@/actions/applicationActions";

export default async function ApplicationsPage() {
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
      // applications submitted BY me
      applications: {
        include: {
          project: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      // applications received ON my projects
      projects: {
        include: {
          applications: {
            include: {
              user: true,
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

  {/* PAGE HEADER */}
  <div className="mb-8">

    <h1 className="text-2xl font-bold">
      applications
    </h1>

    <p className="mt-1 text-sm text-gray-500">
      manage applications received and submitted
    </p>

  </div>

  {/* =========================================
      APPLICATIONS RECEIVED
  ========================================= */}

  <section className="mb-10">

    <div className="mb-4 flex items-center justify-between">

      <h2 className="text-lg font-semibold">
        applications received
      </h2>

      <span className="border border-gray-300 px-3 py-1 text-xs text-gray-600">
        {
          user.projects.reduce(
            (acc, project) =>
              acc +
              project.applications.length,
            0
          )
        }{" "}
        total
      </span>

    </div>

    <div className="flex flex-col gap-3">

      {user.projects.some(
        (project) =>
          project.applications.length > 0
      ) ? (
        user.projects.map((project) =>
          project.applications.map(
            (application) => (

              <div
                key={application.id}
                className="border border-gray-300 bg-white p-4"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <Link
                      href={`/projects/${project.slug}`}
                    >
                      <p className="font-bold hover:underline">
                        {project.title}
                      </p>
                    </Link>

                    <div className="mt-2 space-y-1 text-sm text-gray-700">

                      <p>
                        applicant:{" "}
                        <span className="font-medium text-black">
                          {
                            application.user
                              ?.name ||
                            "anonymous"
                          }
                        </span>
                      </p>

                      <p>
                        email:{" "}
                        {
                          application.email
                        }
                      </p>

                      {application.phone && (
                        <p>
                          phone:{" "}
                          {
                            application.phone
                          }
                        </p>
                      )}

                      <p>
                        resume:{" "}

                        <a
                          href={
                            application.resume
                          }
                          target="_blank"
                          className="underline"
                        >
                          view link
                        </a>

                      </p>

                      <p className="text-xs text-gray-500">

                        applied on{" "}

                        {new Date(
                          application.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>

                </div>

              </div>
            )
          )
        )
      ) : (

        <div className="border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">

          no applications received yet

        </div>
      )}

    </div>

  </section>

  {/* =========================================
      APPLICATIONS SUBMITTED
  ========================================= */}

  <section>

    <div className="mb-4 flex items-center justify-between">

      <h2 className="text-lg font-semibold">
        applications submitted
      </h2>

      <span className="border border-gray-300 px-3 py-1 text-xs text-gray-600">
        {user.applications.length} total
      </span>

    </div>

    <div className="flex flex-col gap-3">

      {user.applications.length > 0 ? (

        user.applications.map(
          (application) => (

            <div
              key={application.id}
              className="border border-gray-300 bg-white p-4"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0 flex-1">

                  <Link
                    href={`/projects/${application.project.slug}`}
                  >

                    <p className="font-bold hover:underline">

                      {
                        application.project
                          .title
                      }

                    </p>

                  </Link>

                  <div className="mt-2 space-y-1 text-sm text-gray-700">

                    <p>
                      category:{" "}
                      {
                        application.project
                          .category ||
                        "general"
                      }
                    </p>

                    <p>
                      budget:{" "}
                      {
                        application.project
                          .budget || "n/a"
                      }
                    </p>

                    <p className="text-xs text-gray-500">

                      applied on{" "}

                      {new Date(
                        application.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 text-xs">

                  <Link
                    href={`/projects/${application.project.slug}`}
                    className="hover:underline"
                  >
                    view
                  </Link>

                  <span className="text-gray-300">
                    |
                  </span>

                  <form
                    action={async () => {
                      "use server";

                      await withdrawApplication(
                        application.project.id
                      );
                    }}
                  >

                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      withdraw
                    </button>

                  </form>

                </div>

              </div>

            </div>
          )
        )

      ) : (

        <div className="border border-dashed border-gray-300 bg-white p-10 text-center">

          <p className="text-sm text-gray-500">
            no applications yet
          </p>

          <Link
            href="/"
            className="mt-3 inline-block text-sm text-black underline"
          >
            explore listings
          </Link>

        </div>
      )}

    </div>

    </section>

  </main>
);
}