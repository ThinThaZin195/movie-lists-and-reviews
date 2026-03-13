import Link from "next/link";
import { Button } from "@/components/ui/button";

const token = process.env.TMDB_TOKEN;

async function fetchGenres() {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default async function Sidebar() {
  const { genres } = await fetchGenres();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Genres</h3>
      <nav className="space-y-2">
        <Button
          className="w-full justify-start"
          variant="ghost"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            🎬 All Movies
          </Link>
        </Button>
        {genres.map((genre) => (
          <Button
            key={genre.id}
            className="w-full justify-start"
            variant="ghost"
            asChild
          >
            <Link href={`/genres/${genre.name}/${genre.id}`}>
              {genre.name}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
