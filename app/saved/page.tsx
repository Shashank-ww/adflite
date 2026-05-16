import Link from "next/link";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";
import { saveProject } from "@/actions/projectActions";

export default async function SavedPage() {
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
        savedProjects: {
          include: {
            project: true,
          },
        },
      },
    });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">

      <h1 className="mb-6 text-xl font-bold">
        saved listings
      </h1>

      <div className="flex flex-col gap-3">

          {user.savedProjects.length > 0 ? (
            user.savedProjects.map((saved) => (

              <div
                key={saved.id}
                className="border border-gray-300 bg-white p-4 hover:bg-gray-50"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <Link
                      href={`/projects/${saved.project.slug}`}
                      className="font-bold hover:underline"
                    >
                      {saved.project.title}
                    </Link>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">

                      {saved.project.category && (
                        <span>
                          {saved.project.category}
                        </span>
                      )}

                      <span>•</span>

                      <span>
                        saved{" "}
                        {new Intl.DateTimeFormat(
                          "en-GB",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        ).format(
                          new Date(saved.createdAt)
                        )}
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <form
                    action={async () => {
                      "use server";

                      await saveProject(
                        saved.project.id
                      );
                    }}
                  >

                    <button
                      type="submit"
                      className="text-xs text-red-600 hover:underline"
                    >
                      unsave
                    </button>

                  </form>

                </div>

              </div>

            ))
          ) : (
          <p className="text-sm text-gray-500">
            no saved listings
          </p>
        )}

      </div>

    </main>
  );
}