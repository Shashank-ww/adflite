"use client";

import { signIn, useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function AuthAction({
  children,
}: Props) {
  const { data: session } = useSession();

  // USER NOT LOGGED IN
  if (!session) {
    return (
      <button
        type="button"
        onClick={() => signIn("google")}
        className="hover:underline"
      >
        login to {children}
      </button>
    );
  }

  return (
    <button
      type="submit"
      className="hover:underline"
    >
      {children}
    </button>
  );
}