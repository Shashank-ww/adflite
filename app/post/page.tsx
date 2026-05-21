import Link from "next/link";

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

                <div className="flex flex-wrap mb-4 items-center justify-between gap-2">

            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-black">
              ← back home
            </Link>

          

          <Link
            href="/projects"
            className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
            cancel post
          </Link>

        </div>

      {/* HEADER */}
      
      <div className="mb-6"> 
        
        <h1 className="text-xl font-bold"> post a listing </h1> 
            <p className="mt-2 text-sm leading-6 text-gray-500"> 
              share exactly what you need help with. clear listings get better applications, faster responses, and more relevant talent applying for the project. 
            </p> 
          </div>


      {/* FORM */}

      <form
        action={createProject}
        className="flex flex-col gap-6 border border-gray-300 bg-white p-6"
      >

        {/* TITLE */}

        <div>

          <div className="mb-2 flex items-center justify-between gap-3">

            <label className="block text-sm font-bold">
              title
            </label>

            <span className="text-xs text-gray-400">
              first thing people notice
            </span>

          </div>

          <input
            type="text"
            name="title"
            required
            placeholder="looking for a contractual meta ads buyer for ecommerce brand"
            className="
              w-full border border-gray-300
              px-3 py-2
              outline-none
              transition
              focus:border-black
            "
          />

          <p className="mt-2 text-xs text-gray-500">
            keep it direct, searchable, and specific
          </p>

        </div>

        {/* DESCRIPTION */}

        <div>

          <div className="mb-2 flex items-center justify-between gap-3">

            <label className="block text-sm font-bold">
              description
            </label>

            <span className="text-xs text-gray-500">
              max 200 words
            </span>

          </div>

          <textarea
            rows={10}
            name="description"
            required
            placeholder={`what is your scope of work?

mention:
• deliverables
• tools/platforms involved
• industry/category
• ideal experience
• communication expectations

example:

looking for someone to manage meta ads for a d2c skincare brand. need support with campaign launches, creative testing, reporting, and scaling. experience with ecommerce brands preferred.`}
            className="
              w-full border border-gray-300
              px-3 py-3
              leading-7
              outline-none
              transition
              focus:border-black
            "
          />

          <p className="mt-2 text-xs text-gray-500">

            detailed listings usually attract higher quality applicants

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
              className="
                w-full border border-gray-300
                px-3 py-2
                outline-none
                transition
                focus:border-black
              "
            />

            <p className="mt-2 text-xs text-gray-500">
              optional but improves response quality
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
              className="
                w-full border border-gray-300
                px-3 py-2
                outline-none
                transition
                focus:border-black
              "
            />

            <p className="mt-2 text-xs text-gray-500">
              mention expected duration or urgency
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
            className="
              w-full border border-gray-300
              bg-white
              px-3 py-2
              outline-none
              transition
              focus:border-black
            "
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

        {/* WORK SETUP */}

        <div>

          <label className="mb-2 block text-sm font-bold">
            work setup
          </label>

          <select
            name="location"
            className="
              w-full border border-gray-300
              bg-white
              px-3 py-2
              outline-none
              transition
              focus:border-black
            "
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

        <div className="flex items-center justify-between border-t border-gray-200 pt-5">

          <p className="text-xs text-gray-500">
            listings are public once published, you can edit them later
          </p>

          <button
            type="submit"
            className="
              border border-black
              bg-black
              px-4 py-2
              text-sm text-white
              transition
              hover:opacity-90
            "
          >
            publish listing
          </button>

        </div>

      </form>

    </main>
  );
}