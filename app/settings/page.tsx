export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      
      <div className="border border-gray-300 bg-white p-6">
        
        <h1 className="text-xl font-bold">
          settings
        </h1>

        <div className="mt-6 flex flex-col gap-5">
          
          <div>
            <label className="mb-2 block font-bold">
              display name
            </label>

            <input
              className="w-full border border-gray-300 px-3 py-2"
              defaultValue="anonymous"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">
              headline
            </label>

            <input
              className="w-full border border-gray-300 px-3 py-2"
              defaultValue="internet marketer"
            />
          </div>

        </div>
      </div>
    </main>
  );
}