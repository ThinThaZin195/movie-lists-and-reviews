import Movies from "@/components/Movies";

const token = process.env.TMDB_TOKEN;

async function fetchMovies(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}

export default async function GenrePage({ params }) {
  const { id, name } = await params;
  const byGenres = await fetchMovies(id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {name.replace('-', ' ')} Movies
        </h1>
        <p className="text-gray-600">
          Discover the best {name.toLowerCase().replace('-', ' ')} movies
        </p>
      </div>

      <Movies movies={byGenres.results} />
    </div>
  );
}
