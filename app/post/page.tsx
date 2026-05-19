import { createProject } from "@/actions/projectActions";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function PostPage() {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-xl font-bold">
          post a listing
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">

          share exactly what you need help with.

          clear listings get better applications,
          faster responses, and more relevant talent.

        </p>

      </div>

      {/* FORM */}

      <form
        action={createProject}
        className="flex flex-col gap-6 border border-gray-300 bg-white p-6"
      >

        {/* TITLE */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            title
          </label>

          <input
            type="text"
            name="title"
            required
            placeholder="looking for a contractual meta ads buyer for ecommerce brand"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">

            keep it direct and specific

          </p>

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            description
          </label>

              <span className="text-xs text-gray-500">
      Max 200 words
    </span>

          <textarea
            rows={10}
            name="description"
            required
            placeholder={`what is your scope of work?

mention expected deliverables
tools/platforms involved
industry/category with ideal experience
working style and availability expectations

example:

looking for someone to manage meta ads for a d2c skincare brand. need support with campaign launches, creative testing, reporting, and scaling. experience with ecommerce brands preferred.`}
            className="w-full border border-gray-300 px-3 py-2 leading-7 outline-none"
          />

          <p className="mt-2 text-xs text-gray-500">

            detailed listings usually attract better quality applicants

          </p>

        </div>

        {/* META */}

        <div className="grid gap-5 md:grid-cols-2">

          {/* BUDGET */}

          <div>

            <label className="mb-2 block text-sm font-bold">
              budget
            </label>

            <input
              type="text"
              name="budget"
              placeholder="₹25,000/month or ₹1,500/hour"
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />

            <p className="mt-2 text-xs text-gray-500">

              optional but recommended

            </p>

          </div>

          {/* TIMELINE */}

          <div>

            <label className="mb-2 block text-sm font-bold">
              timeline
            </label>

            <input
              type="text"
              name="timeline"
              placeholder="2 months · ongoing · immediate"
              className="w-full border border-gray-300 px-3 py-2 outline-none"
            />

            <p className="mt-2 text-xs text-gray-500">

              mention expected duration

            </p>

          </div>

        </div>

        {/* CATEGORY */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            category
          </label>

          <select
            name="category"
            className="w-full border border-gray-300 bg-white px-3 py-2 outline-none"
            defaultValue=""
          >

            <option value="">
              select category
            </option>

            <option value="media buying">
              media buying
            </option>

            <option value="performance marketing">
              performance marketing
            </option>

            <option value="ad operations">
              ad operations
            </option>

            <option value="ugc creators">
              ugc creators
            </option>

            <option value="video editing">
              video editing
            </option>

            <option value="graphic design">
              graphic design
            </option>

            <option value="copywriting">
              copywriting
            </option>

            <option value="analytics">
              analytics
            </option>

            <option value="seo">
              seo
            </option>

            <option value="social media">
              social media
            </option>

            <option value="web development">
              web development
            </option>

            <option value="email marketing">
              email marketing
            </option>

          </select>

        </div>

        {/* LOCATION */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            work setup
          </label>

          <select
            name="location"
            className="w-full border border-gray-300 bg-white px-3 py-2 outline-none"
            defaultValue=""
          >

            <option value="">
              select setup
            </option>

            <option value="remote">
              remote
            </option>

            <option value="india remote">
              india remote
            </option>

            <option value="hybrid">
              hybrid
            </option>

            <option value="on-site">
              on-site
            </option>

            <option value="global">
              global
            </option>

          </select>

        </div>

        {/* FOOTER */}

        <div className="border-t border-gray-200 pt-5">

          <button
            type="submit"
            className="text-sm hover:underline"
          >
            publish listing
          </button>

        </div>

      </form>

    </main>
  );
}