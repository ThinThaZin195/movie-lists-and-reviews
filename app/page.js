import Movies from "@/components/Movies";

const token = process.env.TMDB_TOKEN;

async function fetchPopular() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

async function fetchTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default async function Home() {
  const popular = await fetchPopular();
  const trending = await fetchTrending();

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Movies</h2>
          <p className="text-gray-600">Discover the most popular movies right now</p>
        </div>
        <Movies movies={popular.results} />
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Today</h2>
          <p className="text-gray-600">See what's trending in movies today</p>
        </div>
        <Movies movies={trending.results} />
      </section>
    </div>
  );
}
