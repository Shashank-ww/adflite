import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import ProjectCard from "../cards/ProjectCard";

import SearchStrip from "./SearchStrip";
import FeedIntro from "./FeedIntro";

type Props = {
  query?: string;
};

export default async function ProjectFeed({
  query,
}: Props) {

  // SESSION
  const session =
    await getServerSession(authOptions);

  // PROJECTS
  const projects =
    await prisma.project.findMany({
      where: query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                category: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,

      include: {
        user: true,
        pings: true,
        savedProjects: true,
        applications: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(
  "SESSION USER ID:",
  session?.user?.id
);

console.log(
  "FIRST PROJECT SAVES:",
  projects[0]?.savedProjects
);

  return (
    <section className="w-full overflow-hidden border border-gray-200 bg-white">

      <FeedIntro />

      <SearchStrip />

      <div className="flex w-full flex-col">

        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}

              sessionUserId={
                session?.user?.id ?? null
              }

              sessionUserEmail={
                session?.user?.email ?? null
              }
            />
          ))
        ) : (
          <div className="p-10 text-center text-sm text-gray-500">

            no listings found

          </div>
        )}

      </div>

    </section>
  );
}