import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import SearchStrip from "./SearchStrip";
import FeedIntro from "./FeedIntro";
import FeedList from "./FeedList";


type Props = {
  query?: string;
  category?: string;
};

export default async function ProjectFeed({
  query, category,
}: Props) {

  // SESSION
  const session =
    await getServerSession(authOptions);

  // PROJECTS
const projects =
  await prisma.project.findMany({

    where:

      query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },

              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },

              {
                category: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }

        : category &&
          category !== "all"

        ? {
            category: {
              contains:
                category
                  .replaceAll("-", " ")
                  .trim(),

              mode: "insensitive",
            },
          }

        : undefined,

          select: {
  id: true,
  slug: true,
  title: true,
  description: true,

  budget: true,
  timeline: true,
  category: true,
  location: true,

  createdAt: true,

  user: {
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      headline: true,
    },
  },

  _count: {
    select: {
      pings: true,
      applications: true,
    },
  },

  ...(session?.user?.id && {
    savedProjects: {
      where: {
        userId: session.user.id,
      },

      select: {
        userId: true,
      },
    },

    applications: {
      where: {
        userId: session.user.id,
      },

      select: {
        userId: true,
      },
    },
  }),
},

    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <section className="w-full border border-gray-200 bg-white rounded-md">

      <FeedIntro />

        <SearchStrip
          query={query}
          category={category}
          basePath="/"
        />

{projects.length > 0 ? (

  <FeedList
    projects={projects}
    sessionUserId={
      session?.user?.id ?? null
    }
    sessionUserEmail={
      session?.user?.email ?? null
    }
  />

) : (

  <div className="p-10 text-center text-sm text-gray-500">

    no listings found

  </div>

)}

    </section>
  );
}