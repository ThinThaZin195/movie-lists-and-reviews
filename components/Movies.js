import Link from "next/link";

export default function Movies({ movies }) {
  const poster = "http://image.tmdb.org/t/p/w342";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <Link href={`/movie/${movie.id}`} className="block">
            <div className="aspect-[2/3] overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={poster + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/movie/${movie.id}`}>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {movie.title}
              </h3>
            </Link>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{movie.release_date?.split("-")[0] || "TBA"}</span>
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
