import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            privacy
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            what we collect and why
          </p>

        </div>

        <Link
          href="/projects"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          explore listings
        </Link>

      </div>

      <div className="border border-gray-300 bg-white">

        <div className="space-y-6 p-6 text-sm leading-7 text-gray-800">

          <p>
            we collect basic account and listing information
            required to operate the platform.
          </p>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              this may include
            </h2>

            <ul className="space-y-2 list-disc ml-5">

              <li>name and email address</li>

              <li>public profile information</li>

              <li>job listings and submissions</li>

              <li>platform activity related to moderation or support</li>

            </ul>

          </div>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              our approach
            </h2>

            <p>
              we do not sell personal information. we also do
              not run intrusive ad targeting systems or build
              unnecessary tracking around user activity.
            </p>

          </div>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              your responsibility
            </h2>

            <p>
              anything publicly added to listings or profiles
              may be visible to other users. avoid sharing
              sensitive personal or financial information
              publicly.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}