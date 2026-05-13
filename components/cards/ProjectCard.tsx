"use client";

import Link from "next/link";

import { Project } from "@/types/project";

import {
  getPings,
  getSaved,
  savePings,
  saveSaved,
} from "@/lib/storage";

interface Props {
  project: Project;
}

export default function ProjectCard({
  project,
}: Props) {
  function handleSave() {
    const saved = getSaved();

    if (!saved.includes(project.id)) {
      saveSaved([...saved, project.id]);

      alert("listing saved");
    }
  }

  function handlePing() {
    const pings = getPings();

    if (!pings.includes(project.id)) {
      savePings([...pings, project.id]);

      alert("ping sent");
    }
  }

  return (
    <article className="border-b border-gray-300 p-4 last:border-b-0">
      <div className="flex flex-col gap-2">
        
        <div>
          <Link
            href={`/project/${project.id}`}
            className="text-[15px] font-bold"
          >
            {project.title}
          </Link>

          <p className="mt-1 text-xs text-gray-500">
            posted by {project.client} ·{" "}
            {project.postedAt}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <span>
            budget: {project.budget}
          </span>

          <span>
            timeline: {project.timeline}
          </span>

          <span>{project.location}</span>

          <span>{project.category}</span>
        </div>

        <p className="max-w-2xl leading-6 text-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="border border-gray-300 bg-gray-100 px-2 py-1"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-1 text-sm">
          <a href="#">apply</a>

          <Link href="/messages">
            message
          </Link>

          <button onClick={handlePing}>
            ping
          </button>

          <button onClick={handleSave}>
            save
          </button>
        </div>
      </div>
    </article>
  );
}