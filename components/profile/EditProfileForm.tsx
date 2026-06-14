"use client";

import {
  useEffect,
  useState,
} from "react";

import { useToast } from "@/components/providers/ToastProvider";
import { deleteProfile, removeResume } from "@/actions/profileActions";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { generateUsernameSuggestions } from "@/lib/data/usernameSuggestions";
import ResumeViewer from "../ui/resume-viewer";

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
    resumeUrl: string | null;
    resumeUpdatedAt: Date | null;
    resumeFileName: string | null;
  };

  defaultName: string;

   updateProfile: (
    formData: FormData
  ) => Promise<void>;
}

export default function EditProfileForm({
  user,
  defaultName,
  updateProfile,
}: Props) {

  const { showToast } = useToast();

const [uploading, setUploading] = useState(false);
const [resumeUrl, setResumeUrl] = useState(user.resumeUrl || null);
const [resumeUpdatedAt, setResumeUpdatedAt] = useState(
  user.resumeUpdatedAt ? new Date(user.resumeUpdatedAt).toString() : null
);
const [resumeFileName, setResumeFileName] =
  useState(
    user.resumeFileName ?? ""
  );

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

const [suggestions, setSuggestions] =
  useState<string[]>([]);

  const [saving, setSaving] =
  useState(false);

useEffect(() => {

  setSuggestions(
    generateUsernameSuggestions()
  );

}, []);


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
    /^[a-z0-9_]+$/.test(clean);
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
}, [username, user.username, usernameTouched]);

const [showDangerZone, setShowDangerZone] =
  useState(false);

  async function uploadResume(
  file: File
) {
  try {

    setUploading(true);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const res =
      await fetch(
        "/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await res.json();

    if (!res.ok) {
      throw new Error(
        data.error
      );
    }

    setResumeUrl(
      data.url
    );

    showToast(
      "resume uploaded"
    );

  } catch {

    showToast(
      "unable to upload resume"
    );

  } finally {

    setUploading(false);

  }
}

async function handleRemoveResume() {
  try {
    const result =
      await removeResume();

    if (result.success) {
      setResumeUrl("");
      setResumeUpdatedAt("");
      setResumeFileName("");

      showToast(
        "resume removed"
      );
    } else {
      showToast(
        "failed to remove resume"
      );
    }
  } catch {
    showToast(
      "failed to remove resume"
    );
  }
}

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
try {

  setSaving(true);

  showToast(
    "saving profile..."
  );

  await updateProfile(
    formData
  );

  showToast(
    "profile updated"
  );

} catch {

  showToast(
    "unable to update profile"
  );

} finally {

  setSaving(false);

}
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

          <div className="mt-3 flex flex-wrap gap-2">

            <button
  type="button"
    onClick={() => {
      setSuggestions(
        generateUsernameSuggestions()
      );
      showToast(
        "new username suggestions crafted for you"
      );
    }}
  className="
    text-xs
    text-neutral-500
    hover:text-black
  "
>
  refresh suggestions
</button>

            {suggestions.map(
              (suggestion) => (

                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setUsernameTouched(true);
                    setUsername(
                      suggestion
                    );
                    showToast(
                      `selected @${suggestion}`
                    );
                  }}
                  className="border border-gray-300 bg-gray-50 px-2 py-1 text-[11px] text-gray-600 hover:bg-amber-50"
                >
                  {suggestion}
                </button>

              )
            )}

          </div>

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

          <option value="networking">
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

      {/* RESUME ACTIONS */}

<div className="border border-gray-300 bg-white p-4">

  <div className="flex items-center justify-between">

    <h3 className="text-sm font-bold">
      Resume
    </h3>

    <span
      className={`
        text-xs
        ${
          resumeUrl
            ? "text-green-600"
            : "text-gray-500"
        }
      `}
    >
      {resumeUrl
        ? "uploaded"
        : "not uploaded"}
    </span>

  </div>

  {resumeUrl ? (

    <div className="mt-3 text-xs text-gray-600">

      <p className="font-medium truncate">
        {resumeFileName || "resume.pdf"}  
      </p>

      {resumeUpdatedAt && (
        <p className="mt-1 text-gray-500">
          Updated{" "}
          {new Date(
            resumeUpdatedAt
          ).toLocaleDateString()}
        </p>
      )}

    </div>

  ) : (

    <p className="mt-3 text-xs text-gray-500">

      Upload a PDF resume to apply
      for projects faster.

    </p>

  )}



<input
  type="file"
  accept="application/pdf"
  id="resumeUpload"
  className="hidden"
  onChange={async (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      file.type !==
      "application/pdf"
    ) {
      showToast(
        "only pdf files allowed"
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      showToast(
        "max 5mb allowed"
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {
      setUploading(true);

      const res =
        await fetch(
          "/api/resume/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error
        );
      }

      setResumeUrl(
        data.url
      );

      setResumeFileName(
        file.name
      );

      setResumeUpdatedAt(
        new Date().toISOString()
      );

      showToast(
        "resume uploaded"
      );
    } catch {
      showToast(
        "upload failed"
      );
    } finally {
      setUploading(false);
    }
  }}
/>

 <div className="mt-4 flex flex-wrap gap-2">

  {resumeUrl && (
    <>
      <ResumeViewer
        url={resumeUrl}
      />

      <a
        href={resumeUrl}
        download
        className="
          border border-gray-300
          px-3 py-2
          text-xs
          hover:bg-gray-50
        "
      >
        Download
      </a>
    </>
  )}

  <label
    htmlFor="resumeUpload"
    className="
      cursor-pointer
      border border-gray-300
      px-3 py-2
      text-xs
      hover:bg-gray-50
    "
  >
    {uploading
      ? "Uploading..."
      : resumeUrl
      ? "Replace"
      : "Upload"}
  </label>

  {resumeUrl && (
    <button
      type="button"
      onClick={handleRemoveResume}
      className="
        border border-red-300
        px-3 py-2
        text-xs
        text-red-600
        hover:bg-red-50
      "
    >
      Remove
    </button>
  )}

</div>

</div>

{/* SUBMIT ACTIONS */}

<div className="flex gap-2">

  <button
    type="submit"
    disabled={
      saving ||
      (!!username &&
        available === false)
    }
    className="
      border border-gray-300
      bg-black
      px-4 py-2
      text-sm
      text-white
      transition
      hover:opacity-90
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
  >
    {saving
      ? "saving..."
      : "save profile"}
  </button>

  <button
    type="button"
    onClick={() => {
      window.location.reload();
    }}
    className="
      border border-gray-300
      bg-white
      px-4 py-2
      text-sm
      text-neutral-700
      transition
      hover:bg-neutral-50
    "
  >
    cancel
  </button>

</div>

{/* ACCOUNT ACTIONS */}

<div className="mt-10 border-t border-neutral-200 pt-6">

  <button
    type="button"
    onClick={() =>
      setShowDangerZone(
        !showDangerZone
      )
    }
    className="
      text-sm
      text-neutral-500
      transition
      hover:text-black
    "
  >
    deactivate profile
  </button>

  {showDangerZone && (

    <div
      className="
        mt-4
        border border-red-200
        bg-red-50
        p-4
      "
    >

      <h2 className="text-sm font-bold text-red-700">
        deactivate profile
      </h2>

      <p
        className="
          mt-2
          text-xs
          leading-5
          text-red-600
        "
      >
        deleting your profile permanently removes your
        account, projects, applications, saved listings,
        messages, and related activity.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">

        <button
          type="button"
          onClick={async () => {

            const confirmed =
              window.confirm(
                "delete your profile permanently? you will not be able to recover data after you click ok!"
              );

            if (!confirmed) return;
            try {
                showToast(
                  "deleting profile..."
                );

              setTimeout(() => {
                (async () => {
                  try {
                    await deleteProfile();
                    await signOut({
                      callbackUrl: "/",
                    });
                  } catch {
                    showToast(
                      `deleted @${
                        user.username || "user"
                      } permanently`
                    );
                  }
                })();
              }, 500);
            } catch {
              showToast(
                "unable to delete profile"
              );
            }
          }}
          className="
            border border-red-300
            bg-white
            px-4 py-2
            text-sm
            text-red-700
            transition
            hover:bg-red-100
          "
        >
          delete my profile permanently
        </button>

        <Link
          href="/contact"
          className="
            border border-neutral-300
            bg-white
            px-4 py-2
            text-sm
            text-neutral-700
            transition
            hover:bg-neutral-50
          "
        >
          reach out to us
        </Link>

      </div>

    </div>

  )}

</div>
    </form>
  );
}