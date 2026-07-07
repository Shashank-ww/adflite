"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useToast } from "@/components/providers/ToastProvider";

import {
  OrigamiIcon,
  House,
  FolderGit2,
  MessagesSquare,
  LogIn,
  User,
  Settings,
  Plus,
  LogOut,
  FolderGit,
  CirclePlus,
} from "lucide-react";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

function Loader() {
  return (
    <span className="ml-1">
      ...
    </span>
  );
}

export default function Header() {
  
  const { showToast } = useToast();
  
  const {
    data: session,
    status,
  } = useSession();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [authLoading, setAuthLoading] =
    useState(false);

  const [unreadCount, setUnreadCount] =
    useState(0);

    useEffect(() => {

  if (!session?.user) {
    return;
  }

  async function loadUnread() {

    try {

      const res =
        await fetch("/api/messages");

      const messages =
        await res.json();

      const unread =
        messages.filter(
          (msg: any) =>
            !msg.seen
        ).length;

      setUnreadCount(unread);

    } catch {
      setUnreadCount(0);
    }
  }

  loadUnread();

}, [session]);

const links = [
  {
    href: "/",
    label: "home",
    icon: House,
  },

  {
    href: "/projects",
    label: "projects",
    icon: FolderGit2,
  },

  {
    href: "/messages",
    label: "messages",
    icon: MessagesSquare,
    count: unreadCount > 0 ? unreadCount : undefined,
  },
];


  return (
    <header className="border-b border-gray-300 bg-white">

      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 py-3">

        {/* LOGO */}

        <Link
          href="/"
          className="flex text-base font-bold tracking-wide gap-1 items-center justify-center"
        >
          <OrigamiIcon size={20} strokeWidth={1.6} />

          <div className="flex items-center">
            <p className="font-thin">switch</p>
            <p className="font-bold">waters</p>
            <span className="text-neutral-400">.com</span>
          </div>
        </Link>

        {/* DESKTOP */}

        <div className="hidden items-center gap-4 text-sm md:flex">

          <nav className="flex items-center gap-4">

{links.map((link) => {
  const Icon = link.icon;

  return (
    <Link
      key={link.href}
      href={link.href}
      className="hover:underline"
    >
      <div className="flex items-center gap-1.5">

        <Icon
          size={16}
          strokeWidth={1.6}
        />

        <span>{link.label}</span>

        {link.count ? (
          <span>
            ({link.count})
          </span>
        ) : null}

      </div>
    </Link>
  );
})}

          </nav>

          <span className="text-gray-400">
            |
          </span>

          {status === "loading" ? (
            <div className="text-gray-500">
              loading
              <Loader />
            </div>
          ) : session?.user ? (
            <div className="group relative">

              {/* PROFILE BUTTON */}

              <button className="flex items-center gap-2">

                {session.user.image ? (
                  <img
                    src={
                      session.user.image?.trim()
                        ? session.user.image
                        : "/assets/popeye.jpg"
                    }
                    alt="profile"
                    className="h-7 w-7 rounded-full border border-gray-300 object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-sm uppercase">

                    {session.user.name?.[0]}

                  </div>
                )}

                <span className="max-w-fit truncate text-gray-700">

                  {session.user.name}

                </span>

              </button>

              {/* DROPDOWN */}

              <div
                className="
                  invisible absolute right-0 top-10 z-50
                  w-44 border border-gray-300 bg-white
                  opacity-0
                  group-hover:visible
                  group-hover:opacity-100
                  group-focus-within:visible
                  group-focus-within:opacity-100
                "
              >

                <div className="flex flex-col text-sm">

<Link
  href="/post"
  className="border-b border-gray-200 px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
>
  <CirclePlus size={16} />
  <span>add listing</span>
</Link>

                  <Link
                    href="/projects/my"
                    className="border-b border-gray-200 px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FolderGit size={16} />
<span>my projects</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="border-b border-gray-200 px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User size={16} />
<span>profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="border-b border-gray-200 px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings size={16} />
<span>settings</span>
                  </Link>

                  <button
                    onClick={async () => {
                      setAuthLoading(true);

                      showToast("logging out...");
                      await signOut();
                    }}
                    className="px-4 py-3 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >

                    {authLoading ? (
                      <>
                        logging out
                        <Loader />
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
  <LogOut size={16} />
  <span>logout</span>
</div>
                    )}

                  </button>

                </div>

              </div>

            </div>
          ) : (
            <button
              onClick={() => {

                setAuthLoading(true);

                showToast(
                  "connecting to google..."
                );

                signIn("google", {
                  callbackUrl:
                    "/profile/onboarding",
                });

              }}
            >
              {authLoading ? (
                <>
                  connecting
                  <Loader />
                </>
              ) : (
                <div className="flex items-center gap-2">
  <LogIn size={16} />
  <span>login</span>
</div>
              )}
            </button>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >

          <span
            className={`h-0.5 w-5 bg-black transition-transform ${
              mobileOpen
                ? "translate-y-2 rotate-45"
                : ""
            }`}
          />

          <span
            className={`h-0.5 w-5 bg-black ${
              mobileOpen
                ? "opacity-0"
                : ""
            }`}
          />

          <span
            className={`h-0.5 w-5 bg-black transition-transform ${
              mobileOpen
                ? "-translate-y-2 -rotate-45"
                : ""
            }`}
          />

        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="border-t border-gray-300 bg-white md:hidden">

          <div className="flex flex-col px-4 py-3 text-sm">

{links.map((link) => {
  const Icon = link.icon;

  return (
    <Link
      key={link.href}
      href={link.href}
      className="py-3"
      onClick={() =>
        setMobileOpen(false)
      }
    >
      <div className="flex items-center gap-3">

        <Icon size={18} />

        <span>{link.label}</span>

        {link.count ? (
          <span className="text-gray-500">
            ({link.count})
          </span>
        ) : null}

      </div>
    </Link>
  );
})}

            <div className="my-2 border-t border-gray-300" />

            {session?.user ? (
              <>
                <div className="border-b border-gray-200 py-3">

                  <div className="flex items-center gap-3">

                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt="profile"
                        className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xs uppercase">
                        {session.user.name?.[0]}
                      </div>
                    )}

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium">
                        {session.user.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {session.user.email}
                      </p>

                    </div>

                  </div>

                </div>

                <Link
                  href="/post"
                  className="py-3 flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
  <CirclePlus size={16} />
  <span>add listing</span>
                </Link>

                <Link
                  href="/projects/my"
                  className="py-3 flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <FolderGit size={16} />
<span>my projects</span>
                </Link>

                <Link
                  href="/profile"
                  className="py-3 flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={16} />
<span>profile</span>
                </Link>

                <Link
                  href="/settings"
                  className="py-3 flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Settings size={16} />
<span>settings</span>
                </Link>

                <button
                  onClick={async () => {
                    setAuthLoading(true);

                    showToast("logging out...");
                    await signOut();
                  }}
                  className="py-3 text-left text-red-600 flex items-center gap-2"
                >
                  {authLoading ? (
                    <>
                      logging out
                      <Loader />
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
  <LogOut size={16} />
  <span>logout</span>
</div>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={async () => {
                  setAuthLoading(true);

                  showToast(
                    "redirecting to google login..."
                  );

                  await signIn("google", {
                    callbackUrl: "/profile/onboarding",
                  });
                }}
                className="py-3 text-left"
              >

                {authLoading ? (
                  <>
                    connecting
                    <Loader />
                  </>
                ) : (
                  <div className="flex items-center gap-2">
  <LogIn size={16} />
  <span>login</span>
</div>
                )}

              </button>
            )}

          </div>

        </div>
      )}

    </header>
  );
}