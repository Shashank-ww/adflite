import Link from "next/link";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import ChatWindow from "@/components/layout/ChatWindow";

type Props = {
  searchParams: Promise<{
    user?: string;
    project?: string;
  }>;
};

export default async function MessagesPage({
  searchParams,
}: Props) {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.email) {
    redirect("/");
  }

  const currentUser =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!currentUser) {
    redirect("/");
  }

  const params =
    await searchParams;

  const receiverId =
    params.user;

  const projectId =
    params.project;

  /* MARK ACTIVE CHAT READ */

  if (receiverId) {

    await prisma.message.updateMany({
      where: {
        senderId: receiverId,

        receiverId:
          currentUser.id,

        seen: false,
      },

      data: {
        seen: true,
      },
    });

  }

  /* ALL CONVERSATIONS */

  const conversations =
    await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId:
              currentUser.id,
          },
          {
            receiverId:
              currentUser.id,
          },
        ],
      },

      include: {
        sender: true,
        receiver: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  /* UNIQUE CONVERSATIONS */

const conversationMap =
  new Map();

for (const msg of conversations) {

  const otherUser =
    msg.senderId === currentUser.id
      ? msg.receiver
      : msg.sender;

  if (
    !conversationMap.has(
      otherUser.id
    )
  ) {
    conversationMap.set(
      otherUser.id,
      {
        ...otherUser,

        lastMessage:
          msg.senderId ===
          currentUser.id
            ? `You: ${msg.text}`
            : msg.text,

        lastMessageAt:
          msg.createdAt,

        unread:
          msg.receiverId ===
            currentUser.id &&
          !msg.seen,
      }
    );
  }
}

const uniqueUsers =
  Array.from(
    conversationMap.values()
  );

  /* CURRENT THREAD */

  const messages =
    receiverId
      ? await prisma.message.findMany({
          where: {
            OR: [
              {
                senderId:
                  currentUser.id,

                receiverId,
              },
              {
                senderId:
                  receiverId,

                receiverId:
                  currentUser.id,
              },
            ],
          },

          orderBy: {
            createdAt: "asc",
          },
        })
      : [];

  /* ACTIVE USER */

  const activeUser =
    receiverId
      ? await prisma.user.findUnique({
          where: {
            id: receiverId,
          },
        })
      : null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">

      <div className="grid h-[calc(100vh-120px)] min-h-0 overflow-hidden border border-gray-300 bg-white md:grid-cols-[280px_1fr]">

        {/* SIDEBAR */}

        <aside
            className={`border-r border-gray-300 bg-white ${
              receiverId
                ? "hidden md:block"
                : "block"
            }`}
          >

          <div className="border-b border-gray-300 px-4 py-4">

            <h2 className="font-bold">
              inbox
            </h2>

          </div>

          <div className="flex flex-col">

            {uniqueUsers.length > 0 ? (

              uniqueUsers.map((user) => {

                const active =
                  receiverId ===
                  user.id;

                return (
                  <Link
                    key={user.id}
                    href={`/messages?user=${user.id}`}
                    className={`border-b border-gray-200 px-4 py-4 hover:bg-gray-50 ${
                      active
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-2">

                          <div className="flex-1">

                            <p
                              className={`truncate text-sm ${
                                active
                                  ? "font-bold"
                                  : "font-medium"
                              }`}
                            >
                            {user.name ||
                              "anonymous"}

                            </p>
                          </div>

                          <span className="text-[11px] text-gray-400">
                            {new Date(
                              user.lastMessageAt
                            ).toLocaleDateString()}
                          </span>

                        </div>

                        <p className="mt-1 truncate text-xs text-gray-500">

                          {
                            user.lastMessage
                          }

                        </p>

                      </div>

                    </div>

                  </Link>
                );
              })

            ) : (

              <div className="p-4 text-sm text-gray-500">

                no conversations yet

              </div>

            )}

          </div>

        </aside>

        {/* CHAT */}

        <section
          className={`flex min-h-0 h-full flex-col bg-gray-50${
            !receiverId
              ? "hidden md:flex"
              : "flex"
          }`}
        >

          <div className="border-b border-gray-300 bg-white px-5 py-4">

            {activeUser ? (

              <div>
                <Link
                  href="/messages"
                  className="mb-2 block text-sm text-gray-500 md:hidden"
                >
                  ← Back to inbox
                </Link>

                <h2 className="font-semibold">

                  {activeUser.name}

                </h2>

                <p className="mt-1 text-xs text-gray-500">

                  active conversation

                </p>

              </div>

            ) : (

              <div>

                <h2 className="font-semibold">
                  messages
                </h2>

                <p className="mt-1 text-xs text-gray-500">

                  select a conversation

                </p>

              </div>

            )}

          </div>

          {receiverId ? (

            <ChatWindow
              currentUserId={
                currentUser.id
              }
              receiverId={
                receiverId
              }
              initialMessages={
                messages
              }
              projectSlug={projectId}
            />

          ) : (

            <div className="flex flex-1 items-center justify-center">

              <div className="text-center">

                <h3 className="text-lg font-semibold text-gray-700">

                  select a conversation

                </h3>

                <p className="mt-2 text-sm text-gray-500">

                  messages will appear here

                </p>

              </div>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}