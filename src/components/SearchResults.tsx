import type { Movie } from "../data/movies";

interface SearchResultsProps {
  query: string;
  results: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function SearchResults({ query, results, onSelect }: SearchResultsProps) {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 px-4 md:px-8 lg:px-14 pb-16">
      <div className="mb-6">
        {results.length > 0 ? (
          <p className="text-zinc-300 text-base md:text-lg">
            Resultados para: <span className="text-white font-semibold">"{query}"</span>
          </p>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-zinc-400 text-lg mb-2">
              Sua pesquisa por <span className="text-white">"{query}"</span> não trouxe resultados.
            </p>
            <p className="text-zinc-500 text-sm">Tente pesquisar por outro título, pessoa ou gênero.</p>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer group/search relative"
              onClick={() => onSelect(movie)}
            >
              <div className="relative overflow-hidden rounded-md aspect-[2/3]">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-full object-cover object-top group-hover/search:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/search:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover/search:opacity-100 transition-opacity shadow-lg">
                    <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {movie.isNew && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NOVO</span>
                )}
              </div>
              <div className="mt-1.5 px-0.5">
                <p className="text-white text-sm font-semibold truncate">{movie.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-green-400 text-xs font-bold">{movie.match}%</span>
                  <span className="text-zinc-400 text-xs">{movie.year}</span>
                  <span className="border border-zinc-600 text-zinc-400 text-[10px] px-1 rounded">{movie.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {movie.genre.slice(0, 2).map((g) => (
                    <span key={g} className="text-zinc-500 text-[11px]">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
