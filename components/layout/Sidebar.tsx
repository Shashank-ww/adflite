export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="border border-gray-300 bg-white p-4 text-sm">
        
        <div className="mb-5">
          <p className="mb-2 font-bold">
            browse
          </p>

          <div className="flex flex-col gap-2">
            <a href="#">all listings</a>
            <a href="#">media buying</a>
            <a href="#">editing</a>
            <a href="#">ugc creators</a>
            <a href="#">analytics</a>
            <a href="#">copywriting</a>
            <a href="#">design</a>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-2 font-bold">
            account
          </p>

          <div className="flex flex-col gap-2">
            <a href="#">my projects</a>
            <a href="#">applications</a>
            <a href="#">saved listings</a>
            <a href="#">messages</a>
          </div>
        </div>

        <div>
          <p className="mb-2 font-bold">
            remote
          </p>

          <div className="flex flex-col gap-2">
            <a href="#">india</a>
            <a href="#">global</a>
            <a href="#">part-time</a>
            <a href="#">contract</a>
          </div>
        </div>
      </div>
    </aside>
  );
}