"use client";

import { useEffect, useState } from "react";

import { X, Download } from "lucide-react";

type Props = {
  url: string;
};

export default function ResumeViewer({
  url,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

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
          border border-gray-300
          px-3 py-2
          text-xs
          hover:bg-gray-50
        "
      >
        View Resume
      </button>

      {open && (

        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70
            p-4
          "
          onClick={() =>
            setOpen(false)
          }
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              flex flex-col
              h-[92vh]
              w-full
              max-w-6xl
              overflow-hidden
              rounded-lg
              bg-white
              shadow-xl
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

              <div className="flex items-center gap-2">

                <a
                  href={url}
                  download
                  className="
                    inline-flex
                    items-center
                    gap-1
                    border
                    border-gray-300
                    px-3 py-1.5
                    text-xs
                    hover:bg-gray-50
                  "
                >
                  <Download
                    size={14}
                  />
                  Download
                </a>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    rounded
                    p-1
                    hover:bg-gray-100
                  "
                >
                  <X size={18} />
                </button>

              </div>

            </div>

            {/* PDF */}

            <div className="relative flex-1 min-h-0">

              {loading && (
                <div
                  className="
                    absolute inset-0
                    flex items-center
                    justify-center
                    bg-white
                    text-sm
                    text-gray-500
                  "
                >
                  Loading resume...
                </div>
              )}

              <iframe
                src={`${url}#view=FitH`}
                title="Resume"
                onLoad={() =>
                  setLoading(false)
                }
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