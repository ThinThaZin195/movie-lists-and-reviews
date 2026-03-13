"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function WatchProviders({ movieId }) {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setProviders(data.results?.US || null); // Using US as default region
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [movieId]);

  if (loading) {
    return (
      <Button disabled className="w-full">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
        Loading watch options...
      </Button>
    );
  }

  if (!providers || (!providers.flatrate && !providers.rent && !providers.buy)) {
    return (
      <Button disabled variant="outline" className="w-full">
        Watch options not available
      </Button>
    );
  }

  const getProviderLink = (provider) => {
    return providers.link || `https://www.themoviedb.org/movie/${movieId}/watch`;
  };

  return (
    <div className="space-y-3">
      {/* Streaming */}
      {providers.flatrate && providers.flatrate.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Stream Now</h4>
          <div className="flex flex-wrap gap-2">
            {providers.flatrate.slice(0, 4).map((provider) => (
              <a
                key={provider.provider_id}
                href={getProviderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="default" size="sm" className="h-8 px-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-5 h-5 mr-2 rounded"
                  />
                  {provider.provider_name}
                </Button>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Rent */}
      {providers.rent && providers.rent.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Rent</h4>
          <div className="flex flex-wrap gap-2">
            {providers.rent.slice(0, 3).map((provider) => (
              <a
                key={provider.provider_id}
                href={getProviderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-5 h-5 mr-2 rounded"
                  />
                  {provider.provider_name}
                </Button>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Buy */}
      {providers.buy && providers.buy.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Buy</h4>
          <div className="flex flex-wrap gap-2">
            {providers.buy.slice(0, 3).map((provider) => (
              <a
                key={provider.provider_id}
                href={getProviderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-5 h-5 mr-2 rounded"
                  />
                  {provider.provider_name}
                </Button>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}