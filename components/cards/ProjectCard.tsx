import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

import AuthAction from "../common/AuthAction";

import { applyToProject } from "@/actions/applicationActions";
import { deleteProject } from "@/actions/projectActions";
import { pingProject } from "@/actions/pingActions";

type Props = {
  project: {
    id: string;
    slug: string;
    title: string;
    description: string;

    budget: string | null;
    timeline: string | null;
    category: string | null;
    location: string | null;

    createdAt: Date;

    userId: string;

    pings: {
      id: string;
    }[];

    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      headline: string | null;
    };
  };
};

export default async function ProjectCard({
  project,
}: Props) {
  const session =
    await getServerSession(authOptions);

  const isOwner =
    session?.user?.email ===
    project.user.email;

  return (
    <article className="border-t border-gray-300 bg-white p-5">

      {/* TOP */}

      <div className="flex items-start justify-between gap-6">

        <div className="flex-1">

          <Link
            href={`/projects/${project.slug}`}
            className="block text-base font-semibold text-black underline-offset-2 hover:underline"
          >
            {project.title}
          </Link>

          <div className="mt-2 text-sm text-gray-600">

            <span>
              {project.user.name || "Anonymous"}
            </span>

            {project.user.headline && (
              <>
                {" "}
                ·{" "}
                <span>
                  {project.user.headline}
                </span>
              </>
            )}

          </div>

        </div>

        <div className="shrink-0 text-right text-sm text-gray-500">

          <p>
            {new Date(
              project.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

      {/* DESCRIPTION */}

      <div className="mt-4">

        <Link
          href={`/projects/${project.slug}`}
          className="block"
        >
          <p className="whitespace-pre-line text-sm leading-6 text-gray-800">

            {project.description}

          </p>
        </Link>

      </div>

      {/* META */}

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">

        {project.category && (
          <span className="border border-gray-300 px-2 py-1">
            category: {project.category}
          </span>
        )}

        {project.budget && (
          <span className="border border-gray-300 px-2 py-1">
            budget: {project.budget}/hr
          </span>
        )}

        {project.timeline && (
          <span className="border border-gray-300 px-2 py-1">
            timeline: {project.timeline}
          </span>
        )}

        {project.location && (
          <span className="border border-gray-300 px-2 py-1">
            location: {project.location}
          </span>
        )}

      </div>

      {/* FOOTER */}

      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">

        {/* ACTIONS */}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">

          <form
            action={async () => {
              "use server";

              await applyToProject(
                project.id
              );
            }}
          >
            <AuthAction>
              apply
            </AuthAction>
          </form>

          <form
            action={async () => {
              "use server";

              await pingProject(
                project.id
              );
            }}
          >
            <AuthAction>
              ping
            </AuthAction>
          </form>

          <AuthAction>
            save
          </AuthAction>

          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline"
          >
            details
          </Link>

          {isOwner && (
            <>
              <Link
                href={`/projects/${project.slug}/edit`}
                className="hover:underline"
              >
                edit
              </Link>

              <form
                action={async () => {
                  "use server";

                  await deleteProject(
                    project.id
                  );
                }}
              >
                <button className="hover:underline">
                  delete
                </button>
              </form>
            </>
          )}

        </div>

        {/* PINGS */}

        <div className="shrink-0 text-sm text-gray-500">

          {project.pings.length} pings

        </div>

      </div>

    </article>
  );
}