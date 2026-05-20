"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useToast } from "@/components/providers/ToastProvider";

type Props = {
  user: {
    name: string | null;
    username: string | null;
    headline: string | null;
    bio: string | null;
    location: string | null;
    status: string | null;
    hourlyRate: string | null;
    experience: number | null;
    skills: string[];
    languages: string[];
  };

  defaultName: string;

  updateProfile: (
    formData: FormData
  ) => Promise<void>;
};

const animals = [
  "whale",
  "otter",
  "croc",
  "shark",
  "ray",
  "eel",
  "frog",
  "heron",
  "crab",
  "orca",
  "gator",
  "stingray",
  "seal",
  "squid",
  "piranha",
];

const prefixes = [
  "blue",
  "tidal",
  "swamp",
  "murky",
  "deep",
  "wild",
  "rapid",
  "delta",
  "mist",
  "salt",
  "fresh",
  "storm",
];

export default function EditProfileForm({
  user,
  defaultName,
  updateProfile,
}: Props) {

  const { showToast } =
    useToast();

  const [displayName, setDisplayName] =
    useState(user.name || "");

  const [username, setUsername] =
    useState(user.username || "");

    const [usernameTouched, setUsernameTouched] =
  useState(false);

  const [checking, setChecking] =
    useState(false);

  const [available, setAvailable] =
    useState<boolean | null>(null);

  const [error, setError] =
    useState("");

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const suggestions =
    useMemo(() => {

      return Array.from({ length: 8 }).map(() => {

        const prefix =
          prefixes[
            Math.floor(
              Math.random() *
              prefixes.length
            )
          ];

        const animal =
          animals[
            Math.floor(
              Math.random() *
              animals.length
            )
          ];

        const number =
          Math.floor(
            10 + Math.random() * 89
          );

        return `${prefix}${animal}${number}`;
      });

    }, [showSuggestions]);


useEffect(() => {


  if (!usernameTouched) {

    setAvailable(null);

    setError("");

    return;
  }

  if (!username) {

    setAvailable(null);

    setError("");

    return;
  }

  const clean =
    username
      .trim()
      .toLowerCase();

  const original =
    user.username
      ?.trim()
      .toLowerCase();

  // SAME AS CURRENT USERNAME
  if (clean === original) {

    setAvailable(true);

    setError("");

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

  if (clean.length < 4) {

    setAvailable(null);

    setError(
      "minimum 4 characters"
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

}, [username, user.username]);

  return (
    <form
      action={async (formData) => {

        if (
          username &&
          available === false
        ) {

          showToast(
            "choose another username"
          );

          return;
        }

        formData.set(
          "name",
          displayName
        );

        formData.set(
          "username",
          username
            .trim()
            .toLowerCase()
        );

        await updateProfile(
          formData
        );

        showToast(
          "profile updated"
        );
      }}
      className="flex flex-col gap-5 border border-gray-300 bg-white p-6"
    >

      {/* DISPLAY NAME */}

      <div>

        <div className="mb-2 flex items-center justify-between">

          <label className="block text-sm font-bold">
            display name
          </label>

          <button
            type="button"
            onClick={() => {
              setDisplayName(
                defaultName || ""
              );

              showToast(
                "default name restored"
              );
            }}
            className="text-xs text-gray-500 hover:underline"
          >
            set to default
          </button>

        </div>

        <input
          type="text"
          name="name"
          value={displayName}
          onChange={(e) =>
            setDisplayName(
              e.target.value
            )
          }
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
    setShowSuggestions(true)
  }
  onChange={(e) => {

    setUsernameTouched(true);

    setUsername(
      e.target.value
        .replace(/\s/g, "")
        .toLowerCase()
    );
  }}
  placeholder="bluewhale42"
  className="w-full border border-gray-300 px-3 py-2 lowercase outline-none"
/>

        <p className="mt-2 text-xs text-gray-500">

          your public switchwaters identity

        </p>

        {showSuggestions && (

          <div className="mt-3 flex flex-wrap gap-2">

            {suggestions.map(
              (suggestion) => (

                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setUsername(
                      suggestion
                    );
                  }}
                  className="border border-gray-300 bg-gray-50 px-2 py-1 text-[11px] text-gray-600 hover:bg-amber-50"
                >
                  {suggestion}
                </button>

              )
            )}

          </div>

        )}

        <div className="mt-3 text-xs">

          {username.length > 0 &&
            username.length < 4 && (
              <span className="text-gray-500">
                minimum 4 characters
              </span>
            )}

          {usernameTouched && checking && (
            <span className="text-gray-500">
              checking availability...
            </span>
          )}

          {usernameTouched && !checking && available && (
              <span className="text-green-700">
                username available
              </span>
            )}

          {usernameTouched && !checking && error && username.length >= 4 && (
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
          defaultValue={
            user.headline || ""
          }
          placeholder="media buyer · growth · adops"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* STATUS */}

      <div>

        <label className="mb-2 block text-sm font-bold">
          status
        </label>

        <select
          name="status"
          defaultValue={
            user.status || ""
          }
          className="w-full border border-gray-300 bg-white px-3 py-2 outline-none"
        >

          <option value="">
            select status
          </option>

          <option value="open to work">
            open to work
          </option>

          <option value="hiring">
            hiring
          </option>

          <option value="just networking">
            networking
          </option>

          <option value="exploring opportunities">
            exploring opportunities
          </option>

        </select>

      </div>

      {/* LOCATION */}

      <div>

        <label className="mb-2 block text-sm font-bold">
          location
        </label>

        <input
          type="text"
          name="location"
          defaultValue={
            user.location || ""
          }
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* RATE + EXPERIENCE */}

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-bold">
            hourly rate
          </label>

          <input
            type="text"
            name="hourlyRate"
            defaultValue={
              user.hourlyRate || ""
            }
            placeholder="$25/hr"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-bold">
            experience
          </label>

          <input
            type="number"
            name="experience"
            defaultValue={
              user.experience || ""
            }
            placeholder="5"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />

        </div>

      </div>

      {/* LANGUAGES */}

      <div>

        <label className="mb-2 block text-sm font-bold">
          languages
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {[
            "english",
            "hindi",
            "bengali",
            "tamil",
            "telugu",
            "marathi",
            "punjabi",
            "gujarati",
            "malayalam",
            "kannada",
            "spanish",
            "french",
            "german",
            "arabic",
            "mandarin",
          ].map((language) => (
            <label
              key={language}
              className="flex items-center gap-2"
            >

              <input
                type="checkbox"
                name="languages"
                value={language}
                defaultChecked={user.languages.includes(
                  language
                )}
              />

              {language}

            </label>
          ))}

        </div>

      </div>

      {/* SKILLS */}

      <div>

        <label className="mb-2 block text-sm font-bold">
          skills
        </label>

        <input
          type="text"
          name="skills"
          defaultValue={
            user.skills.join(", ")
          }
          placeholder="meta ads, analytics, seo"
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      {/* BIO */}

      <div>

        <label className="mb-2 block text-sm font-bold">
          bio
        </label>

        <textarea
          rows={6}
          name="bio"
          defaultValue={
            user.bio || ""
          }
          className="w-full border border-gray-300 px-3 py-2 outline-none"
        />

      </div>

      <button
        type="submit"
        disabled={
          !!username &&
          available === false
        }
        className="text-left text-sm hover:underline disabled:opacity-40"
      >
        save profile
      </button>

    </form>
  );
}