"use client";

import { useState } from "react";

import ProjectCard from "@/components/cards/ProjectCard";

const PAGE_SIZE = 7;

type Props = {
  projects: any[];

  sessionUserId?: string | null;

  sessionUserEmail?: string | null;
};

export default function FeedList({
  projects,
  sessionUserId,
  sessionUserEmail,
}: Props) {

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const visibleProjects =
    projects.slice(0, visibleCount);

  const hasMore =
    visibleCount < projects.length;

  return (
    <>

      <div className="flex w-full flex-col">

        {visibleProjects.map((project) => (

          <ProjectCard
            key={project.id}
            project={project}
            sessionUserId={sessionUserId}
            sessionUserEmail={sessionUserEmail}
          />

        ))}

      </div>

      {hasMore && (

        <div className="border-t border-gray-200 bg-white p-6 text-center">

          <button
            onClick={() =>
              setVisibleCount(
                (prev) => prev + PAGE_SIZE
              )
            }
            className="
              border border-gray-900
              px-5 py-2 text-sm
              hover:bg-black
              hover:text-white
            "
          >
            load more
          </button>

        </div>

      )}

    </>
  );
}