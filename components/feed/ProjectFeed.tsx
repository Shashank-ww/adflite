import { prisma } from "@/lib/prisma";

import ProjectCard from "../cards/ProjectCard";

import SearchStrip from "./SearchStrip";

type Props = {
  query?: string;
};

export default async function ProjectFeed({
  query,
}: Props) {
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
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <section className="overflow-hidden border border-gray-200 bg-white">

      <SearchStrip />

      <div className="flex flex-col">

        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
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