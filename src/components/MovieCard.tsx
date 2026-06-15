import { useState } from "react";
import type { Movie } from "../data/movies";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  rank?: number;
}

export default function MovieCard({ movie, onSelect, rank }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const [inList, setInList] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  return (
    <div
      className="relative shrink-0 cursor-pointer group transition-all duration-300"
      style={{ width: rank !== undefined ? "clamp(100px, 14vw, 180px)" : "clamp(120px, 16vw, 200px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(movie)}
    >
      {/* Top 10 Rank */}
      {rank !== undefined && (
        <div className="absolute -left-4 bottom-0 z-10 pointer-events-none select-none">
          <span
            className="text-[5rem] md:text-[6rem] lg:text-[7rem] font-black leading-none text-zinc-900 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
            style={{
              WebkitTextStroke: "3px #71717a",
            }}
          >
            {rank}
          </span>
        </div>
      )}

      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden rounded-md transition-all duration-300 ${
          hovered ? "scale-105 shadow-2xl shadow-black/80 z-20" : ""
        } ${rank !== undefined ? "ml-8 md:ml-10" : ""}`}
      >
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover object-top block"
          loading="lazy"
        />

        {/* New/Hot Badge */}
        {movie.isNew && !hovered && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            NOVO
          </div>
        )}

        {/* Hover Overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-2.5 md:p-3">
            {/* Preview Play Button */}
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-lg animate-scale-in">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                {/* Like Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setLiked(liked === true ? null : true); }}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    liked === true ? "bg-white border-white" : "border-zinc-400 hover:border-white"
                  }`}
                >
                  <svg className={`w-3.5 h-3.5 ${liked === true ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </button>
                {/* Add to List */}
                <button
                  onClick={(e) => { e.stopPropagation(); setInList(!inList); }}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    inList ? "bg-white border-white" : "border-zinc-400 hover:border-white"
                  }`}
                >
                  {inList ? (
                    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Expand Info */}
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(movie); }}
                className="w-7 h-7 rounded-full border border-zinc-400 hover:border-white flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Title & Info */}
            <p className="text-white font-bold text-xs md:text-sm leading-tight mb-1">{movie.title}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-green-400 text-[10px] font-bold">{movie.match}%</span>
              <span className="text-zinc-300 text-[10px]">{movie.year}</span>
              <span className="border border-zinc-500 text-zinc-400 text-[10px] px-1 rounded">{movie.rating}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              {movie.genre.slice(0, 2).map((g, i) => (
                <span key={g} className="text-zinc-300 text-[10px]">
                  {g}{i < Math.min(movie.genre.length, 2) - 1 ? " •" : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
