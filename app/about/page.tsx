import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            about
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            a habitat for modern work
          </p>

        </div>

        <Link
          href="/projects"
          className="
            border border-gray-300
            px-4 py-2
            text-sm
            transition
            hover:bg-gray-50
          "
        >
          browse listings
        </Link>

      </div>

      {/* MAIN */}

      <div className="border border-gray-300 bg-white">

        <div className="space-y-4 p-6 text-sm leading-7">

          <p>
            switchwaters is not built like a traditional job platform.
          </p>

          <p>
            it is a living habitat for people navigating modern work; 
            across hiring, freelance projects, media, marketing,
            creative operations, strategy, growth, production,
            startups, and internet-first teams.
          </p>

          <p>
            most opportunities today move through fragmented ecosystems like
            referrals, private groups, cold outreach, founder networks,
            twitter threads, hidden communities, rushed hiring,
            or temporary project cycles. that's why companies hire and fire fast.
          </p>

          <p>
            traditional platforms often reduce people into filters,
            keywords, resumes, or application funnels.
          </p>

          <p>
            at switchwaters.com we are approaching this differently.
          </p>

          <p>
            we believe careers are more like ecosystems than ladders. precisely a habitat for one&apos;s growth.
          </p>

          <p>
            opportunities move like currents.
            industries evolve like jungles.
            hidden paths often matter more than visible ones.
          </p>

          <p>
            this platform is designed for <i>movement:</i> that&apos;s why it is intentionally simple. </p> 
          <p> no recruiter layers. no complicated workflows. no endless hiring funnels. </p> 
          <p> just direct listings, fast discovery, and people who understand campaigns, creative production, reporting, launches, retention, scaling, and performance marketing. </p>

          <ul className="ml-4 list-disc space-y-2">

            <li>discover aligned opportunities</li>

            <li>find lean and fast-moving teams</li>

            <li>build direct professional network</li>

            <li>explore freelance and full-time paths</li>

            <li>move smartly across industries</li>

            <li>escape generic hiring systems</li>

          </ul>

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-4 font-medium">
              who this habitat is for
            </h2>

            <ul className="ml-4 list-disc space-y-2">

              <li>operators tired of generic job boards</li>
              <li>media buyers and performance marketers</li>
              <li>creative strategists and designers</li>
              <li>internet-first startup teams</li>
              <li>freelancers seeking direct opportunities</li>
              <li>brands building lean internal teams</li>
              <li>people navigating career transitions</li>

            </ul>

          </div>

          <div className="border-t border-gray-300 pt-6">

            <p className="text-gray-600">
              switchwaters.com is being built openly and is evolving continuously.
            </p>

            <Link
              href="/contact"
              className="
                mt-4 inline-flex
                border border-gray-400
                bg-gray-100
                px-4 py-2
                text-sm
                transition
                hover:opacity-90
              "
            >
              contact
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}