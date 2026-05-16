"use client";

import Link from "next/link";

import { useState, useEffect, useTransition } from "react";

import { signIn, useSession } from "next-auth/react";

import {
  deleteProject,
  saveProject,
} from "@/actions/projectActions";

import { pingProject } from "@/actions/pingActions";
import ApplyForm from "@/components/layout/ApplyForm";
import { useToast } from "@/components/providers/ToastProvider";

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

    pings: { id: string }[];

    applications: {
      id: string;
      userId: string;
    }[];

    savedProjects: {
      id: string;
      userId: string;
    }[];

    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      headline: string | null;
    };
  };

sessionUserId?: string | null;
sessionUserEmail?: string | null;
};

export default function ProjectCard({
  project,
  sessionUserId,
  sessionUserEmail,
}: Props) {
  const [pending, startTransition] =
    useTransition();

    const [saving, setSaving] = useState(false);

const initialSaved =
  project.savedProjects?.some(
    (s) => s.userId === sessionUserId
  );

  console.log(
  "CARD USER:",
  sessionUserId
);

console.log(
  "CARD SAVED PROJECTS:",
  project.savedProjects
);

console.log(
  "INITIAL SAVED:",
  initialSaved
);

const [saved, setSaved] =
  useState(initialSaved);

  useEffect(() => {
  setSaved(initialSaved);
}, [initialSaved]);

  const [applied, setApplied] =
    useState(
      project.applications?.some(
        (a) => a.userId === sessionUserId
      )
    );

const { showToast } = useToast();

const { data: session } = useSession();

const [showApplyForm, setShowApplyForm] =
  useState(false);

  const [pingCount, setPingCount] =
    useState(project.pings.length);

  const isOwner =
    sessionUserEmail ===
    project.user.email;

    async function handleSave() {
      if (!sessionUserId) {
        signIn("google");
        return;
      }

      const next = !saved;

      // optimistic
      setSaved(next);

      setSaving(true);

      try {
        await saveProject(project.id);
      } catch {
        // rollback
        setSaved(!next);
      } finally {
        setSaving(false);
      }
    }

async function handleApply() {
  if (!sessionUserId) {
    signIn("google");
    return;
  }

  if (applied) return;

  setShowApplyForm((prev) => !prev);
}

  async function handlePing() {
    if (!sessionUserId) {
      signIn("google");
      return;
    }

    setPingCount((prev) => prev + 1);

    startTransition(async () => {
      try {
        await pingProject(project.id);
      } catch {
        setPingCount((prev) => prev - 1);
      }
    });
  }

  return (
    <article className="border-t border-gray-400 bg-white hover:bg-amber-50 px-4 py-4 text-sm">

      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">

          <Link
            href={`/projects/${project.slug}`}
            className="text-lg font-semibold leading-6 text-black hover:underline"
          >
            {project.title}
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">

            <span>
              by {project.user.name || "anonymous"}
            </span>

            {project.user.headline && (
              <>
                <span>·</span>
                <span>
                  {project.user.headline}
                </span>
              </>
            )}

            <span>·</span>

            <span>
              {new Intl.DateTimeFormat(
                "en-GB",
                {
                  month: "short",
                  day: "numeric",
                  // year: "numeric",
                }
              ).format(
                new Date(project.createdAt)
              )}
            </span>

          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-3">
        <Link
          href={`/projects/${project.slug}`}
          className="block"
        >
          <p className="line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-700">
            {project.description}
          </p>
        </Link>
      </div>

      {/* META */}
      {(project.category ||
        project.budget ||
        project.timeline ||
        project.location) && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">

          {project.category && (
            <span className="border border-gray-300 px-2 py-1 text-gray-700">
              {project.category}
            </span>
          )}

          {project.budget && (
            <span className="border border-gray-300 px-2 py-1 text-gray-700">
              {project.budget}/hr
            </span>
          )}

          {project.timeline && (
            <span className="border border-gray-300 px-2 py-1 text-gray-700">
              {project.timeline}
            </span>
          )}

          {project.location && (
            <span className="border border-gray-300 px-2 py-1 text-gray-700">
              {project.location}
            </span>
          )}

        </div>
      )}

      {/* FOOTER */}
      <div className="mt-4 -m-4 border-t border-gray-200 bg-neutral-100">

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2">

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">

            {/* APPLY */}
            <button
              onClick={() => {
                  if (!session) {
                    showToast(
                      "login required to apply"
                    );
                    return;
                  }
                  handleApply();
                }}
              disabled={pending}
              className={`hover:underline ${
                applied
                  ? "font-semibold text-green-700"
                  : "text-gray-600"
              }`}
            >
              {applied
                ? "applied"
                : "apply"}
            </button>

            <span className="text-gray-300">
              |
            </span>

            {/* PING */}
            <button
              onClick={() => {
                  if (!session) {
                    showToast(
                      "login required to ping"
                    );
                    return;
                  }
                  handlePing();
                }}
              disabled={pending}
              className="text-gray-600 hover:underline"
            >
              ping
            </button>

            <span className="text-gray-300">
              |
            </span>

            {/* SAVE */}
            <form
              action={async () => {
                if (!session) {
                  showToast(
                    "login required to save"
                  );
                  return;
                }
                const next = !saved;

                setSaved(next);

                setSaving(true);

                try {
                  await saveProject(project.id);
                    showToast(
                              next
                                ? "listing saved"
                                : "listing removed"
                            );

                          } catch {

                            setSaved(!next);

                            showToast(
                              "something went wrong"
                            );
                } finally {
                  setSaving(false);
                }
              }}
            >
              <button
                type="submit"
                disabled={saving}
                className={`transition hover:underline ${
                  saved
                    ? "font-semibold text-amber-700"
                    : "text-gray-600"
                }`}
              >
                {saving
                  ? "..."
                  : saved
                  ? "saved"
                  : "save"}
              </button>
            </form>

            <span className="text-gray-300">
              |
            </span>

            <Link
              href={`/projects/${project.slug}`}
              className="text-gray-600 hover:underline"
            >
              details
            </Link>

            {!isOwner && (
              <>
                <span className="text-gray-300">
                  |
                </span>

                <Link
                  href={`/messages?user=${project.user.id}`}
                  className="text-gray-600 hover:underline"
                >
                  message
                </Link>
              </>
            )}

            {isOwner && (
              <>
                <span className="text-gray-300">
                  |
                </span>

                <Link
                  href={`/projects/${project.slug}/edit`}
                  className="text-gray-600 hover:underline"
                >
                  edit
                </Link>

                <span className="text-gray-300">
                  |
                </span>

                <button
                  onClick={async () => {
                    await deleteProject(
                      project.id
                    );
                  }}
                  className="text-red-600 hover:underline"
                >
                  delete
                </button>
              </>
            )}

          </div>

          {/* PINGS */}
          <div className="shrink-0 border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600">
            {pingCount} pings
          </div>

        </div>

        {/* APPLY FORM */}
        {showApplyForm && !applied && (

          <ApplyForm
            projectId={project.id}
            applicantName={
              session?.user?.name
            }
            applicantEmail={
              session?.user?.email
            }
            onApplied={() => {
              setApplied(true);

              setShowApplyForm(false);
            }}
          />

        )}

      </div>

    </article>
  );
}