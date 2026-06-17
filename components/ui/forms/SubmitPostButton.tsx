"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitPostButton() {
  const { pending } =
    useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        border border-black
        bg-black
        px-4 py-2
        text-sm text-white
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          publishing...
        </span>
      ) : (
        "publish listing"
      )}
    </button>
  );
}