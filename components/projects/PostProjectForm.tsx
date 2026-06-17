"use client";

import { createProject } from "@/actions/projectActions";
import SubmitPostButton from "@/components/ui/forms/SubmitPostButton";

export default function PostProjectForm() {
  return (
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
          minLength={10}
          placeholder="looking for a contractual meta ads buyer for ecommerce brand"
          className="w-full border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
        />

        <p className="mt-2 text-xs text-gray-500">
          keep it direct, searchable, and
          specific
        </p>
      </div>

      {/* DESCRIPTION */}

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-sm font-bold">
            description
          </label>

          <span className="text-xs text-gray-500">
            minimum 50 characters
          </span>
        </div>

        <textarea
          rows={10}
          name="description"
          required
          minLength={50}
          placeholder={`what is your scope of work?

mention:
• deliverables
• tools/platforms involved
• industry/category
• ideal experience
• communication expectations

example:

looking for someone to manage meta ads for a d2c skincare brand. need support with campaign launches, creative testing, reporting, and scaling. experience with ecommerce brands preferred.`}
          className="w-full border border-gray-300 px-3 py-3 leading-7 outline-none transition focus:border-black"
        />

        <p className="mt-2 text-xs text-gray-500">
          detailed listings usually attract
          higher quality applicants
        </p>
      </div>

      {/* BUDGET + TIMELINE */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-bold">
            budget
          </label>

          <input
            type="text"
            name="budget"
            placeholder="₹25,000/month or ₹1,500/hour"
            className="w-full border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
          />

          <p className="mt-2 text-xs text-gray-500">
            optional but improves response quality
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold">
            timeline
          </label>

          <input
            type="text"
            name="timeline"
            placeholder="2 months · ongoing · immediate"
            className="w-full border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
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
          defaultValue=""
          className="w-full border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-black"
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
          defaultValue=""
          className="w-full border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-black"
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
          listings are public once published,
          and can be edited later.
        </p>

        <SubmitPostButton />
      </div>
    </form>
  );
}