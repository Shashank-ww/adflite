import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">

      <div className="mb-4">

        <Link
          href="/"
          className="text-sm hover:underline"
        >
          ← home
        </Link>

      </div>

      <h1 className="mb-6 text-xl font-bold">
        settings
      </h1>

      <div className="border border-gray-300 bg-white p-6 text-sm">

        <div className="flex flex-col gap-4">

          <Link
            href="/profile"
            className="hover:underline"
          >
            edit profile
          </Link>

          <button className="text-left hover:underline">
            account preferences
          </button>

          <button className="text-left hover:underline">
            notification settings
          </button>

        </div>

      </div>

    </main>
  );
}