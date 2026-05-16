import Link from "next/link";

import { redirect, notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import { updateProject } from "@/actions/projectActions";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: Props) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const { slug } = await params;

  const project =
    await prisma.project.findUnique({
      where: {
        slug,
      },

      include: {
        user: true,
      },
    });

  if (!project) {
    notFound();
  }

  if (
    project.user.email !==
    session.user.email
  ) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">

      {/* BACK */}

      <div className="mb-4">

        <Link
          href={`/projects/${project.slug}`}
          className="text-sm hover:underline"
        >
          ← back to listing
        </Link>

      </div>

      {/* TITLE */}

      <h1 className="mb-6 text-xl font-bold">
        edit listing
      </h1>

      {/* FORM */}

      <form
        action={updateProject.bind(
            null,
            project.id
        )}
        className="flex flex-col gap-5 border border-gray-300 bg-white p-6"
      >

        <input
          type="hidden"
          name="projectId"
          value={project.id}
        />

        {/* TITLE */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            title
          </label>

          <input
            type="text"
            name="title"
            required
            defaultValue={project.title}
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            description
          </label>

          <textarea
            rows={8}
            name="description"
            required
            defaultValue={
              project.description
            }
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        {/* META */}

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-bold">
              budget
            </label>

            <input
              type="text"
              name="budget"
              defaultValue={
                project.budget || ""
              }
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold">
              timeline
            </label>

            <input
              type="text"
              name="timeline"
              defaultValue={
                project.timeline || ""
              }
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />

          </div>

        </div>

        {/* CATEGORY */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            category
          </label>

          <input
            type="text"
            name="category"
            defaultValue={
              project.category || ""
            }
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          className="text-left text-sm hover:underline"
        >
          save changes
        </button>

      </form>

    </main>
  );
}