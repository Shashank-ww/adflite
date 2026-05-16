import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            about
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            why this platform exists
          </p>

        </div>

        <Link
          href="/projects"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          browse listings
        </Link>

      </div>

      <div className="border border-gray-300 bg-white">

        <div className="space-y-6 p-6 text-sm leading-7 text-gray-800">

          <p>
            adflite is a focused hiring board built for
            marketers, media buyers, ad-ops specialists,
            editors, designers, strategists, and creative
            operators.
          </p>

          <p>
            most advertising and creative hiring still happens
            through referrals, group chats, twitter threads,
            shared spreadsheets, or rushed introductions.
            traditional job platforms often feel too broad,
            slow, and disconnected from how modern internet
            teams actually work.
          </p>

          <p>
            this platform is intentionally simple.
          </p>

          <p>
            no recruiter layers. no complicated workflows.
            no endless hiring funnels.
          </p>

          <p>
            just direct listings, fast discovery, and people
            who understand campaigns, creative production,
            reporting, launches, retention, scaling, and
            performance marketing.
          </p>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              who this is for
            </h2>

            <ul className="space-y-2 list-disc ml-4">

              <li>brands hiring lean teams</li>

              <li>agencies looking for specialists</li>

              <li>freelancers seeking direct work</li>

              <li>operators tired of generic job boards</li>

              <li>creative and growth teams moving fast</li>

            </ul>

          </div>

        </div>

      </div>

    </main>
  );
}