import { useEffect, useState } from "react";
import type { Movie } from "../data/movies";
import { trendingMovies, continueWatching, popularMovies } from "../data/movies";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: () => void;
}

const allMovies = [...trendingMovies, ...continueWatching, ...popularMovies];

export default function MovieModal({ movie, onClose, onPlay }: MovieModalProps) {
  const [inList, setInList] = useState(false);
  const [liked, setLiked] = useState(false);

  const similar = allMovies.filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g))).slice(0, 6);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-4 md:py-10 px-2"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-zinc-900 rounded-lg w-full max-w-3xl shadow-2xl overflow-hidden animate-modal-in">
        {/* Hero Section */}
        <div className="relative h-48 md:h-72 lg:h-96 overflow-hidden">
          <img
            src={movie.banner || movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 bg-zinc-900/80 hover:bg-zinc-800 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-zinc-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Bottom Content Over Hero */}
          <div className="absolute bottom-4 left-4 md:left-6 right-4 md:right-6">
            {/* Netflix Original Badge */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-red-500 text-xs font-black tracking-widest">N</span>
              <span className="text-zinc-300 text-xs font-semibold tracking-widest uppercase">Série Original</span>
            </div>
            <h2 className="text-white font-black text-2xl md:text-4xl mb-3 drop-shadow-lg">{movie.title}</h2>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onPlay}
                className="flex items-center gap-2 bg-white text-black font-bold px-5 py-2 rounded text-sm hover:bg-zinc-200 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Assistir
              </button>
              <button
                onClick={() => setInList(!inList)}
                className={`flex items-center gap-2 text-white font-semibold px-4 py-2 rounded text-sm transition-all active:scale-95 border ${
                  inList ? "bg-white/20 border-white" : "bg-zinc-700/70 border-zinc-500 hover:border-white"
                }`}
              >
                {inList ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
                {inList ? "Na Lista" : "Minha Lista"}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  liked ? "bg-white border-white" : "border-zinc-500 hover:border-white bg-zinc-700/50"
                }`}
              >
                <svg className={`w-4 h-4 ${liked ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-4 md:px-6 pt-4 pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span className="text-green-400 font-bold">{movie.match}% relevante</span>
                <span className="text-zinc-300 text-sm">{movie.year}</span>
                <span className="border border-zinc-500 text-zinc-300 text-xs px-1.5 py-0.5 rounded">{movie.rating}</span>
                <span className="text-zinc-300 text-sm">{movie.duration}</span>
                <span className="border border-zinc-600 text-zinc-400 text-xs px-1.5 py-0.5 rounded-sm">HD</span>
              </div>
              <p className="text-zinc-200 text-sm leading-relaxed">{movie.description}</p>
            </div>

            {/* Right Column */}
            <div className="md:w-52 text-sm space-y-2">
              <div>
                <span className="text-zinc-500">Gêneros: </span>
                <span className="text-zinc-200">{movie.genre.join(", ")}</span>
              </div>
              <div>
                <span className="text-zinc-500">Classificação: </span>
                <span className="text-zinc-200">{movie.rating}</span>
              </div>
              <div>
                <span className="text-zinc-500">Duração: </span>
                <span className="text-zinc-200">{movie.duration}</span>
              </div>
              <div>
                <span className="text-zinc-500">Ano: </span>
                <span className="text-zinc-200">{movie.year}</span>
              </div>
            </div>
          </div>

          {/* Similar Titles */}
          {similar.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white font-bold text-base md:text-lg mb-4">Títulos Similares</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {similar.map((s) => (
                  <div
                    key={s.id}
                    className="bg-zinc-800 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-zinc-500 transition-all group/sim"
                    onClick={() => {}}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={s.thumbnail}
                        alt={s.title}
                        className="w-full h-full object-cover object-top group-hover/sim:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/sim:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover/sim:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {s.isNew && (
                        <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NOVO</span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-green-400 text-xs font-bold">{s.match}%</span>
                        <span className="border border-zinc-600 text-zinc-400 text-[10px] px-1 rounded">{s.rating}</span>
                      </div>
                      <p className="text-zinc-200 text-xs font-semibold leading-tight">{s.title}</p>
                      <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
