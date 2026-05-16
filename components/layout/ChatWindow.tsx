"use client";

import { useState } from "react";

import { sendMessage } from "@/actions/messageActions";

type Message = {
  id: string;
  text: string;
  senderId: string;
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

//   // polling
// useEffect(() => {
//   let mounted = true;

//   const interval = setInterval(async () => {
//     try {
//       const res = await fetch(
//         `/api/messages?receiverId=${receiverId}`,
//         {
//           cache: "no-store",
//         }
//       );

//       const data = await res.json();

//       if (!mounted) return;

//       setMessages((prev) => {
//         const prevLast =
//           prev[prev.length - 1]?.id;

//         const nextLast =
//           data[data.length - 1]?.id;

//         // only rerender if changed
//         if (prevLast === nextLast) {
//           return prev;
//         }

//         return data;
//       });
//     } catch {}
//   }, 5000);

//   return () => {
//     mounted = false;
//     clearInterval(interval);
//   };
// }, [receiverId]);

  async function handleSend() {
    if (!text.trim()) return;

    const optimistic = {
      id: Date.now().toString(),
      text,
      senderId: currentUserId,
    };

    setMessages((prev) => [
      ...prev,
      optimistic,
    ]);

    const messageText = text;

    setText("");

    setSending(true);

    try {
      await sendMessage(
        receiverId,
        messageText,
        projectId
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* MESSAGES */}
      <div className="flex-1 h-screen overflow-y-scroll p-4 my-4">
      <div className="flex flex-col h-50 gap-3">

        {messages.map((message) => {
          const mine =
            message.senderId ===
            currentUserId;

          return (
            <div
              key={message.id}
              className={`max-w-sm border border-gray-300 p-3 text-sm ${
                mine
                  ? "ml-auto bg-white"
                  : "bg-gray-100"
              }`}
            >
              {message.text}
            </div>
          );
        })}

        </div>

      </div>

      {/* INPUT */}
      <div className="border-t border-gray-300 p-4">

        <div className="flex gap-2">

          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="type message..."
            className="flex-1 border border-gray-300 px-3 py-2 text-sm"
          />

          <button
            onClick={handleSend}
            disabled={sending}
            className="border border-gray-900 px-4 py-2 text-sm hover:bg-black hover:text-white"
          >
            send
          </button>

        </div>

      </div>
    </>
  );
}