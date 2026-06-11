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

          include: {
            pings: true,
          },
        },
      },
    });

  if (!user) {
    redirect("/");
  }

  const totalPings =
    user.projects.reduce(
      (acc, project) =>
        acc + project.pings.length,
      0
    );

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

      {/* PROFILE */}

      <div className="border border-gray-300 bg-white">

        {/* HEADER */}

        <div className="border-b border-gray-300 p-6">

          <div className="flex items-start justify-between gap-5">

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <h1 className="text-2xl font-bold">

                  {user.name ||
                    "anonymous being"}

                </h1>

                {user.status && (
                  <span className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px] text-gray-600">
                    {user.status}
                  </span>
                )}

              </div>

              {user.username && (
                <div className="mt-2">

                  <Link
                    href={`/u/${user.username}`}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    switchwaters.com/u/{user.username}
                  </Link>

                </div>
              )}

              {user.headline && (
                <p className="mt-4 text-lg leading-7 text-gray-800">
                  {user.headline}
                </p>
              )}

              {user.location && (
                <p className="mt-3 text-sm text-gray-500">
                  {user.location}
                </p>
              )}

            </div>

            <div className="flex shrink-0 flex-col items-end gap-3">

              {user.image && (
                <img
                  src={user.image}
                  alt={user.name || "user"}
                  className="h-20 w-20 rounded-full border border-gray-300"
                />
              )}

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid gap-px border-b border-gray-300 bg-gray-300 sm:grid-cols-4">

          <div className="bg-white p-4">
            <p className="text-xs text-gray-500">
              listings
            </p>

            <p className="mt-1 text-xl font-bold">
              {user.projects.length}
            </p>
          </div>

          <div className="bg-white p-4">
            <p className="text-xs text-gray-500">
              total pings
            </p>

            <p className="mt-1 text-xl font-bold">
              {totalPings}
            </p>
          </div>

          <div className="bg-white p-4">
            <p className="text-xs text-gray-500">
              experience
            </p>

            <p className="mt-1 text-xl font-bold">
              {user.experience || 0}y
            </p>
          </div>

          <div className="bg-white p-4">
            <p className="text-xs text-gray-500">
              hourly rate
            </p>

            <p className="mt-1 text-xl font-bold">
              {user.hourlyRate || "-"}
            </p>
          </div>

        </div>

        {/* ABOUT */}

        <div className="border-b border-gray-300 p-6">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="font-bold">
              about
            </h2>

            <Link
              href="/profile/edit"
              className="text-xs hover:underline"
            >
              edit profile
            </Link>

          </div>

          <p className="whitespace-pre-line text-sm leading-7 text-gray-700">

            {user.bio ||
              "no bio added yet."}

          </p>

        </div>

        {/* SKILLS */}

        <div className="border-b border-gray-300 p-6">

          <h2 className="font-bold">
            skillsets
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            {user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                no skills added
              </p>
            )}

          </div>

        </div>

        {/* LANGUAGES */}

        {user.languages.length > 0 && (

          <div className="border-b border-gray-300 p-6">

            <h2 className="font-bold">
              languages
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">

              {user.languages.map((language) => (
                <span
                  key={language}
                  className="border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
                >
                  {language}
                </span>
              ))}

            </div>

          </div>

        )}

        {/* RESUME DETAILS */}

        {/* RESUME */}

<div className="border-b border-gray-300 p-6">

  <div className="flex items-center justify-between">

    <h2 className="font-bold">
      resume
    </h2>

    <Link
      href="/profile/edit"
      className="text-xs hover:underline"
    >
      manage resume
    </Link>

  </div>

  {user.resumeUrl ? (

    <div className="mt-4">

      <a
        href={user.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center
          border border-gray-300
          px-3 py-2
          text-sm
          hover:bg-gray-50
        "
      >
        view resume
      </a>

      <div className="mt-3 text-xs text-gray-500">

        {user.resumeFileName && (
          <p>{user.resumeFileName}</p>
        )}

        {user.resumeSize && (
          <p>
            {(user.resumeSize / 1024 / 1024).toFixed(2)} MB
          </p>
        )}

        {user.resumeUpdatedAt && (
          <p>
            updated{" "}
            {new Date(
              user.resumeUpdatedAt
            ).toLocaleDateString()}
          </p>
        )}

      </div>

    </div>

  ) : (

    <p className="mt-4 text-sm text-gray-500">
      no resume uploaded
    </p>

  )}

</div>

        {/* LISTINGS */}

        <div className="p-6">

          <h2 className="font-bold">
            listings
          </h2>

          <div className="mt-4 flex flex-col gap-3">

            {user.projects.length > 0 ? (

              user.projects.map((project) => (

                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="border border-gray-300 p-4 hover:bg-gray-50"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="font-semibold">
                        {project.title}
                      </p>

                      {project.category && (
                        <p className="mt-1 text-xs text-gray-500">
                          {project.category}
                        </p>
                      )}

                    </div>

                    <div className="text-xs text-gray-400">
                      {project.pings.length} pings
                    </div>

                  </div>

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