"use client";

import { useEffect, useState } from "react";

import {
  X,
  FileText,
} from "lucide-react";

type Props = {
  url: string;
};

export default function ResumeViewer({
  url,
}: Props) {

   const [open, setOpen] =
    useState(false);

  // ESC CLOSE
  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        className="
          inline-flex
          items-center
          gap-1
          text-blue-600
          underline
        "
      >
        <FileText size={14} />
        view resume
      </button>

      {open && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70
            p-0
          "
        >
          <div
            className="
              flex flex-col
              h-screen
              w-full
              max-w-6xl
              overflow-hidden
              rounded-md
              bg-white
            "
          >
            {/* HEADER */}

            <div
              className="
                flex items-center
                justify-between
                border-b
                px-4 py-3
              "
            >
              <span className="text-sm font-medium">
                Resume Preview
              </span>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
              >
                <X size={18} />
              </button>
            </div>

            {/* PDF */}

            <div className="flex-1 min-h-0 border-4 border-red-500">
              <iframe
                src={url}
                title="Resume"
                className="
                  h-full
                  w-full
                  border-0
                "
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}