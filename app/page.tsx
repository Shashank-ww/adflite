import Sidebar from "@/components/layout/Sidebar";
import ProjectFeed from "@/components/feed/ProjectFeed";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
})
{
  const { q } = await searchParams;
  
  return (
    <main className="min-h-screen">

      <div className="mx-auto flex max-w-6xl gap-4 p-4">
        <Sidebar />
        <ProjectFeed query={q} />
      </div>

    </main>
  );
}