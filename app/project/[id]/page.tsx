import { projects } from "@/data/defaultProjects";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    return (
      <div className="p-6">
        Project not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <Link
        href="/"
        className="text-sm"
      >
        ← back
      </Link>

      <article className="mt-4 border border-gray-300 bg-white p-6">
        
        <h1 className="text-xl font-bold">
          {project.title}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          posted by {project.client}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>budget: {project.budget}</span>
          <span>timeline: {project.timeline}</span>
          <span>category: {project.category}</span>
        </div>

        <p className="mt-6 leading-7">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-8 flex gap-4 text-sm">
          <a href="#">apply</a>
          <a href="#">message</a>
          <a href="#">save</a>
        </div>
      </article>
    </main>
  );
}