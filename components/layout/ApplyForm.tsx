"use client";

import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import { applyToProject } from "@/actions/applicationActions";
import { useToast } from "@/components/providers/ToastProvider";
import { Loader2 } from "lucide-react";

type Props = {
  projectId: string;
  projectSlug: string;
  projectTitle: string;

  applicantName?: string | null;

  applicantEmail?: string | null;

  disabled?: boolean;
};

export default function ApplyForm({
  projectId,
  projectSlug,
  projectTitle,
  applicantName,
  applicantEmail,
  disabled = false,
}: Props) {
  const router = useRouter();

  const { showToast } = useToast();

  const [pending, startTransition] =
    useTransition();

  const [phone, setPhone] =
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

      const result =
        await applyToProject(
          formData
        );

      if (
        result.status ===
        "resume_required"
      ) {

        showToast(
          "please upload a resume first"
        );

        router.push(
          "/profile/edit"
        );

        return;
      }

      if (
        result.status ===
        "already_applied"
      ) {

        showToast(
          "already applied"
        );

        return;
      }

      showToast(
        "application submitted"
      );

      router.push(
        `/projects/${projectSlug}`
      );

      router.refresh();

    });

  }}
  className="space-y-4"
>

        {/* PHONE */}

        <div>

  <label className="mb-2 block text-sm font-medium">

    phone number

  </label>

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
    placeholder="9876543210"
    maxLength={10}
    className="
      w-full
      border
      border-gray-300
      px-3
      py-2
      outline-none
    "
  />

</div>

{/* MESSAGE TO RECRUITER */}

        <div>

  <label className="mb-2 block text-sm font-medium">

    message to recruiter

  </label>

  <textarea
    name="message"
    rows={5}
    placeholder="Hi, I have relevant experience for this opportunity and would love to discuss further."
    className="
      w-full
      border
      border-gray-300
      px-3
      py-2
      outline-none
    "
  />

</div>

        {/* SUBMIT */}

<div className="flex justify-end">
  <button
    type="submit"
    disabled={pending || disabled}
    className="
      flex items-center gap-2
      border border-blue-500
      bg-green-600
      px-3 py-2
      text-sm font-medium
      disabled:opacity-50
      cursor-pointer
    "
  >
    {pending && <Loader2 size={16} />}

    {disabled
      ? "Upload Resume"
      : pending
      ? "Applying..."
      : "Send Application"}
  </button>
</div>

      </form>

    </div>
  );
}