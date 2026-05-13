export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      
      <div className="border border-gray-300 bg-white p-6">
        
        <h1 className="text-xl font-bold">
          anonymous internet marketer
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          gurgaon · remote
        </p>

        <div className="mt-6">
          <h2 className="font-bold">
            about
          </h2>

          <p className="mt-2 leading-7 text-sm">
            Performance marketer focused on
            paid media, creative testing and
            internet growth workflows.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="font-bold">
            skillsets
          </h2>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="border border-gray-300 bg-gray-100 px-2 py-1">
              meta ads
            </span>

            <span className="border border-gray-300 bg-gray-100 px-2 py-1">
              google ads
            </span>

            <span className="border border-gray-300 bg-gray-100 px-2 py-1">
              analytics
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}