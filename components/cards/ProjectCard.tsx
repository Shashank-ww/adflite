"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  signIn,
  useSession,
} from "next-auth/react";

import {
  deleteProject,
  saveProject,
} from "@/actions/projectActions";

import { pingProject } from "@/actions/pingActions";

import { useToast } from "@/components/providers/ToastProvider";
import { withdrawApplication } from "@/actions/applicationActions";

type Variant =
  | "feed"
  | "directory"
  | "detail";

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

    _count: {
      pings: number;
      applications: number;
    };

    savedProjects?: {
      userId: string;
    }[];

    applications?: {
      userId: string;
    }[];

    user: {
      id: string;

      name: string | null;
      username: string | null;
      email: string | null;

      image: string | null;

      headline: string | null;
    };
  };

  sessionUserId?: string | null;

  sessionUserEmail?: string | null;

  variant?: Variant;
};

export default function ProjectCard({
  project,
  sessionUserId,
  sessionUserEmail,
  variant = "feed",
}: Props) {
  const router = useRouter();

  const { showToast } = useToast();

  const { data: session } =
    useSession();

  const [pending, startTransition] =
    useTransition();

  const [saving, setSaving] =
    useState(false);

  const isOwner =
    sessionUserEmail ===
    project.user.email;

  /*
   ---------------------------------------
   SAVED
   ---------------------------------------
  */

  const initialSaved =
    project.savedProjects?.some(
      (s) =>
        s.userId === sessionUserId
    ) ?? false;

  const [saved, setSaved] =
    useState(initialSaved);

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  /*
   ---------------------------------------
   APPLIED
   ---------------------------------------
  */

const applied =
  project.applications?.some(
    (a) =>
      a.userId === sessionUserId
  ) ?? false;

  /*
   ---------------------------------------
   PINGS
   ---------------------------------------
  */

  const [pingCount, setPingCount] =
    useState(project._count.pings);

  /*
   ---------------------------------------
   ACTIONS
   ---------------------------------------
  */

  async function handleSave() {
    if (!sessionUserId) {
      signIn("google");
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

        showToast(
          `you pinged @${project.user.username}`
        );
      } catch {
        setPingCount((prev) => prev - 1);

        showToast(
          "unable to send ping"
        );
      }
    });
  }

  function handleApplyIntent() {
    if (!sessionUserId) {
      signIn("google");
      return;
    }

    if (applied) return;

    router.push(
      `/projects/${project.slug}?apply=1`
    );
  }

  /*
   ---------------------------------------
   VARIANT FLAGS
   ---------------------------------------
  */

  const isFeed =
    variant === "feed";

  const isDirectory =
    variant === "directory";

  const isDetail =
    variant === "detail";

  const showDescription =
    isDirectory || isDetail;

  const showFooter =
    isFeed || isDetail;

  return (
    <article
      className="
        border-t border-gray-300
        bg-white
        px-4 py-4
        text-sm
        transition
        hover:bg-amber-50
      "
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <Link
            href={`/projects/${project.slug}`}
            className="
              text-xl font-semibold
              leading-6 text-black
              hover:underline
            "
          >
            {project.title}
          </Link>

          {/* META HEADER */}

          <div
            className="
              mt-1 flex flex-wrap
              items-center gap-x-2
              gap-y-1 text-sm
              text-gray-500
            "
          >
            <p>
              by{" "}

              {project.user.username ? (
                <Link
                  href={`/u/${project.user.username}`}
                  className="hover:underline"
                >
                  {project.user.username}
                </Link>
              ) : (
                <span>
                  anonymous
                </span>
              )}
            </p>

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
                }
              ).format(
                new Date(
                  project.createdAt
                )
              )}
            </span>
          </div>
        </div>

        {/* DIRECTORY SIDE META */}

        {isDirectory && (
          <div
            className="
              shrink-0 text-right
              text-xs text-gray-400
            "
          >
            <p>
              {
                project._count.pings
              }{" "}
              pings
            </p>
          </div>
        )}
      </div>

      {/* DESCRIPTION */}

      {showDescription && (
        <div className="mt-3">

          <Link
            href={`/projects/${project.slug}`}
            className="block"
          >
            <p
              className={`
                whitespace-pre-line
                text-balance
                leading-7 text-gray-700

                ${
                  isDirectory
                    ? "line-clamp-3"
                    : ""
                }
              `}
            >
              {
                project.description
              }
            </p>
          </Link>

        </div>
      )}

      {/* META TAGS */}

      {(project.category ||
        project.budget ||
        project.timeline ||
        project.location) && (
        <div
          className="
            mt-4 flex flex-wrap
            gap-2 text-xs
          "
        >
          {project.category && (
            <span
              className="
                border border-gray-300
                px-2 py-1 text-gray-700
              "
            >
              {project.category}
            </span>
          )}

          {project.budget && (
            <span
              className="
                border border-gray-300
                px-2 py-1 text-gray-700
              "
            >
              budget:{" "}
              {project.budget}
            </span>
          )}

          {project.timeline && (
            <span
              className="
                border border-gray-300
                px-2 py-1 text-gray-700
              "
            >
              scope:{" "}
              {project.timeline}
            </span>
          )}

          {project.location && (
            <span
              className="
                border border-gray-300
                px-2 py-1 text-gray-700
              "
            >
              {project.location}
            </span>
          )}
        </div>
      )}

      {/* FOOTER */}

      {showFooter && (
        <div
          className="
            mt-4 -m-4
            border-t border-gray-200
            bg-neutral-100
          "
        >
          <div
            className="
              flex flex-wrap
              items-center
              justify-between
              gap-3 px-4 py-2
            "
          >
            {/* ACTIONS */}

            <div
              className="
                flex flex-wrap
                items-center
                gap-x-3 gap-y-2
                text-xs
              "
            >
              {/* APPLY */}

              {!isOwner && (
                <>
                  <button
                    onClick={
                      handleApplyIntent
                    }
                    disabled={
                      pending ||
                      applied
                    }
                    className={`
                      font-medium
                      hover:underline

                      ${
                        applied
                          ? "text-green-700"
                          : "text-black"
                      }
                    `}
                  >
                    {applied ? (
                      <span className="text-green-700">
                        applied
                      </span>
                    ) : (
                      "apply"
                    )}
                  </button>

                  {applied && (
                      <>
                        <span className="text-gray-300">
                          |
                        </span>

                        <button
                          onClick={() => {
                            startTransition(
                              async () => {

                                await withdrawApplication(
                                  project.id
                                );

                                router.refresh();

                                showToast(
                                  "application withdrawn"
                                );
                              }
                            );
                          }}
                          className="
                            text-red-600
                            hover:underline
                          "
                        >
                          withdraw
                        </button>
                      </>
                    )}

                  <span className="text-gray-300">
                    |
                  </span>
                </>
              )}

              {/* PING */}

              {!isOwner && (
                <>
                  <button
                    onClick={
                      handlePing
                    }
                    disabled={
                      pending
                    }
                    className="
                      text-gray-600
                      hover:underline
                    "
                  >
                    ping
                  </button>

                  <span className="text-gray-300">
                    |
                  </span>
                </>
              )}

              {/* SAVE */}

              <button
                onClick={handleSave}
                disabled={saving}
                className={`
                  transition
                  hover:underline

                  ${
                    saved
                      ? "font-semibold text-amber-700"
                      : "text-gray-600"
                  }
                `}
              >
                {saving
                  ? "..."
                  : saved
                  ? "saved"
                  : "save"}
              </button>

              {/* FEED ONLY */}

              {isFeed && (
                <>
                  <span className="text-gray-300">
                    |
                  </span>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="
                      text-gray-600
                      hover:underline
                    "
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
                        className="
                          text-gray-600
                          hover:underline
                        "
                      >
                        message
                      </Link>
                    </>
                  )}
                </>
              )}

              {/* DETAIL ONLY */}

              {isDetail && (
                <>
                  {!isOwner && (
                    <>
                      <span className="text-gray-300">
                        |
                      </span>

                      <Link
                        href={`/messages?user=${project.user.id}`}
                        className="
                          text-gray-600
                          hover:underline
                        "
                      >
                        message
                      </Link>
                    </>
                  )}

                  <span className="text-gray-300">
                    |
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.href
                      );

                      showToast(
                        "link copied"
                      );
                    }}
                    className="
                      text-gray-600
                      hover:underline
                    "
                  >
                    copy link
                  </button>

                  <span className="text-gray-300">
                    |
                  </span>

                  <button
                    onClick={() => {
                      if (
                        navigator.share
                      ) {
                        navigator.share({
                          title:
                            project.title,

                          url:
                            window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(
                          window.location.href
                        );

                        showToast(
                          "link copied"
                        );
                      }
                    }}
                    className="
                      text-gray-600
                      hover:underline
                    "
                  >
                    share
                  </button>

                  {/* OWNER */}

                  {isOwner && (
                    <>
                      <span className="text-gray-300">
                        |
                      </span>

                      <Link
                        href={`/projects/${project.slug}/edit`}
                        className="
                          text-gray-600
                          hover:underline
                        "
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
                        className="
                          text-red-600
                          hover:underline
                        "
                      >
                        delete
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            {/* PING COUNT */}

            <div
              className="
                shrink-0 border
                border-gray-300
                bg-white
                px-2 py-1
                text-[11px]
                text-gray-600
              "
            >
              {pingCount} pings
            </div>
          </div>
        </div>
      )}
    </article>
  );
}