import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

import SettingsToggles from "@/components/ui/settings-toggles";

export default async function SettingsPage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }


const [
  user,
  projectCount,
  applicationCount,
  savedCount,
  pingCount,
] = await Promise.all([
  prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      accounts: true,
    },
  }),

  prisma.project.count({
    where: {
      userId: session.user.id,
    },
  }),

  prisma.application.count({
    where: {
      userId: session.user.id,
    },
  }),

  prisma.savedProject.count({
    where: {
      userId: session.user.id,
    },
  }),

  prisma.ping.count({
    where: {
      senderId: session.user.id,
    },
  }),
]);

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
  <div className="flex gap-3 text-xs">

<Link
  href={`/u/${user.username}`}
  className="hover:underline"
>
  open public profile
</Link>

  </div>
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

              <SettingsToggles
                type="visibility"
                enabled={
                  user.profileVisibility ===
                  "public"
                }
              />

            </div>

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  my listings
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  listings you posted
                </p>

              </div>

              <Link
                href="/projects/my"
                className="text-xs hover:underline"
              >
                show my listings
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

            <SettingsToggles
              type="messages"
              enabled={user.allowMessages}
            />

            </div>

<div className="flex items-center justify-between gap-4">

  <div>

    <p className="font-medium">
      collaboration pings
    </p>

    <p className="mt-1 text-xs text-gray-500">
      allow users to send collaboration pings
    </p>

  </div>

  <SettingsToggles
    type="pings"
    enabled={user.allowPings}
  />

            </div>

          </div>

        </section>

        {/* ACTIVITY STATUS */}

        <section className="border-b border-gray-300 p-6">

  <div className="mb-5">

    <h2 className="font-bold">
      activity
    </h2>

    <p className="mt-1 text-xs text-gray-500">
      manage your projects and activity
    </p>

  </div>

  <div className="flex flex-col gap-5 text-sm">

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium">
          my listings
        </p>

        <p className="mt-1 text-xs text-gray-500">
          projects you've posted
        </p>

      </div>

      <Link
        href="/projects/my"
        className="text-xs hover:underline"
      >
        open
      </Link>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium">
          applications
        </p>

        <p className="mt-1 text-xs text-gray-500">
          submitted applications
        </p>

      </div>

      <Link
        href="/applications"
        className="text-xs hover:underline"
      >
        open
      </Link>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium">
          saved listings
        </p>

      </div>

      <Link
        href="/saved"
        className="text-xs hover:underline"
      >
        open
      </Link>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium">
          messages
        </p>

      </div>

      <Link
        href="/messages"
        className="text-xs hover:underline"
      >
        open
      </Link>

    </div>

    <div className="flex items-center justify-between">

  <div>

    <p className="font-medium">
      collaboration pings
    </p>

    <p className="mt-1 text-xs text-gray-500">
      projects and people you've pinged
    </p>

  </div>

  <Link
    href="/pings"
    className="text-xs hover:underline"
  >
    open
  </Link>

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

        {/* STATISTICS */}

<section className="border-b border-gray-300 p-6">

  <div className="mb-5">

    <h2 className="font-bold">
      statistics
    </h2>

    <p className="mt-1 text-xs text-gray-500">
      your switchwaters activity
    </p>

  </div>

  <div className="grid grid-cols-2 gap-4 text-sm">

    <div className="border border-gray-300 p-3">

      <p className="text-xs text-gray-500">
        listings posted
      </p>

      <p className="mt-2 text-xl font-bold">
        {projectCount}
      </p>

    </div>

    <div className="border border-gray-300 p-3">

      <p className="text-xs text-gray-500">
        applications
      </p>

      <p className="mt-2 text-xl font-bold">
        {applicationCount}
      </p>

    </div>

    <div className="border border-gray-300 p-3">

      <p className="text-xs text-gray-500">
        saved listings
      </p>

      <p className="mt-2 text-xl font-bold">
        {savedCount}
      </p>

    </div>

    <div className="border border-gray-300 p-3">

      <p className="text-xs text-gray-500">
        collaboration pings
      </p>

      <p className="mt-2 text-xl font-bold">
        {pingCount}
      </p>

    </div>

  </div>

</section>

{/* SECURITY */}

<section className="border-b border-gray-300 p-6">

  <div className="mb-5">

    <h2 className="font-bold">
      security
    </h2>

    <p className="mt-1 text-xs text-gray-500">
      account access and ownership
    </p>

  </div>

  <div className="flex flex-col gap-5 text-sm">

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium">
          login provider
        </p>

        <p className="mt-1 text-xs text-gray-500">

          {user.accounts?.[0]?.provider ||
            "credentials"}

        </p>

      </div>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium">
          joined
        </p>

        <p className="mt-1 text-xs text-gray-500">

          {new Date(
            user.createdAt
          ).toLocaleDateString()}

        </p>

      </div>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="font-medium text-red-600">
          delete account
        </p>

        <p className="mt-1 text-xs text-gray-500">
          permanently remove your profile
        </p>

      </div>

      <Link
        href="/profile/edit"
        className="text-xs text-red-600 hover:underline"
      >
        manage
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

<div className="mt-4">

  <p className="text-xs font-medium text-emerald-800">

    @{user.username || "username"}

  </p>

  <p className="mt-2 text-xs text-emerald-700">

    switchwaters.com/u/{user.username}

  </p>

</div>

          </div>

        </section>

      </div>

    </main>
  );
}