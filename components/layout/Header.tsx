"use client";

import Link from "next/link";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Header() {
  const { data: session } =
    useSession();

  return (
    <header className="border-b border-gray-300 bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        <Link
          href="/"
          className="text-base font-bold tracking-wide"
        >
          adflite.com
        </Link>

        <div className="flex items-center gap-4 text-sm">

          <nav className="flex items-center gap-4">

            <Link href="/">
              home
            </Link>

            <Link href="/">
              projects
            </Link>

            <Link href="/messages">
              messages
            </Link>

            <Link href="/profile">
              profile
            </Link>

            <Link href="/settings">
              settings
            </Link>

          </nav>

          <span className="text-gray-400">
            |
          </span>

          <div className="flex items-center gap-4">

            <Link href="/post">
              + listing
            </Link>

            {session?.user ? (
              <>
                <span className="text-gray-500">
                  {session.user.name}
                </span>

                <button
                  onClick={() =>
                    signOut()
                  }
                >
                  logout
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  signIn("google")
                }
              >
                login
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}