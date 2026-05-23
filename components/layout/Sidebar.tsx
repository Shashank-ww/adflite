import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { BellRing, BookmarkPlus, FileUser, FolderGit, FolderTree, MessagesSquare, Save, Telescope } from "lucide-react";

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

  const user =
    session?.user?.email

      ? await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },

          select: {
            name: true,
            username: true,
            image: true,

            headline: true,
            bio: true,

            experience: true,
            location: true,

            status: true,
          },
        })

      : null;

  return (
    <aside className="hidden w-72 shrink-0 lg:block">

      <div
        className="
          sticky top-4
          overflow-hidden
          border border-gray-300
          bg-white
          rounded-md
        "
      >

{/* PROFILE */}

{user ? (

  <div className="border-b border-gray-200 bg-stone-50 p-4">

    {/* TOP */}

    <div className="flex items-start gap-3">

      {/* AVATAR */}

      <Link
        href="/profile"
        className="shrink-0"
      >

        {user.image ? (

          <img
            src={user.image}
            alt={user.name || "user"}
            className="
              h-16 w-16
              rounded-full
              border border-gray-300
              object-cover
            "
          />

        ) : (

          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-full
              border border-gray-300
              bg-white
              text-xl
              uppercase
            "
          >
            {user.name?.[0] || "U"}
          </div>

        )}

      </Link>

      {/* IDENTITY */}

      <div className="min-w-0 flex-1">

        <Link
          href="/profile"
          className="
            block truncate
            text-lg font-semibold
            text-black
            hover:underline
          "
        >
          {user.name || "anonymous"}
        </Link>

        <div
          className="
            space-y-2
            flex flex-wrap
            items-center
            gap-x-1
            text-xs text-gray-500
          "
        >

          {user.username && (

            <Link
              href={`/u/${user.username}`}
              className="hover:underline"
            >
              @{user.username}
            </Link>

          )}

          {user.status && (

            <span
              className="
                border border-gray-300
                bg-white
                px-2 py-1
                text-xs
                text-gray-700
              "
            >
              {user.status}
            </span>

          )}

        </div>

      </div>

    </div>

    {/* BIO HEADLINE */}

        {(user.headline || user.location) && (

          <div
            className="
              mt-3
              text-sm
              leading-5
              text-gray-700
            "
          >

            {user.headline}

            {user.headline &&
              user.location && (
                <span className="text-gray-400">
                  {" "}
                  | {" "}
                </span>
              )}

            {user.location}

          </div>

        )}

    {user.bio && (

      
      <p
      className="
      mt-2
      line-clamp-3
      text-sm
      text-gray-500
      "
      >
        <span className="text-gray-400">bio | </span>
        {user.bio}
      </p>

    )}

    {/* PROFILE ACTIONS FOOTER */}

<div className="mt-4 flex items-center gap-2">

  <Link
    href="/profile"
    className="
      border border-neutral-300
      bg-white
      px-2 py-1
      text-xs font-medium
      text-neutral-700
      transition
      hover:border-neutral-400
      hover:bg-blue-100
      hover:text-black
    "
  >
    view profile
  </Link>

  <Link
    href="/settings"
    className="
      
      border border-transparent
      px-2 py-1
      text-xs font-medium
      text-neutral-500
      transition
      bg-gray-200
      hover:bg-blue-100
      hover:text-black
    "
  >
    edit profile
  </Link>

</div>

  </div>

) : (

  <div className="border-b border-gray-200 bg-stone-50 p-4">

    <h1 className="text-lg font-semibold text-blue-950">
      navigate your next modern work online.
    </h1>

    <p className="mt-2 text-sm leading-5 text-gray-600">
      find work worth switching to.
    </p>

  </div>

)}

        {/* ACTION 

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
        */}

        {/* WORKSPACE */}

        {session && (

          <div className="border-b border-neutral-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-neutral-500">
              <FolderTree size={20} strokeWidth={1.6} className="shrink-0" />

              <span className="leading-none">my workspace</span>
            </div>


            <nav className="flex flex-col text-sm">

              <Link
                href="/projects"
                className="
                        flex items-center gap-2
                        rounded-md
                        px-2 py-2
                        text-neutral-700
                        transition-colors
                        hover:bg-black/5
                        hover:text-black
                        "
                      >
                <FolderGit size={16} strokeWidth={1.6} />
                my projects
              </Link>

  <Link
    href="/applications"
    className="
      flex items-center gap-2
      rounded-md
      px-2 py-2
      text-neutral-700
      transition-colors
      hover:bg-black/5
      hover:text-black
    "
  >
    <FileUser size={16} strokeWidth={1.6} />
    applications
  </Link>

  <Link
    href="/saved"
    className="
      flex items-center gap-2
      rounded-md
      px-2 py-2
      text-neutral-700
      transition-colors
      hover:bg-black/5
      hover:text-black
    "
  >
    <Save size={16} strokeWidth={1.6} />
    saved
  </Link>

<Link
    href="/messages"
    className="
      flex items-center gap-2
      rounded-md
      px-2 py-2
      text-neutral-700
      transition-colors
      hover:bg-black/5
      hover:text-black
    "
  >
    <MessagesSquare size={16} strokeWidth={1.6} />
    messages
  </Link>

  <Link
    href="/pings"
    className="
      flex items-center gap-2
      rounded-md
      px-2 py-2
      text-neutral-700
      transition-colors
      hover:bg-black/5
      hover:text-black
    "
  >
    <BellRing size={16} strokeWidth={1.6} />
    pings
  </Link>

            </nav>

          </div>

        )}

        {/* DISCOVER */}

        <div className="border-b border-gray-200 p-4">
<div className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-neutral-500">
  <Telescope size={20} strokeWidth={1.6} className="shrink-0" />

  <span className="leading-none">discover</span>
</div>

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