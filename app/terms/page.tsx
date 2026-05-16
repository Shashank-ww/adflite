import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            terms
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            basic platform responsibilities
          </p>

        </div>

        <Link
          href="/projects"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          browse projects
        </Link>

      </div>

      <div className="border border-gray-300 bg-white">

        <div className="space-y-6 p-6 text-sm leading-7 text-gray-800">

          <p>
            by using adflite, you agree to use the platform
            responsibly and lawfully.
          </p>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              users are responsible for
            </h2>

            <ul className="space-y-2 list-disc ml-5">

              <li>accuracy of listings and profile information</li>

              <li>communication and agreements made off-platform</li>

              <li>verifying clients, candidates, and opportunities</li>

              <li>handling contracts, invoices, and payments independently</li>

            </ul>

          </div>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              platform role
            </h2>

            <p>
              adflite acts only as a discovery and publishing
              platform. we are not involved in employment,
              payments, contracts, or disputes between users.
            </p>

          </div>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              moderation
            </h2>

            <p>
              listings or accounts violating platform guidelines
              may be removed without prior notice.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}