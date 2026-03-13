import Movies from "@/components/Movies";

const token = process.env.TMDB_TOKEN;

async function fetchSearch(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}

export default async function Search({ searchParams }) {
  const { q } = await searchParams;
  const search = await fetchSearch(q);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600">
          {search.results?.length > 0
            ? `Found ${search.results.length} result${search.results.length === 1 ? '' : 's'} for "${q}"`
            : `No results found for "${q}"`
          }
        </p>
      </div>

      {search.results && search.results.length > 0 ? (
        <Movies movies={search.results} />
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No movies found</h3>
          <p className="text-gray-600 mb-4">Try searching with different keywords</p>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to home
          </a>
        </div>
      )}
    </div>
  );
}
