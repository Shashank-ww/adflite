import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

import { updateProfile } from "@/actions/profileActions";

import EditProfileForm from "@/components/profile/EditProfileForm";

export default async function EditProfilePage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

const user =
  await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },

    select: {
      name: true,
      username: true,

      headline: true,
      bio: true,
      location: true,

      status: true,

      hourlyRate: true,
      experience: true,

      skills: true,
      languages: true,

      resumeUrl: true,
      resumeUpdatedAt: true,
      resumeFileName: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">

      <div className="mb-4">

        <Link
          href="/profile"
          className="text-sm hover:underline"
        >
          ← back to profile
        </Link>

      </div>

      <h1 className="mb-6 text-xl font-bold">
        edit profile
      </h1>

      <EditProfileForm
        user={user}
        defaultName={session.user.name|| ""}
        updateProfile={updateProfile}
      />

    </main>
  );
}