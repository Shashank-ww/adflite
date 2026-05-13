"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getProjects, saveProjects } from "@/lib/storage";

export default function PostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [budget, setBudget] = useState("");

  const [timeline, setTimeline] =
    useState("");

  const [category, setCategory] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const existing = getProjects();

    const newProject = {
      id: Date.now(),

      title,

      client: "anonymous",

      budget,

      timeline,

      category,

      description,

      skills: [],

      postedAt: "just now",

      location: "remote",
    };

    const updated = [
      newProject,
      ...existing,
    ];

    saveProjects(updated);

    router.push("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-xl font-bold">
        post a listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-5 border border-gray-300 bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-bold">
            title
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold">
            description
          </label>

          <textarea
            rows={6}
            required
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold">
              budget
            </label>

            <input
              type="text"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              timeline
            </label>

            <input
              type="text"
              value={timeline}
              onChange={(e) =>
                setTimeline(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold">
            category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />
        </div>

        <div className="pt-2 text-sm">
          <button type="submit">
            <a href="#">publish listing</a>
          </button>
        </div>
      </form>
    </main>
  );
}