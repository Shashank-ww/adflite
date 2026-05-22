"use client";

import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import { applyToProject } from "@/actions/applicationActions";
import { useToast } from "@/components/providers/ToastProvider";

type Props = {
  projectId: string;
  projectSlug: string;
  projectTitle: string;

  applicantName?: string | null;

  applicantEmail?: string | null;
};

export default function ApplyForm({
  projectId,
  projectSlug,
  projectTitle,
  applicantName,
  applicantEmail,
}: Props) {
  const router = useRouter();

  const { showToast } = useToast();

  const [pending, startTransition] =
    useTransition();

  const [phone, setPhone] =
    useState("");

  const [resume, setResume] =
    useState("");

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">

      {/* TOP */}

      <div className="mb-3 text-xs text-gray-600">

        applying as{" "}

        <span className="font-medium text-black">
          {applicantName || "anonymous"}
        </span>

        {applicantEmail && (
          <>
            {" "}
            ·{" "}
            <span>
              {applicantEmail}
            </span>
          </>
        )}

      </div>

      {/* FORM */}

      <form
        action={(formData) => {

          formData.append(
            "projectId",
            projectId
          );

          startTransition(async () => {

            await applyToProject(
              formData
            );

            showToast(
              `Thanks for applying!`
            );

            router.push(
              `/projects/${projectSlug}`
            );

            router.refresh();

          });
        }}
        className="flex flex-col gap-3 md:flex-row"
      >

        {/* RESUME */}

        <input
          type="text"
          name="resume"
          value={resume}
          onChange={(e) =>
            setResume(e.target.value)
          }
          placeholder="resume / linkedin / portfolio url"
          required
          className="
            flex-[1.5]
            border border-gray-300
            px-3 py-2
            text-sm
            outline-none
          "
        />

        {/* PHONE */}

        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => {

            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            if (value.length <= 10) {
              setPhone(value);
            }
          }}
          placeholder="phone (optional)"
          maxLength={10}
          className="
            flex-1
            border border-gray-300
            px-3 py-2
            text-sm
            outline-none
          "
        />

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={pending}
          className="
            cursor-pointer
            border border-gray-400
            px-4 py-1
            text-sm
            hover:bg-blue-50
          "
        >
          {pending
            ? "applying..."
            : "fast apply"}
        </button>

      </form>

    </div>
  );
}