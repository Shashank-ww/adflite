import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 md:block">

      <div className="border border-gray-300 bg-white p-4 text-sm">

        {/* BROWSE */}

        <div className="mb-5">

          <p className="mb-2 font-bold">
            browse
          </p>

          <div className="flex flex-col gap-2">

            <Link
              href="/"
              className="hover:underline"
            >
              all listings
            </Link>

            <Link
              href="/?category=media-buying"
              className="hover:underline"
            >
              media buying
            </Link>

            <Link
              href="/?category=editing"
              className="hover:underline"
            >
              editing
            </Link>

            <Link
              href="/?category=ugc-creators"
              className="hover:underline"
            >
              ugc creators
            </Link>

            <Link
              href="/?category=analytics"
              className="hover:underline"
            >
              analytics
            </Link>

            <Link
              href="/?category=copywriting"
              className="hover:underline"
            >
              copywriting
            </Link>

            <Link
              href="/?category=design"
              className="hover:underline"
            >
              design
            </Link>

          </div>

        </div>

        {/* ACCOUNT */}

        <div className="mb-5">

          <p className="mb-2 font-bold">
            account
          </p>

          <div className="flex flex-col gap-2">

            <Link
              href="/projects"
              className="hover:underline"
            >
              my projects
            </Link>

            <Link
              href="/applications"
              className="hover:underline"
            >
              applications
            </Link>

            <Link
              href="/saved"
              className="hover:underline"
            >
              saved listings
            </Link>

            <Link
              href="/messages"
              className="hover:underline"
            >
              messages
            </Link>

            <Link
              href="/pings"
              className="hover:underline"
            >
              pings
            </Link>

          </div>

        </div>

        {/* REMOTE */}

        <div>

          <p className="mb-2 font-bold">
            remote
          </p>

          <div className="flex flex-col gap-2">

            <Link
              href="/?location=india"
              className="hover:underline"
            >
              india
            </Link>

            <Link
              href="/?location=global"
              className="hover:underline"
            >
              global
            </Link>

            <Link
              href="/?timeline=part-time"
              className="hover:underline"
            >
              part-time
            </Link>

            <Link
              href="/?timeline=contract"
              className="hover:underline"
            >
              contract
            </Link>

          </div>

        </div>

      </div>

    </aside>
  );
}