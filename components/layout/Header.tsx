import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        
        <h1 className="text-base font-bold tracking-wide">
          adflite.com
        </h1>

        <div className="flex items-center gap-4 text-sm">
          <nav className="flex items-center gap-4">
            <a href="#">home</a>
            <a href="#">projects</a>
            <a href="#">messages</a>
            <a href="#">profile</a>
          </nav>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-4">
            <Link href="/post">+ listing</Link>
            <a href="#">login</a>
          </div>
        </div>
      </div>
    </header>
  );
}