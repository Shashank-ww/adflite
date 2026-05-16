import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            contact
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            support, partnerships, and queries
          </p>

        </div>

        <Link
          href="/projects"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          back to listings
        </Link>

      </div>

      <div className="border border-gray-300 bg-white">

        <div className="space-y-6 p-6 text-sm leading-7 text-gray-800">

          <p>
            for support, listing issues, partnerships,
            takedowns, or general platform queries,
            reach out anytime. we are for real.
          </p>

          <div className="border border-gray-300 p-4">

            <p className="font-medium">
              shash.mbww@gmail.com
            </p>

          </div>

          <p className="text-gray-600">
            response times may vary depending on request volume.
          </p>

        </div>

      </div>

    </main>
  );
}