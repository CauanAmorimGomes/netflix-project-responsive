import { useState, useEffect } from "react";
import { featuredMovie } from "../data/movies";

interface HeroBannerProps {
  onPlayClick: () => void;
  onInfoClick: (id: number) => void;
}

export default function HeroBanner({ onPlayClick, onInfoClick }: HeroBannerProps) {
  const [muted, setMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowInfo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-105"
        style={{ backgroundImage: `url(${featuredMovie.banner})` }}
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950" />

      {/* Content */}
      <div
        className={`absolute bottom-[20%] md:bottom-[25%] left-0 px-4 md:px-8 lg:px-14 max-w-full md:max-w-2xl lg:max-w-3xl transition-all duration-1000 ${
          showInfo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-red-600/20 border border-red-600/50 rounded-full px-3 py-1">
            <span className="text-red-500 text-xs font-bold">N</span>
            <span className="text-white text-xs font-semibold tracking-widest uppercase">Série Original</span>
          </div>
          {featuredMovie.isNew && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">NOVO</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-none mb-4 drop-shadow-2xl tracking-tight">
          {featuredMovie.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-green-400 font-bold text-sm">{featuredMovie.match}% relevante</span>
          <span className="text-zinc-300 text-sm">{featuredMovie.year}</span>
          <span className="border border-zinc-400 text-zinc-300 text-xs px-1.5 py-0.5 rounded">{featuredMovie.rating}</span>
          <span className="text-zinc-300 text-sm">{featuredMovie.duration}</span>
          <span className="border border-zinc-500 text-zinc-400 text-xs px-2 py-0.5 rounded-sm">HD</span>
        </div>

        {/* Genres */}
        <div className="flex items-center gap-1.5 mb-5 flex-wrap">
          {featuredMovie.genre.map((g, i) => (
            <span key={g}>
              <span className="text-zinc-300 text-sm">{g}</span>
              {i < featuredMovie.genre.length - 1 && <span className="text-zinc-600 ml-1.5">•</span>}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-zinc-200 text-sm md:text-base leading-relaxed mb-6 max-w-xl line-clamp-3 md:line-clamp-none">
          {featuredMovie.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onPlayClick}
            className="flex items-center gap-2 bg-white text-black font-bold px-6 md:px-8 py-2.5 md:py-3 rounded text-sm md:text-base hover:bg-zinc-200 transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Assistir
          </button>
          <button
            onClick={() => onInfoClick(featuredMovie.id)}
            className="flex items-center gap-2 bg-zinc-500/70 backdrop-blur-sm text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded text-sm md:text-base hover:bg-zinc-400/70 transition-all duration-200 active:scale-95"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mais Informações
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="absolute bottom-[22%] md:bottom-[28%] right-4 md:right-12 flex flex-col items-end gap-3">
        <button
          onClick={() => setMuted(!muted)}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-400 flex items-center justify-center text-white hover:border-white transition-all bg-black/30 backdrop-blur-sm"
        >
          {muted ? (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M9 9H4a1 1 0 00-1 1v4a1 1 0 001 1h5l5 5V4L9 9z" />
            </svg>
          )}
        </button>
        <div className="bg-zinc-700 border-l-4 border-white text-white text-xs font-bold px-3 py-1.5 tracking-widest uppercase">
          {featuredMovie.rating}
        </div>
      </div>
    </div>
  );
}
