"use client";

import { useEffect, useState } from "react";

import ProjectCard from "../cards/ProjectCard";
import SearchStrip from "./SearchStrip";

import { Project } from "@/types/project";

import { getProjects } from "@/lib/storage";

import { projects as defaultProjects } from "@/data/defaultProjects";

export default function ProjectFeed() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = getProjects();

    if (stored.length > 0) {
      setProjects(stored);
    } else {
      localStorage.setItem(
        "adflite_projects",
        JSON.stringify(defaultProjects)
      );

      setProjects(defaultProjects);
    }
  }, []);

  return (
    <section className="flex-1 border border-gray-300 bg-white">
      <SearchStrip />

      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}