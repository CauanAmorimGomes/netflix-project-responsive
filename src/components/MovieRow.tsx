import { useRef, useState } from "react";
import type { Movie } from "../data/movies";
import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  showRanks?: boolean;
}

export default function MovieRow({ title, movies, onSelect, showRanks }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [titleHovered, setTitleHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.8;
    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="mb-6 md:mb-10 relative group/row">
      {/* Row Title */}
      <div
        className="flex items-center gap-3 mb-3 px-4 md:px-8 lg:px-14 cursor-pointer"
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
      >
        <h2 className="text-white font-bold text-base md:text-lg lg:text-xl tracking-tight">{title}</h2>
        <span
          className={`text-red-500 text-sm font-semibold flex items-center gap-1 transition-all duration-300 ${
            titleHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
        >
          Explorar tudo
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:from-black"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:from-black"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}

        {/* Movies Scroll Area */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-14 pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelect}
              rank={showRanks ? index + 1 : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
