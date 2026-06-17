"use client";

import { useEffect, useRef, useState } from "react";

import { sendMessage } from "@/actions/messageActions";

type Message = {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  seen: boolean;
  createdAt: string | Date;
};

type Props = {
  currentUserId: string;
  receiverId: string;
  initialMessages: Message[];
  projectId?: string;
};

export default function ChatWindow({
  currentUserId,
  receiverId,
  initialMessages,
  projectId,
}: Props) {

  const [messages, setMessages] =
    useState(initialMessages);

  const [text, setText] =
    useState("");

  const [sending, setSending] =
    useState(false);

    const bottomRef =
  useRef<HTMLDivElement>(null);

  useEffect(() => {

  bottomRef.current
    ?.scrollIntoView({
      behavior: "smooth",
    });

}, [messages]);

  function formatTime(date: string | Date) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

async function handleSend() {
  if (!text.trim() || sending) {
    return;
  }

  const messageText = text.trim();

  setText("");

  setSending(true);

  try {
    const newMessage =
      await sendMessage(
        receiverId,
        messageText,
        projectId
      );

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

  } finally {
    setSending(false);
  }
}

  return (
    <>
      {/* MESSAGES */}

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 overscroll-contain">

        <div className="flex flex-col gap-4">

          {messages.map((message) => {

            const mine =
              message.senderId ===
              currentUserId;

            return (
              <div
                key={message.id}
                className={`flex ${
                  mine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] border px-3 py-2 text-sm sm:max-w-md ${
                    mine
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-100"
                  }`}
                >

                  <p className="whitespace-pre-wrap wrap-break-word leading-6">

                    {message.text}

                  </p>

                  <div
                    className={`mt-2 flex items-center gap-2 text-[11px] text-gray-400 ${
                      mine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <span>
                      {formatTime(
                        message.createdAt
                      )}
                    </span>

                    {mine && (
                      <span>
                        {message.seen
                          ? "read"
                          : "sent"}
                      </span>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      <div ref={bottomRef} />
      </div>

      {/* INPUT */}

      <div className="border-t border-gray-300 bg-white p-4">

        <div className="flex gap-2">

          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                handleSend();
              }
            }}
            placeholder="type message..."
            className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={handleSend}
            disabled={sending}
            className="border border-black bg-black px-4 py-2 text-sm text-white disabled:opacity-40"
          >

            {sending
              ? "sending..."
              : "send"}

          </button>

        </div>

      </div>
    </>
  );
}