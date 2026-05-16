import Link from "next/link";

export default function GuidelinesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            guidelines
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            keep listings clear and useful
          </p>

        </div>

        <Link
          href="/post"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          + post listing
        </Link>

      </div>

      <div className="border border-gray-300 bg-white">

        <div className="space-y-10 p-6 text-sm leading-7 text-gray-800">

          <section>

            <h2 className="mb-3 font-medium">
              writing better listings
            </h2>

            <p className="mb-4">
              good listings usually attract better and faster
              responses. people should understand the role,
              expectations, and context without needing a long
              back-and-forth.
            </p>

            <ul className="space-y-2 list-disc ml-5">

              <li>mention scope of work clearly</li>

              <li>include timelines or availability</li>

              <li>mention tools or platforms involved</li>

              <li>link portfolios, briefs, or brand sites if relevant</li>

              <li>mention compensation wherever possible</li>

            </ul>

          </section>

          <section className="border-t border-gray-300 pt-8">

            <h2 className="mb-3 font-medium">
              things not allowed
            </h2>

            <ul className="space-y-2 list-disc ml-5">

              <li>fake or misleading listings</li>

              <li>unpaid trial work without disclosure</li>

              <li>spam or mass outreach behaviour</li>

              <li>offensive or discriminatory content</li>

              <li>scraping user information</li>

            </ul>

          </section>

          <section className="border-t border-gray-300 pt-8">

            <h2 className="mb-3 font-medium">
              expectations
            </h2>

            <p>
              adflite is intentionally lightweight. users are
              expected to do their own diligence before hiring,
              collaborating, sharing files, or making payments.
            </p>

          </section>

        </div>

      </div>

    </main>
  );
}