import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-300 bg-white">

      <div
        className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">

        <div className="flex flex-wrap gap-4">

          <Link
            href="/about"
            className="hover:text-black"
          >
            about
          </Link>

          <Link
            href="/guidelines"
            className="hover:text-black"
          >
            guidelines
          </Link>

          <Link
            href="/privacy"
            className="hover:text-black"
          >
            privacy
          </Link>

          <Link
            href="/terms"
            className="hover:text-black"
          >
            terms
          </Link>

          <Link
            href="/contact"
            className="hover:text-black"
          >
            contact
          </Link>

        </div>

        <p className="leading-6">

          © 2026 adflite - an internet classified
          for marketers, media buyers, ad-ops
          specialists, and creative operators.

        </p>

      </div>

    </footer>
  );
}