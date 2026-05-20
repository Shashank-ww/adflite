"use client";

import { useState } from "react";

export default function LiveCurrentsShell({
  children,
}: {
  children: React.ReactNode;
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="w-full sm:w-auto">

      {/* TOGGLE */}

      {!open && (

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
            flex items-center gap-2
            group

            border
            border-[#39ff14]/30

            bg-slate-800

            px-3 py-2

            font-mono
            text-[10px]
            text-[#7dd3fc]

            hover:border-[#39ff14]/60
            hover:text-white

            transition-all
          "
        >
          <span className="text-[#39ff14]">
            &gt;_
          </span>

          <p className="ml-0
                        max-w-0
                        overflow-hidden
                        whitespace-nowrap

                        opacity-0

                        transition-all
                        duration-300

                        group-hover:ml-0
                        group-hover:max-w-30
                        group-hover:opacity-100"> 
                        backcurrents
        </p>
        </button>

      )}

      {/* TERMINAL */}

      {open && (

        <div className="relative">

          {/* CLOSE */}

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
              absolute
              right-2
              top-3
              z-10
            font-mono
              text-[9px]
              text-[#5f7d92]

              hover:text-white

              transition
            "
          >

            close

          </button>

          {children}

        </div>

      )}

    </div>

  );
}