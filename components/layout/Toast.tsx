"use client";

import {
  useEffect,
} from "react";

import { BellRingIcon, X } from "lucide-react";

type Props = {
  message: string;

  show: boolean;

  onClose: () => void;
};

export default function Toast({
  message,
  show,
  onClose,
}: Props) {

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () =>
      clearTimeout(timer);

  }, [show, onClose]);

  return (
    <div className={`fixed bottom-5 left-5 z-9999 transition-all duration-300 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >

     <div className="flex items-start gap-3 min-w-70 max-w-sm border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 shadow-2xl">

  {/* LEFT ICON */}
  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-200">

    <BellRingIcon size={16} />

  </div>

  {/* MESSAGE */}
  <div className="min-w-0 flex-1">

    <p className="wrap-break-word leading-relaxed text-neutral-100">

      {message}

    </p>

  </div>

  {/* CLOSE */}
  <button
    onClick={onClose}
    className="flex h-6 w-6 shrink-0 items-center justify-center 
    rounded-full bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700 hover:text-white" 
    aria-label="Close toast">

    <X size={14} />

  </button>

</div>

    </div>
  );
}