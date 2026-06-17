import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import PostProjectForm from "@/components/projects/PostProjectForm";

export default async function PostPage() {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← back home
        </Link>

        <Link
          href="/projects"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          cancel post
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold">
          post a listing
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          share exactly what you need help with.
          clear listings get better applications,
          faster responses, and more relevant
          talent applying for the project.
        </p>
      </div>

      <PostProjectForm />
    </main>
  );
}