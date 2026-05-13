export default function SearchStrip() {
  return (
    <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <input
          type="text"
          placeholder="search projects..."
          className="w-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none md:max-w-sm"
        />

        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#">all</a>
          <a href="#">media buying</a>
          <a href="#">ugc</a>
          <a href="#">editing</a>
          <a href="#">analytics</a>
          <a href="#">copywriting</a>
        </div>
      </div>
    </div>
  );
}