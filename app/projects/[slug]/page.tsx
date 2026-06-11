import Link from "next/link";

import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import ProjectCard from "@/components/cards/ProjectCard";

import ApplyForm from "@/components/layout/ApplyForm";
import { withdrawApplication } from "@/actions/applicationActions";

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

    const currentUser =
  session?.user?.email
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          resumeUrl: true,
          resumeFileName: true,
          resumeSize: true,
          headline: true,
          location: true,
        },
      })
    : null;

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
    mb-4
    flex
    items-center
    justify-between
    border
    border-green-300
    bg-green-50
    px-4
    py-3
  "
>

  <div className="text-sm text-green-800">

    Great! You have applied to

    <span className="font-bold ml-1">
      {project.title}
    </span>

  </div>

  <form
    action={async () => {
      "use server";

      await withdrawApplication(
        project.id
      );
    }}
  >
    <button
      className="
        text-sm
        text-red-600
        hover:underline
      "
    >
      Withdraw Application
    </button>
  </form>

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

{/* APPLICATION SUMMARY */}

<div
  className={`
    border-b p-4
    ${
      currentUser?.resumeUrl
        ? "border-green-200 bg-green-50"
        : "border-red-200 bg-red-50"
    }
  `}
>

  <div className="flex items-start justify-between gap-4">

    <div>

      <h3 className="text-sm font-semibold">

        application summary

      </h3>

      <p className="mt-1 text-xs text-gray-500">

        this information will be shared with the project owner

      </p>

    </div>

    <span
      className={`
        border px-2 py-1 text-xs
        ${
          currentUser?.resumeUrl
            ? "border-green-300 bg-green-100 text-green-700"
            : "border-red-300 bg-red-100 text-red-700"
        }
      `}
    >

      {currentUser?.resumeUrl
        ? "ready to apply"
        : "resume required"}

    </span>

  </div>

  <div className="mt-4">

    <p className="font-medium">

      {session?.user?.name}

    </p>

    {currentUser?.headline && (

      <p className="text-sm text-gray-600">

        {currentUser.headline}

      </p>

    )}

    {currentUser?.location && (

      <p className="mt-1 text-sm text-gray-500">

        {currentUser.location}

      </p>

    )}

  </div>

  {currentUser?.resumeUrl ? (

    <div className="mt-3 text-sm">

      <span className="font-medium text-green-700">

        ✓ Resume Attached

      </span>

      {currentUser.resumeFileName && (

        <p className="mt-1 text-gray-500">

          {currentUser.resumeFileName}

        </p>

      )}

      {currentUser.resumeSize && (
  <p className="text-xs text-gray-500">
    {(
      currentUser.resumeSize /
      1024 /
      1024
    ).toFixed(2)} MB
  </p>
)}

    </div>

  ) : (

    <div className="mt-3">

      <Link
        href="/profile/edit"
        className="
          inline-flex
          border
          border-red-300
          px-3
          py-2
          text-sm
          text-red-700
          hover:bg-red-100
        "
      >
        Upload Resume
      </Link>

    </div>

  )}

</div>

<ApplyForm
  projectId={project.id}
  projectSlug={project.slug}
  projectTitle={project.title}
  applicantName={session?.user?.name}
  applicantEmail={session?.user?.email}
  disabled={!currentUser?.resumeUrl}
/>

          </section>
        )}

    </main>
  );
}