import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function ProfilePage() {
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
    <main className="mx-auto max-w-4xl px-4 py-6">

      {/* TOP NAV */}

      <div className="mb-4 flex gap-4 text-sm">

        <Link
          href="/"
          className="hover:underline"
        >
          ← home
        </Link>

        <Link
          href="/settings"
          className="hover:underline"
        >
          settings
        </Link>

      </div>

      {/* USER PROFILE */}

      <div className="border border-gray-300 bg-white p-6">

        <div className="flex items-start justify-between gap-4">

          <div>

              {user.headline && (
                <p className="mt-3 text-2xl font-bold leading-6">
  
                  {user.headline}
  
                </p>
              )}

            <p className="mt-2 text-sm text-gray-500">

              {user.location ||
                "remote"}

            </p>


            {user.status && (
              <p className="mt-2 text-xs text-gray-500">
                {user.status}
              </p>
            )}

          </div>

            <div className="flex flex-col items-end justify-end gap-2">
          {user.image && (
            <img
              src={user.image}
              alt={user.name || "user"}
              className="h-16 w-16 rounded-full justify-end border border-gray-300"
            />
          )}

            <h1 className="text-xl font-bold">

              {user.name ||
                "anonymous being"}

            </h1>
            </div>

        </div>

        {/* BIO */}

        <div className="mt-8">

          <div className="mb-2 flex items-center justify-between">

            <h2 className="font-bold">
              about
            </h2>

            <Link
              href="/profile/edit"
              className="text-xs hover:underline"
            >
              edit
            </Link>

          </div>

          <p className="text-sm leading-7 text-gray-800">

            {user.bio ||
              "no bio added yet."}

          </p>

        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">

          {user.hourlyRate && (
            <div>
              <span className="font-bold">
                rate:
              </span>{" "}
              {user.hourlyRate}
            </div>
          )}

          {user.experience && (
            <div>
              <span className="font-bold">
                experience:
              </span>{" "}
              {user.experience} yrs
            </div>
          )}

      </div>

        {/* USER SKILLS */}

        <div className="mt-8">

          <h2 className="font-bold">
            skillsets
          </h2>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">

            {user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-gray-300 bg-gray-100 px-2 py-1"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                no skills added yet
              </p>
            )}

          </div>

        </div>

        {user.languages.length > 0 && (
          <div className="mt-6">

            <h2 className="font-bold">
              languages
            </h2>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">

              {user.languages.map((language) => (
                <span
                  key={language}
                  className="border border-gray-300 bg-gray-100 px-2 py-1"
                >
                  {language}
                </span>
              ))}

            </div>

          </div>
        )}

        {/* USER PROJECTS */}

        <div className="mt-8">

          <h2 className="font-bold">
            listings
          </h2>

          <div className="mt-3 flex flex-col gap-3">

            {user.projects.length > 0 ? (
              user.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="border border-gray-300 p-3 hover:bg-gray-50"
                >
                  <p className="font-bold hover:underline">
                    {project.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">

                    {project.category}

                  </p>

                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                no listings yet
              </p>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}