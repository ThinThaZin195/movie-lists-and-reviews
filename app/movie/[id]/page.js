import Persons from "@/components/Persons";
import { Badge } from "@/components/ui/badge";
import Reviews from "@/components/Reviews";
import WatchProviders from "@/components/WatchProviders";
const token = process.env.TMDB_TOKEN;
async function fetchMovie(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}
export default async function Movie({ params }) {
  const { id } = await params;
  const movie = await fetchMovie(id);
  const cover = "http://image.tmdb.org/t/p/w1280";
  const poster = "http://image.tmdb.org/t/p/w500";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden rounded-lg mb-8">
        <img
          src={cover + movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">
            {movie.title}
            <span className="ml-2 text-2xl font-normal text-gray-300">
              ({movie.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded font-semibold">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.runtime} min</span>
            <span>{movie.release_date}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster and Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <img
              src={poster + movie.poster_path}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg mb-6"
            />
            <div className="space-y-3">
              <Reviews movieId={id} />
              <WatchProviders movieId={id} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{movie.overview}</p>
          </div>

          {/* Cast */}
          <div>
            <h3 className="text-2xl font-bold border-b pb-2 mb-6">Cast</h3>
            <Persons movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}
