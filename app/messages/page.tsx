export default function MessagesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      
      <div className="grid border border-gray-300 bg-white md:grid-cols-[250px_1fr]">
        
        <aside className="border-r border-gray-300 p-4">
          
          <h2 className="mb-4 font-bold">
            inbox
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            <a href="#">
              northstar media
            </a>

            <a href="#">
              studioframe
            </a>
          </div>
        </aside>

        <section className="p-4">
          
          <h2 className="font-bold">
            northstar media
          </h2>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            
            <div className="max-w-sm border border-gray-300 bg-gray-100 p-3">
              Hey, are you available this week?
            </div>

            <div className="ml-auto max-w-sm border border-gray-300 p-3">
              Yes, available for discussion.
            </div>
          </div>

          <div className="mt-6">
            <input
              placeholder="type message..."
              className="w-full border border-gray-300 px-3 py-2"
            />
          </div>
        </section>
      </div>
    </main>
  );
}