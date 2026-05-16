import Link from "next/link";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    await getServerSession(authOptions);

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

  const params = await searchParams;

  const receiverId = params.user;

  const projectId = params.project;

  // ALL CONVERSATIONS
  const conversations =
    await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUser.id,
          },
          {
            receiverId: currentUser.id,
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

  // UNIQUE USERS
  const uniqueUsers = Array.from(
    new Map(
      conversations.map((msg) => {
        const otherUser =
          msg.senderId === currentUser.id
            ? msg.receiver
            : msg.sender;

        return [
          otherUser.id,
          {
            ...otherUser,
            lastMessage: msg.text,
              unread:
                msg.receiverId === currentUser.id &&
                !msg.seen,
          },
        ];
      })
    ).values()
  );

  // CURRENT THREAD
  const messages = receiverId
    ? await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: currentUser.id,
              receiverId,
            },
            {
              senderId: receiverId,
              receiverId: currentUser.id,
            },
          ],
        },

        orderBy: {
          createdAt: "asc",
        },
      })
    : [];

    if (receiverId) {
      await prisma.message.updateMany({
        where: {
          senderId: receiverId,
          receiverId: currentUser.id,
          seen: false,
        },

        data: {
          seen: true,
        },
      });
    }

  // ACTIVE USER
  const activeUser = receiverId
    ? await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
      })
    : null;

  return (
    <main className="mx-auto h-full max-w-6xl px-4 py-6">

      <div className="grid min-h-80vh overflow-hidden border border-gray-300 bg-white md:grid-cols-[280px_1fr]">

        {/* SIDEBAR */}
        <aside className="border-r border-gray-300 bg-white">

          {/* TOP */}
          <div className="border-b border-gray-300 px-4 py-4">

            <h2 className="font-bold">
              inbox
            </h2>

          </div>

          {/* USERS */}
          <div className="flex flex-col">

            {uniqueUsers.length > 0 ? (
              uniqueUsers.map((user) => {
                const active =
                  receiverId === user.id;

                return (
                  <Link
                    key={user.id}
                    href={`/messages?user=${user.id}`}
                    className={`border-b border-gray-200 px-4 py-4 transition hover:bg-gray-50 ${
                      active
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0 flex-1">

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

                        <p className="mt-1 truncate text-xs text-gray-500">

                          {user.lastMessage}

                        </p>

                      </div>

                      {/* TEMP NEW */}
                        {user.unread && !active && (
                          <div className="mt-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                            1
                          </div>
                        )}

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
        <section className="flex max-h-screen flex-col bg-gray-50">

          {/* HEADER */}
          <div className="border-b border-gray-300 bg-white px-5 py-4">

            {activeUser ? (
              <div>

                <h2 className="font-semibold">
                  {activeUser.name}
                </h2>

              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">

                <span>
                  direct conversation
                </span>
                
              </div>

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

          {/* CHAT WINDOW */}
          {receiverId ? (
            <ChatWindow
              currentUserId={currentUser.id}
              receiverId={receiverId}
              initialMessages={messages}
              projectId={projectId}
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