"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    if (reviews.length > 0) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setReviews(data.results);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={fetchReviews}
        disabled={loading}
        variant="outline"
        className="w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            Loading Reviews...
          </span>
        ) : (
          `Show Reviews (${reviews.length > 0 ? reviews.length : ""})`
        )}
      </Button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Movie Reviews</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{review.author}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        {review.author_details?.rating && (
                          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                            <span className="text-yellow-600">★</span>
                            <span className="text-sm font-medium text-yellow-700">
                              {review.author_details.rating}/10
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No reviews available for this movie.</p>
                  <p className="text-gray-400 text-sm mt-2">Be the first to write a review!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}