import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function SettingsPage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">

      {/* TOP NAV */}

      <div className="mb-4 flex gap-4 text-sm">

        <Link
          href="/"
          className="hover:underline"
        >
          ← home
        </Link>

        <Link
          href="/profile"
          className="hover:underline"
        >
          profile
        </Link>

      </div>

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          settings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          manage your identity,
          visibility, listings and preferences
        </p>

      </div>

      <div className="flex flex-col border border-gray-300 bg-white">

        {/* ACCOUNT */}

        <section className="border-b border-gray-300 p-6">

          <div className="mb-5">

            <h2 className="font-bold">
              account
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              login, identity and account controls
            </p>

          </div>

          <div className="flex flex-col gap-4 text-sm">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  signed in as
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {user.email}
                </p>

              </div>

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  display name
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {user.name || "not set"}
                </p>

              </div>

              <Link
                href="/profile/edit"
                className="text-xs hover:underline"
              >
                edit
              </Link>

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  username
                </p>

                <p className="mt-1 text-xs text-gray-500">

                  {user.username
                    ? `@${user.username}`
                    : "not claimed"}

                </p>

              </div>

              <Link
                href="/profile/edit"
                className="text-xs hover:underline"
              >
                manage
              </Link>

            </div>

          </div>

        </section>

        {/* PUBLIC PROFILE */}

        <section className="border-b border-gray-300 p-6">

          <div className="mb-5">

            <h2 className="font-bold">
              public profile
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              your visible identity across switchwaters
            </p>

          </div>

          <div className="flex flex-col gap-5 text-sm">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  public profile url
                </p>

                <p className="mt-1 text-xs text-gray-500">

                  {user.username
                    ? `switchwaters.com/u/${user.username}`
                    : "username required"}

                </p>

              </div>

              {user.username && (
                <Link
                  href={`/u/${user.username}`}
                  className="text-xs hover:underline"
                >
                  open
                </Link>
              )}

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  profile visibility
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  public across platform
                </p>

              </div>

              <span className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px]">
                active
              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  public listings
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  listings posted under your identity
                </p>

              </div>

              <Link
                href="/projects"
                className="text-xs hover:underline"
              >
                view listings
              </Link>

            </div>

          </div>

        </section>

        {/* MESSAGING */}

        <section className="border-b border-gray-300 p-6">

          <div className="mb-5">

            <h2 className="font-bold">
              messages & networking
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              communication preferences
            </p>

          </div>

          <div className="flex flex-col gap-5 text-sm">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  direct messages
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  users can message you
                </p>

              </div>

              <span className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px]">
                enabled
              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  application visibility
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  recruiters and posters can view your profile
                </p>

              </div>

              <span className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px]">
                enabled
              </span>

            </div>

          </div>

        </section>

        {/* PREFERENCES */}

        <section className="border-b border-gray-300 p-6">

          <div className="mb-5">

            <h2 className="font-bold">
              preferences
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              feed and platform preferences
            </p>

          </div>

          <div className="flex flex-col gap-5 text-sm">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  open to opportunities
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  show recruiters you are active
                </p>

              </div>

              <span className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px]">

                {user.status || "inactive"}

              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  saved listings
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  manage saved projects and opportunities
                </p>

              </div>

              <Link
                href="/saved"
                className="text-xs hover:underline"
              >
                open
              </Link>

            </div>

          </div>

        </section>

        {/* WATER IDENTITY */}

        <section className="p-6">

          <div className="mb-5">

            <h2 className="font-bold">
              habitat identity
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              your switchwaters public layer
            </p>

          </div>

          <div className="rounded border border-dashed border-emerald-700 bg-emerald-50 p-4">

            <p className="text-sm leading-7 text-emerald-900">

              your username acts as your
              public water identity across
              listings, pings, messages and
              collaborations.

            </p>

            <p className="mt-4 text-xs text-emerald-800">

              examples:
              bluewhale42 · swampfox ·
              tidalotter · mediacroc12

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}