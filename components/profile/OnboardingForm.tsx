"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/components/providers/ToastProvider";

import { updateProfile } from "@/actions/profileActions";
import { generateUsernameSuggestions } from "@/lib/data/usernameSuggestions";

type Props = {
  user: {
    name: string;
    email: string;
    image: string;
    username: string | null;
  };
};

const usernameSuggestions =
  generateUsernameSuggestions(8);

export default function OnboardingForm({
  user,
}: Props) {

  const { showToast } = useToast();

  const [username, setUsername] =
    useState(user.username || "");

  const [touched, setTouched] =
    useState(false);

  const [checking, setChecking] =
    useState(false);

  const [available, setAvailable] =
    useState<boolean | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {

    if (!touched) {
      return;
    }

    const clean =
      username
        .trim()
        .toLowerCase();

    if (!clean) {
      setAvailable(null);
      setError("");
      return;
    }

    if (clean.length < 3) {
      setAvailable(false);

      setError(
        "minimum 3 characters"
      );

      return;
    }

    const valid =
      /^[a-z0-9]+$/.test(clean);

    if (!valid) {

      setAvailable(false);

      setError(
        "only lowercase letters and numbers"
      );

      return;
    }

    const timeout =
      setTimeout(async () => {

        try {

          setChecking(true);

          const res =
            await fetch(
              `/api/check-username?username=${clean}`
            );

          const data =
            await res.json();

          if (data.available) {

            setAvailable(true);

            setError("");

          } else {

            setAvailable(false);

            setError(
              "username already taken"
            );
          }

        } catch {

          setAvailable(false);

          setError(
            "unable to validate username"
          );

        } finally {

          setChecking(false);

        }

      }, 500);

    return () =>
      clearTimeout(timeout);

  }, [username, touched]);

  return (
    <form
      action={async (formData) => {

        if (!available) {

          showToast(
            "choose a valid username"
          );

          return;
        }

        formData.set(
          "username",
          username
            .trim()
            .toLowerCase()
        );

        await updateProfile(
          formData
        );
      }}
      className="flex flex-col gap-5 border border-gray-300 bg-white p-6"
    >

      {/* USER */}

      <div className="flex items-center gap-4">

        <img
          src={
            user.image?.trim()
              ? user.image
              : "/avatars/avatar2.jpg"
          }
          alt="profile"
          className="h-16 w-16 rounded-full border border-gray-300 object-cover"
        />

        <div>

          <p className="font-semibold">
            {user.name}
          </p>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

        </div>

      </div>

      {/* DISPLAY NAME */}

      <div>

        <label className="mb-2 block text-sm font-bold">

          display name

        </label>

        <input
          type="text"
          name="name"
          defaultValue={user.name}
          placeholder="your name"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* USERNAME */}

      <div>

        <label className="mb-2 block text-sm font-bold">

          username

        </label>

        <input
          type="text"
          value={username}
          onFocus={() =>
            setTouched(true)
          }
          onChange={(e) => {

            setTouched(true);

            setUsername(
              e.target.value
                .replace(/\s/g, "")
                .toLowerCase()
            );
          }}
          placeholder="youruserid"
          className="w-full border border-gray-300 px-3 py-2 lowercase outline-none"
        />

        <p className="mt-2 text-xs text-gray-500">

          this becomes your public switchwaters identity

        </p>

        <div className="mt-3 flex flex-wrap gap-2">

          {usernameSuggestions.map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setTouched(true);
                  setUsername(item);
                  showToast(
                    `trying ${item}`
                  );
                }}
                className="border border-gray-300 bg-gray-100 px-2 py-1 text-[11px] hover:bg-gray-200"
              >
                {item}
              </button>
            )
          )}

        </div>

        <div className="mt-3 text-xs">

          {checking && (
            <span className="text-gray-500">
              checking username...
            </span>
          )}

          {!checking &&
            available && (
              <span className="text-green-700">
                username available
              </span>
            )}

          {!checking &&
            error && (
              <span className="text-red-600">
                {error}
              </span>
            )}

        </div>

      </div>

      {/* HEADLINE */}

      <div>

        <label className="mb-2 block text-sm font-bold">

          headline

        </label>

        <input
          type="text"
          name="headline"
          required
          placeholder="media buyer · growth marketer"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* LOCATION */}

      <div>

        <label className="mb-2 block text-sm font-bold">

          location

        </label>

        <input
          type="text"
          name="location"
          placeholder="gurgaon"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* SKILLS */}

      <div>

        <label className="mb-2 block text-sm font-bold">

          skills

        </label>

        <input
          type="text"
          name="skills"
          placeholder="meta ads, seo, analytics"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* BIO */}

      <div>

        <label className="mb-2 block text-sm font-bold">

          bio

        </label>

        <textarea
          rows={5}
          name="bio"
          placeholder="tell people about yourself"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      <button
        type="submit"
        disabled={!available}
        className="border border-black bg-black px-4 py-2 text-sm text-white disabled:opacity-40"
      >
        continue
      </button>

    </form>
  );
}