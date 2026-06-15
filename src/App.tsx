import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import MovieModal from "./components/MovieModal";
import VideoPlayer from "./components/VideoPlayer";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import type { Movie } from "./data/movies";
import { trendingMovies, continueWatching, popularMovies } from "./data/movies";

const allMovies = [...trendingMovies, ...continueWatching, ...popularMovies];

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handlePlay = (movie?: Movie) => {
    setSelectedMovie(null);
    setPlayingMovie(movie || selectedMovie);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Search Results */}
      {searchQuery ? (
        <SearchResults
          query={searchQuery}
          results={searchResults}
          onSelect={(movie) => { setSelectedMovie(movie); }}
        />
      ) : (
        <>
          {/* Hero Banner */}
          <HeroBanner
            onPlayClick={() => handlePlay()}
            onInfoClick={() => setSelectedMovie(trendingMovies[0])}
          />

          {/* Movie Rows */}
          <div className="relative z-10 -mt-16 md:-mt-24 pb-8">
            {/* Continue Watching */}
            <section className="mb-2">
              <MovieRow
                title="Continue Assistindo"
                movies={continueWatching}
                onSelect={setSelectedMovie}
              />
            </section>

            {/* Top 10 */}
            <section className="mb-2">
              <MovieRow
                title="Top 10 no Brasil Hoje"
                movies={trendingMovies.filter((m) => m.isTop10)}
                onSelect={setSelectedMovie}
                showRanks
              />
            </section>

            {/* Trending */}
            <section className="mb-2">
              <MovieRow
                title="Em Alta"
                movies={trendingMovies}
                onSelect={setSelectedMovie}
              />
            </section>

            {/* New */}
            <section className="mb-2">
              <MovieRow
                title="Novidades"
                movies={[...trendingMovies, ...popularMovies].filter((m) => m.isNew)}
                onSelect={setSelectedMovie}
              />
            </section>

            {/* Popular */}
            <section className="mb-2">
              <MovieRow
                title="Populares no Brasil"
                movies={popularMovies}
                onSelect={setSelectedMovie}
              />
            </section>

            {/* Action */}
            <section className="mb-2">
              <MovieRow
                title="Ação & Aventura"
                movies={allMovies.filter((m) => m.genre.includes("Ação"))}
                onSelect={setSelectedMovie}
              />
            </section>

            {/* Sci-Fi */}
            <section className="mb-2">
              <MovieRow
                title="Ficção Científica"
                movies={allMovies.filter((m) => m.genre.includes("Ficção Científica"))}
                onSelect={setSelectedMovie}
              />
            </section>

            {/* Fantasy */}
            <section>
              <MovieRow
                title="Fantasia & Épico"
                movies={allMovies.filter((m) => m.genre.includes("Fantasia"))}
                onSelect={setSelectedMovie}
              />
            </section>
          </div>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={() => handlePlay(selectedMovie)}
        />
      )}

      {/* Video Player */}
      {playingMovie && (
        <VideoPlayer
          movie={playingMovie}
          onClose={() => setPlayingMovie(null)}
        />
      )}
    </div>
  );
}
