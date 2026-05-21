"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useToast } from "@/components/providers/ToastProvider";

const categories = [
  {
    label: "all",
    value: "all",
  },

  {
    label: "media buying",
    value: "media-buying",
  },

  {
    label: "editing",
    value: "editing",
  },

  {
    label: "ugc creators",
    value: "ugc-creators",
  },

  {
    label: "analytics",
    value: "analytics",
  },

  {
    label: "copywriting",
    value: "copywriting",
  },

  {
    label: "design",
    value: "design",
  },
];

type Props = {
  query?: string;
  category?: string;
};

export default function SearchStrip({
  query,
  category,
}: Props) {

  const router = useRouter();

  const { showToast } = useToast();

  const [search, setSearch] =
    useState(query || "");

  function handleSearch(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    showToast(
      "diving into the swamps..."
    );

    const trimmed =
      search.trim();

    // SEARCH SHOULD STAND ALONE
    if (trimmed) {

      router.push(
        `/?q=${encodeURIComponent(
          trimmed
        )}`
      );

      return;
    }

    // EMPTY SEARCH RETURNS HOME
    router.push("/");
  }

  function handleReset() {

    setSearch("");

    showToast(
      "resetting the waters..."
    );

    router.push("/");
  }

  return (
    <section className="border-b border-gray-300 bg-neutral-100">

      {/* SEARCH */}
      <form
        onSubmit={handleSearch}
        className="border-b border-gray-300 p-3"
      >

        <div className="flex flex-wrap gap-2">

          <input
            type="text"
            name="q"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="search the open waters..."
            className="
              min-w-0
              flex-1
              border
              border-gray-400
              bg-white
              px-3
              py-2
              text-sm
              text-black
              outline-none
            "
          />

          <button
            type="submit"
            className="
              border
              border-gray-400
              bg-white
              px-4
              py-2
              text-sm
              text-black
              hover:bg-gray-100
            "
          >
            search
          </button>

        </div>

      </form>

      {/* ACTIVE VIEW */}
      {(query || category) && (
        <div className="flex items-center justify-between border-b border-gray-300 bg-white px-3 py-2 text-xs">

          <div className="flex flex-wrap items-center gap-2 text-gray-600">

            <span>
              viewing:
            </span>

            {query && (
              <span className="border border-gray-300 bg-neutral-100 px-2 py-1 font-medium text-black">

                {query}

              </span>
            )}

            {category &&
              category !== "all" && (
                <span className="border border-blue-700 bg-white px-2 py-1 font-medium text-blue-700">

                  {
                    category.replaceAll(
                      "-",
                      " "
                    )
                  }

                </span>
              )}

          </div>

          <button
            type="button"
            onClick={handleReset}
            className="
              shrink-0
              text-gray-500
              hover:text-black
              hover:underline
            "
          >
            clear
          </button>

        </div>
      )}

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 p-3 text-xs">

        {categories.map((item) => {

          const isActive =
            (item.value === "all" &&
              !category) ||
            category === item.value;

          const href =
            item.value === "all"
              ? "/"
              : `/?category=${item.value}`;

          return (
            <Link
              key={item.value}
              href={href}
              className={`
                border
                px-2
                py-1
                transition
                hover:bg-white

                ${
                  isActive
                    ? "border-blue-700 bg-white font-medium text-blue-700"
                    : "border-gray-300 text-black"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}

      </div>

    </section>
  );
}