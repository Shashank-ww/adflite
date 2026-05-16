"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { useToast } from "@/components/providers/ToastProvider";

export default function FeedIntroActions() {

  const { showToast } = useToast();

  const { data: session } =
    useSession();

  return (
    <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-4">

      {/* POST */}

      <Link
        href={
          session?.user
            ? "/post"
            : "#"
        }
        onClick={(e) => {

          if (!session?.user) {

            e.preventDefault();

            showToast(
              "login or register to post a listing"
            );

            return;
          }

          showToast(
            "creating a new listing..."
          );
        }}
        className="
          inline-flex w-full items-center justify-center

          border border-blue-300
          bg-blue-100

          px-4 py-2

          text-center

          transition

          hover:bg-blue-200

          sm:w-auto
        "
      >

        post a listing

      </Link>

      {/* BROWSE */}

      <Link
        href="/projects"
        onClick={() => {
          showToast(
            "loading project listings..."
          );
        }}
        className="
          inline-flex w-full items-center justify-center

          border border-blue-200
          bg-white

          px-4 py-2

          text-center

          transition

          hover:bg-blue-100

          sm:w-auto
        "
      >

        browse listings

      </Link>

    </div>
  );
}