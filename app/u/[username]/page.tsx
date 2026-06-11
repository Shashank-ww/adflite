import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: Props) {

  const { username } =
    await params;

  if (!username) {
    notFound();
  }

  const user =
    await prisma.user.findUnique({
      where: {
        username,
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
    notFound();
  }

  const totalPings =
    user.projects.reduce(
      (acc, project) =>
        acc + project.pings.length,
      0
    );

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">

      <div className="border border-gray-300 bg-white">

        {/* HEADER */}

        <div className="border-b border-gray-300 p-6">

          <div className="flex items-start justify-between gap-5">

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <h1 className="text-2xl font-bold">
                  {user.name || "anonymous"}
                </h1>

                {user.status && (
                  <span className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px]">
                    {user.status}
                  </span>
                )}

              </div>

              <p className="mt-2 text-sm text-gray-500">
                @{user.username}
              </p>

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

            {user.image && (
              <img
                src={user.image}
                alt={user.name || "user"}
                className="h-20 w-20 rounded-full border border-gray-300"
              />
            )}

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href={`/messages?user=${user.id}`}
              className="border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
            >
              message
            </Link>

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

        {user.bio && (

          <div className="border-b border-gray-300 p-6">

            <h2 className="font-bold">
              about
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700">
              {user.bio}
            </p>

          </div>

        )}

        {/* SKILLS */}

        {user.skills.length > 0 && (

          <div className="border-b border-gray-300 p-6">

            <h2 className="font-bold">
              skillsets
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">

              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        )}

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

{user.resumeUrl && (

  <div className="border-b border-gray-300 p-6">

    <h2 className="font-bold">
      resume
    </h2>

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

      </div>

    </div>

  </div>

)}

        {/* LISTINGS */}

        <div className="p-6">

          <h2 className="font-bold">
            recent listings
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