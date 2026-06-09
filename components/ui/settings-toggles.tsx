"use client";

import { useState } from "react";
import { useToast } from "../providers/ToastProvider";

export default function SettingsToggles({
  type,
  enabled,
}: {
  type: "messages" | "pings" | "visibility";
  enabled: boolean;
}) {

  const { showToast } = useToast();

  const [value, setValue] =
    useState(enabled);

  async function handleToggle() {

    const next = !value;

    setValue(next);

    try {

const endpoint =
  type === "messages"
    ? "/api/settings/messages"
    : type === "pings"
    ? "/api/settings/pings"
    : "/api/settings/visibility";

await fetch(endpoint, {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

body: JSON.stringify(
  type === "messages"
    ? {
        allowMessages: next,
      }
    : type === "pings"
    ? {
        allowPings: next,
      }
    : {
        profileVisibility: next
          ? "public"
          : "private",
      }
),
        }
      );

      showToast(
        next
          ? `${type} enabled`
          : `${type} disabled`
      );

    } catch {

      setValue(!next);

      showToast(
        "unable to update setting"
      );

    }

  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`
        border px-2 py-1 text-[11px]
        ${
          value
            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
            : "border-gray-300 bg-gray-100 text-gray-500"
        }
      `}
    >
{type === "visibility"
  ? value
    ? "public"
    : "private"
  : value
  ? "enabled"
  : "disabled"}
    </button>
  );
}