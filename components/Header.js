import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  async function search(formData) {
    "use server";
    const q = formData.get("q");
    redirect(`/movie/search?q=${q}`);
  }

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                🎬 Movie Lists and Reviews
              </Link>
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <form action={search} className="flex gap-2">
              <Input
                type="text"
                name="q"
                placeholder="Search movies..."
                className="w-64"
              />
              <Button type="submit" className="px-6">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
