import { createProject } from "@/actions/projectActions";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

import { redirect } from "next/navigation";

export default async function PostPage() {

  const session =
  await getServerSession(authOptions);

if (!session) {
  redirect("/");
}

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">

      <h1 className="text-xl font-bold">
        post a listing
      </h1>

      <form
        action={createProject}
        className="mt-6 flex flex-col gap-5 border border-gray-300 bg-white p-6"
      >

        <div>

          <label className="mb-2 block text-sm font-bold">
            title
          </label>

          <input
            type="text"
            name="title"
            required
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-bold">
            description
          </label>

          <textarea
            rows={6}
            name="description"
            required
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
              name="budget"
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold">
              timeline
            </label>

            <input
              type="text"
              name="timeline"
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
            name="category"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        <div className="pt-2 text-sm">

          <button
            type="submit"
            className="hover:underline"
          >
            publish listing
          </button>

        </div>

      </form>
    </main>
  );
}