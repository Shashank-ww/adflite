import { OrigamiIcon } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            contact
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            support, partnerships, collaboration, and habitat queries
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
          back to listings
        </Link>

      </div>

      {/* CONTACT */}

      <div className="border border-gray-300 bg-white">

        <div className="space-y-6 p-6 text-sm leading-7 text-gray-800">

          <p>
            for support, listing issues, partnerships,
            collaborations, moderation concerns, takedowns,
            contributor interest, or general platform queries. 
            we are open for all and real humans at work.
            reach out anytime. 
          </p>

          <div className="border border-gray-300 p-4">

            <p className="font-medium">
              shash.mbww@gmail.com
            </p>

          </div>

          <p className="text-gray-600">
            response times may vary depending on habitat activity.
          </p>

        </div>

      </div>

      {/* FOUNDER LETTER */}

            <div className="border mt-8 border-gray-300 bg-white">

<div className="mx-auto flex w-full justify-center px-4 py-10 sm:px-8">

  {/* NOTEBOOK SHEET */}

<div
  className="
    relative
    w-full
    max-w-3xl
    overflow-hidden
    rotate-[-0.4deg]
    border-r border-b border-t border-[#d6d3c7]
    bg-[#f8f6ee]
  "
>

    {/* SPIRAL HOLES */}

    <div className="absolute left-0 top-0 flex h-full w-6 flex-col items-center justify-around border-r border-[#d8d8cf] bg-[#f3f1e8]">

      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="
            h-4 w-4
            rounded-full
            border border-[#d6d6cd]
            bg-white
            -translate-x-2/3
          "
        />
      ))}

    </div>

    {/* PAPER TEXTURE */}

    <div
      className="
        relative
        ml-6
        px-8 py-10
      "
    >

      {/* TOP LABEL */}

      <div className="mb-10 border-b border-dashed border-[#d8d5c7] pb-6">

        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gray-500">
          letter from the founder
        </p>

        <h2 className="text-3xl font-semibold leading-tight text-[#1f1f1b]">
          why switchwaters exists
        </h2>

      </div>

      {/* LETTER */}

      <div className="space-y-4 text-lg leading-8 text-[#2d2d28]">

        <p>
          do you remember the first time being directionless?
        </p>

        <p>
          not because we lacked ambition. not because we weren't trying. simply because we didn't know where we are supposed to go.
          no one really teaches that.
        </p>

        <p>
          not our teachers. not degree. not the people telling you what success is supposed to look like.
        </p>

        <p className="font-bold">
          everyone has advice.
          nobody has directions.
        </p>

        <p>
          years ago, when i dropped out of engineering, it felt like failure.
          i realised the degree was not the destination,
          landing that first internship was not the plan,
        </p>

        <p>
          the “career ladder” was mostly a story repeated so often
          that everyone accepted it as truth.
          i learnt this the hard way.
        </p>

        <p>
          people graduate without direction.
          people switch careers without guidance.
          people spend years in jobs wondering if they're building a life they actually want.
        </p>

        <p>
          and nobody really prepares you for that feeling.
        </p>

        <p>
          schools prepare people to pass.
          corporates prepare people to produce.
          they trust you after a degree is because that proves your stability at one place.
        </p>

        <p>
          but very few people are taught how to navigate uncertainty, find their place, or build a path that is truly their own.
          <span className="font-bold"> that's why Switchwaters exists.</span>
        </p>

        <ul className="ml-4 list-disc space-y-2 text-[#44443d]">

          <li>not as another job board</li>

          <li>not another freelance platform</li>

          <li>not just social networking</li>

          <li>it is made for those moving through uncertainty</li>

        </ul>

        <p>
         as a habitat. where people do what they do best. fend for themselves.
        </p>

        <p>
          a place where opportunities move like currents,
          industries like jungles, 
          where hidden paths matter,
          and people more than their resumes.
        </p>

        <p>
          switchwaters is being built openly,
          honestly, and continuously with the people using it.
        </p>

        <p>
          if you share the same thoughts, you are at the right place!
        </p>

          welcome to the switchwaters habitat.
        {/* SIGN */}

        <div className="pt-10">

          <div className="inline-block border-t border-[#c8c5b7] pt-4">

            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              — Shashank Srivastava
            </p>
            <p className="text-sm text-gray-500 ml-6">founder ceo</p>

            <Link
              href="/"
              className="flex text-base mt-3 font-bold tracking-wide gap-1"
            >
              <OrigamiIcon size={20} />

              <div className="flex items-center">
                <p className="font-thin">switch</p>
                <p className="font-bold">waters</p>
                <span className="text-neutral-400">.com</span>
              </div>
            </Link>

          </div>

        </div>

      </div>

    </div>

  </div>
</div>
</div>

      {/* OPEN HABITAT */}

      <div className="mt-8 border border-gray-300 bg-[#eef2e8]">

        <div className="space-y-6 p-6">

          <div>

            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              open habitat
            </p>

            <h2 className="text-2xl font-semibold">
              help shape switchwaters.com
            </h2>

          </div>

          <p className="text-sm leading-7 max-w-prose text-gray-800">
            switchwaters is being built in the open.
            developers, designers, writers, operators,
            researchers, moderators, and curious minds
            are welcome to contribute ideas, improvements,
            experiments, systems, and feedback.
          </p>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="border border-gray-300 bg-white p-4">

              <h3 className="font-medium">
                contribute
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                suggest features, fixes, ux improvements,
                workflows, or ecosystem ideas.
              </p>

            </div>

            <div className="border border-gray-300 bg-white p-4">

              <h3 className="font-medium">
                collaborate
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                meaningful contributors may evolve into
                long-term collaborators or habitat builders.
              </p>

            </div>

            <div className="border border-gray-300 bg-white p-4">

              <h3 className="font-medium">
                get featured
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                early contributors may be credited publicly
                as part of the habitat archive.
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-4 pt-2">

            <a
              href="https://github.com/Shashank-ww/adflite.git"
              target="_blank"
              rel="noreferrer"
              className="
                border border-gray-300
                bg-neutral-100
                px-4 py-2
                text-sm
                text-white
                transition
                hover:opacity-90
              "
            >
              explore git
            </a>

            <a
              href="mailto:shash.mbww@gmail.com"
              className="
                border border-gray-300
                px-4 py-2
                text-sm
                transition
                hover:bg-white
              "
            >
              send debug
            </a>

          </div>

        </div>

      </div>

    </main>
  );
}