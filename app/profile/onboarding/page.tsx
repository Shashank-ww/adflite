import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import Link from "next/link";

import { updateProfile } from "@/actions/profileActions";

export default async function OnboardingPage() {
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

  // ALREADY ONBOARDED
  if (user.headline) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">

      <div className="mb-8">

        <h1 className="text-2xl font-bold">

          complete your profile

        </h1>

        <p className="mt-2 text-sm text-gray-500">

          setup your public identity
          before using the platform

        </p>

      </div>

      <form
        action={updateProfile}
        className="flex flex-col gap-5 border border-gray-300 bg-white p-6"
      >

        {/* USER */}
        <div className="flex items-center gap-4">

          <img
            src={
              user.image?.trim()
                ? user.image
                : "/avatars/avatar2.jpg"
            }
            alt="profile"
            className="h-16 w-16 rounded-full border border-gray-300 object-cover"
          />

          <div>

            <p className="font-semibold">

              {user.name}

            </p>

            <p className="text-sm text-gray-500">

              {user.email}

            </p>

          </div>

        </div>

        {/* HEADLINE */}
        <div>

          <label className="mb-2 block text-sm font-bold">

            headline

          </label>

          <input
            type="text"
            name="headline"
            required
            placeholder="media buyer · growth marketer"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        {/* LOCATION */}
        <div>

          <label className="mb-2 block text-sm font-bold">

            location

          </label>

          <input
            type="text"
            name="location"
            placeholder="gurgaon"
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
            placeholder="meta ads, seo, analytics"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        {/* BIO */}
        <div>

          <label className="mb-2 block text-sm font-bold">

            bio

          </label>

          <textarea
            rows={5}
            name="bio"
            placeholder="tell people about yourself"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        <button
          type="submit"
          className="border border-black bg-black px-4 py-2 text-sm text-white"
        >
          continue
        </button>

      </form>

    </main>
  );
}