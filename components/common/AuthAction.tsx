"use client";

import { signIn, useSession } from "next-auth/react";

export default function AuthAction({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } =
    useSession();

  function handleClick() {
    if (!session) {
      signIn("google");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:underline"
    >
      {session
        ? children
        : `login to ${children}`}
    </button>
  );
}