export default function SearchStrip() {
  return (
    <form
      action="/"
      className="border-b border-gray-300 p-3"
    >
      <input
        type="text"
        name="q"
        placeholder="search listings..."

        className="border w-full border-gray-300 px-3 py-2 text-sm outline-none"
      />
    </form>
  );
}