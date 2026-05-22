import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

const categories = [
  {
    label: "media buying",
    href: "/?category=media-buying",
  },

  {
    label: "editing",
    href: "/?category=editing",
  },

  {
    label: "ugc creators",
    href: "/?category=ugc-creators",
  },

  {
    label: "analytics",
    href: "/?category=analytics",
  },

  {
    label: "copywriting",
    href: "/?category=copywriting",
  },

  {
    label: "design",
    href: "/?category=design",
  },
];

export default async function Sidebar() {

  const session =
    await getServerSession(authOptions);

  return (
    <aside className="hidden w-60 shrink-0 lg:block">

      <div
        className="
          sticky top-4
          overflow-hidden
          border border-gray-300
          bg-white
        "
      >

        {/* ACTION */}

        <div className="border-b border-gray-200 p-4">

          <Link
            href="/about"
            className="
              flex items-center
              justify-center
              border border-gray-300
              bg-blue-50
              px-4 py-2
              text-sm
              transition
              hover:bg-white
            "
          >
            explore site
          </Link>

        </div>

        {/* WORKSPACE */}

        {session && (

          <div className="border-b border-gray-200 p-4">

            <p
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-gray-500
              "
            >
              workspace
            </p>

            <nav className="flex flex-col text-sm">

              <Link
                href="/projects"
                className="
                  border-b border-gray-100
                  py-2
                  hover:text-black
                "
              >
                my projects
              </Link>

              <Link
                href="/applications"
                className="
                  border-b border-gray-100
                  py-2
                  hover:text-black
                "
              >
                applications
              </Link>

              <Link
                href="/saved"
                className="
                  border-b border-gray-100
                  py-2
                  hover:text-black
                "
              >
                saved listings
              </Link>

              <Link
                href="/messages"
                className="
                  border-b border-gray-100
                  py-2
                  hover:text-black
                "
              >
                messages
              </Link>

              <Link
                href="/pings"
                className="
                  py-2
                  hover:text-black
                "
              >
                pings
              </Link>

            </nav>

          </div>

        )}

        {/* DISCOVER */}

        <div className="border-b border-gray-200 p-4">

          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
            "
          >
            discover
          </p>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/"
              className="
                border border-gray-300
                px-2 py-1
                text-xs
                hover:bg-gray-50
              "
            >
              all
            </Link>

            {categories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  border border-gray-300
                  px-2 py-1
                  text-xs
                  hover:bg-gray-50
                "
              >
                {item.label}
              </Link>
            ))}

          </div>

        </div>

        {/* SIGN OFF */}

        <div className="p-4">

          <p className="text-xs leading-5 text-gray-500">

            independent by nature.
            <br />
            simple on purpose.

          </p>

          <p className="mt-3 text-[11px] text-gray-400">

            &copy; 2026 switchwaters.com

          </p>

        </div>

      </div>

    </aside>
  );
}