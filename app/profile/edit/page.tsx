import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

import { updateProfile } from "@/actions/profileActions";

export default async function EditProfilePage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">

      <div className="mb-4">

        <Link
          href="/profile"
          className="text-sm hover:underline"
        >
          ← back to profile
        </Link>

      </div>

      <h1 className="mb-6 text-xl font-bold">
        edit profile
      </h1>

      <form
  action={updateProfile}
  className="flex flex-col gap-5 border border-gray-300 bg-white p-6"
>

  {/* NAME */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      name
    </label>

    <input
      type="text"
      name="name"
      defaultValue={user.name || ""}
      className="w-full border border-gray-300 px-3 py-2 outline-none"
    />

  </div>

  {/* HEADLINE */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      headline
    </label>

    <input
      type="text"
      name="headline"
      defaultValue={user.headline || ""}
      placeholder="media buyer · adops · growth"
      className="w-full border border-gray-300 px-3 py-2 outline-none"
    />

  </div>

  {/* STATUS */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      status
    </label>

    <select
      name="status"
      defaultValue={user.status || ""}
      className="w-full border border-gray-300 bg-white px-3 py-2 outline-none"
    >

      <option value="">
        select status
      </option>

      <option value="open to work">
        open to work
      </option>

      <option value="available for freelance">
        available for freelance
      </option>

      <option value="building something">
        building something
      </option>

      <option value="hiring">
        hiring
      </option>

      <option value="just networking">
        just networking
      </option>

      <option value="exploring opportunities">
        exploring opportunities
      </option>

    </select>

  </div>

  {/* LOCATION */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      location
    </label>

    <input
      type="text"
      name="location"
      defaultValue={user.location || ""}
      className="w-full border border-gray-300 px-3 py-2 outline-none"
    />

  </div>

  {/* RATE + EXPERIENCE */}

  <div className="grid gap-5 md:grid-cols-2">

    <div>

      <label className="mb-2 block text-sm font-bold">
        hourly rate
      </label>

      <input
        type="text"
        name="hourlyRate"
        defaultValue={user.hourlyRate || ""}
        placeholder="$25/hr"
        className="w-full border border-gray-300 px-3 py-2 outline-none"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-bold">
        experience
      </label>

      <input
        type="number"
        name="experience"
        defaultValue={
          user.experience || ""
        }
        placeholder="5"
        className="w-full border border-gray-300 px-3 py-2 outline-none"
      />

    </div>

  </div>

  {/* LANGUAGES */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      languages
    </label>

    <input
      type="text"
      name="languages"
      defaultValue={
        user.languages?.join(", ") || ""
      }
      placeholder="english, hindi"
      className="w-full border border-gray-300 px-3 py-2 outline-none"
    />

  </div>

  {/* SKILLS */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      skills
    </label>

    <input
      type="text"
      name="skills"
      defaultValue={
        user.skills.join(", ")
      }
      placeholder="meta ads, analytics, seo"
      className="w-full border border-gray-300 px-3 py-2 outline-none"
    />

  </div>

  {/* BIO */}

  <div>

    <label className="mb-2 block text-sm font-bold">
      bio
    </label>

    <textarea
      rows={6}
      name="bio"
      defaultValue={user.bio || ""}
      className="w-full border border-gray-300 px-3 py-2 outline-none"
    />

  </div>

  <button
    type="submit"
    className="text-left text-sm hover:underline"
  >
    save profile
  </button>

</form>

    </main>
  );
}