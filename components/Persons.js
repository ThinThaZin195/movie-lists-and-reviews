const token = process.env.TMDB_TOKEN;
async function fetchCasts(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await res.json()).cast;
}

export default async function Persons({ movie }) {
  const casts = await fetchCasts(movie.id);
  const profile = "http://image.tmdb.org/t/p/w185";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {casts.slice(0, 12).map((cast) => (
        <div
          key={cast.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div className="aspect-[3/4] overflow-hidden">
            {cast.profile_path ? (
              <img
                src={profile + cast.profile_path}
                alt={cast.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Photo</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="font-semibold text-sm mb-1 line-clamp-2">{cast.name}</h4>
            <p className="text-xs text-gray-600 line-clamp-2">{cast.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
