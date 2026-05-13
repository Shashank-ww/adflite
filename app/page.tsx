import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProjectFeed from "@/components/feed/ProjectFeed";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto flex max-w-6xl gap-3 px-2 py-3 md:px-4">
        <Sidebar />
        <ProjectFeed />
      </div>

      <Footer/>
    </main>
  );
}