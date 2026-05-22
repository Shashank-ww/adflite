import Link from "next/link";

import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import ProjectCard from "@/components/cards/ProjectCard";

import ApplyForm from "@/components/layout/ApplyForm";

type Props = {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    apply?: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: Props) {

  const session =
    await getServerSession(authOptions);

  const { slug } =
    await params;

  const query =
    await searchParams;

  const autoOpenApply =
    query.apply === "1";

  const project =
    await prisma.project.findUnique({
      where: {
        slug,
      },

      select: {
        id: true,
        slug: true,

        title: true,
        description: true,

        budget: true,
        timeline: true,
        category: true,
        location: true,

        createdAt: true,

        user: {
          select: {
            id: true,

            name: true,
            username: true,
            email: true,

            image: true,

            headline: true,
          },
        },

        _count: {
          select: {
            pings: true,
            applications: true,
          },
        },

        ...(session?.user?.id && {
          savedProjects: {
            where: {
              userId:
                session.user.id,
            },

            select: {
              userId: true,
            },
          },

          applications: {
            where: {
              userId:
                session.user.id,
            },

            select: {
              userId: true,
            },
          },
        }),
      },
    });

  if (!project) {
    notFound();
  }

  const alreadyApplied =
    project.applications?.some(
      (
        a: {
          userId: string;
        }
      ) =>
        a.userId ===
        session?.user?.id
    ) ?? false;

  const isOwner =
    session?.user?.email ===
    project.user.email;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* TOP BAR */}

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">

        <Link
          href="/"
          className="text-gray-600 hover:underline"
        >
          ← back
        </Link>

        {autoOpenApply &&
          !alreadyApplied &&
          !isOwner && (
            <>
              <span className="text-gray-300">
                |
              </span>

              <Link
                href={`/projects/${project.slug}`}
                className="text-red-600 hover:underline"
              >
                cancel apply
              </Link>
            </>
          )}

      </div>

      {/* APPLIED SUCCESS */}

      {alreadyApplied && (
        <div
          className="
            mb-4 border
            border-green-300
            bg-green-50
            px-4 py-3
            text-sm text-green-800
          "
        >
          Great! You have applied to{" "}

          <span className="font-bold">
            {project.title}
          </span>
        </div>
      )}

      {/* PROJECT */}

      <section
        className="
          overflow-hidden
          border border-gray-300
          bg-white
        "
      >
        <ProjectCard
          project={project}
          variant="detail"
          sessionUserId={
            session?.user?.id ?? null
          }
          sessionUserEmail={
            session?.user?.email ?? null
          }
        />
      </section>

      {/* APPLY FORM */}

      {autoOpenApply &&
        !alreadyApplied &&
        !isOwner && (
          <section
            className="
              mt-6 overflow-hidden
              border border-gray-300
              bg-white
            "
          >

            <div
              className="
                border-b border-gray-200
                px-4 py-3
              "
            >

              <h2 className="text-sm font-semibold">

                apply to this project

              </h2>

              <p className="mt-1 text-xs text-gray-500">

                your profile will be shared
                with the project owner

              </p>

            </div>

            <ApplyForm
              projectId={project.id}
              projectSlug={project.slug}
              projectTitle={project.title}
              applicantName={
                session?.user?.name
              }
              applicantEmail={
                session?.user?.email
              }
            />

          </section>
        )}

    </main>
  );
}