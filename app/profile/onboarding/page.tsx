import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import OnboardingForm from "@/components/profile/OnboardingForm";

export default async function OnboardingPage() {

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
    });

  if (!user) {
    redirect("/");
  }

  // ALREADY ONBOARDED

  if (user.headline) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">

      <div className="mb-8">

        <h1 className="text-2xl font-bold">
          enter the waters
        </h1>

        <p className="mt-2 text-sm text-gray-500 leading-6">

          build your public identity before
          exploring projects, talent and
          opportunities across switchwaters.

        </p>

      </div>

      <OnboardingForm
        user={{
          name:
            user.name ||
            session.user.name ||
            "",

          email:
            user.email || "",

          image:
            user.image || "",

          username:
            user.username || "",
        }}
      />

    </main>
  );
}