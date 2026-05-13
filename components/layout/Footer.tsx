export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-300 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
        
        <div className="flex flex-wrap gap-4">
          <a href="#">about</a>
          <a href="#">guidelines</a>
          <a href="#">privacy</a>
          <a href="#">terms</a>
          <a href="#">contact</a>
        </div>

        <p>
          adflite, a classified internet for marketers, adops,
          and creators.
        </p>
      </div>
    </footer>
  );
}