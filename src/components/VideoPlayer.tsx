import { useState, useEffect, useRef } from "react";
import type { Movie } from "../data/movies";
import { featuredMovie } from "../data/movies";

interface VideoPlayerProps {
  movie?: Movie;
  onClose: () => void;
}

export default function VideoPlayer({ movie = featuredMovie, onClose }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide controls
  useEffect(() => {
    if (playing) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => { if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current); };
  }, [playing, showControls]);

  // Simulate progress
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 0.05));
    }, 200);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
      if (e.key === "m") setMuted((m) => !m);
      if (e.key === "f") setFullscreen((f) => !f);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (playing) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const formatTime = (percent: number) => {
    const totalMinutes = 128; // 2h08min
    const elapsed = Math.floor((percent / 100) * totalMinutes);
    const h = Math.floor(elapsed / 60);
    const m = elapsed % 60;
    return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:00` : `${m}:00`;
  };

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex items-center justify-center ${fullscreen ? "cursor-none" : ""}`}
      onMouseMove={handleMouseMove}
      onClick={() => setPlaying((p) => !p)}
    >
      {/* Fake Video - Movie Poster as Background */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={movie.banner || movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover"
          style={{ filter: playing ? "brightness(0.7)" : "brightness(0.4)" }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Center Play/Pause Indicator */}
        <div
          className={`absolute pointer-events-none transition-all duration-300 ${
            playing ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
        >
          <div className="w-20 h-20 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Buffering Overlay */}
        {!playing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-6 bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider hidden md:block">Voltar para</p>
              <p className="text-sm font-bold">{movie.title}</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button className="text-white hover:text-zinc-300 transition-colors hidden md:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="text-white hover:text-zinc-300 transition-colors hidden md:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="px-4 md:px-8 pb-4 md:pb-8 bg-gradient-to-t from-black/90 to-transparent">
          {/* Progress Bar */}
          <div className="mb-3 md:mb-4 group/progress">
            <div
              className="relative h-1 md:h-1.5 group-hover/progress:h-2 md:group-hover/progress:h-2.5 bg-zinc-600/70 rounded-full cursor-pointer transition-all duration-150"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = (clickX / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, newProgress)));
              }}
            >
              {/* Buffered */}
              <div className="absolute inset-0 bg-zinc-500/50 rounded-full" style={{ width: `${Math.min(progress + 15, 100)}%` }} />
              {/* Progress */}
              <div
                className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity -ml-1.5 md:-ml-2"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-zinc-400 text-xs">
              <span>{formatTime(progress)}</span>
              <span>{movie.duration}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Play/Pause */}
              <button
                onClick={() => setPlaying(!playing)}
                className="text-white hover:text-zinc-300 transition-colors"
              >
                {playing ? (
                  <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip Forward */}
              <button className="text-white hover:text-zinc-300 transition-colors hidden md:block" onClick={() => setProgress(Math.min(progress + 5, 100))}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              {/* Volume */}
              <div
                className="flex items-center gap-2 relative"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              >
                <button
                  onClick={() => setMuted(!muted)}
                  className="text-white hover:text-zinc-300 transition-colors"
                >
                  {muted || volume === 0 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : volume < 50 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M9 9H4a1 1 0 00-1 1v4a1 1 0 001 1h5l5 5V4L9 9z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 6a7 7 0 010 12M9 9H4a1 1 0 00-1 1v4a1 1 0 001 1h5l5 5V4L9 9z" />
                    </svg>
                  )}
                </button>
                {showVolume && (
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={muted ? 0 : volume}
                      onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
                      className="w-16 md:w-24 h-1 accent-white cursor-pointer"
                    />
                    <span className="text-white text-xs w-6 text-center">{muted ? 0 : volume}</span>
                  </div>
                )}
              </div>

              {/* Time Display */}
              <div className="text-zinc-300 text-xs md:text-sm hidden sm:block">
                <span className="text-white">{formatTime(progress)}</span>
                <span> / {movie.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Subtitles */}
              <button className="text-white hover:text-zinc-300 transition-colors hidden md:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </button>

              {/* Settings */}
              <button className="text-white hover:text-zinc-300 transition-colors hidden md:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Fullscreen */}
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="text-white hover:text-zinc-300 transition-colors"
              >
                {fullscreen ? (
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none transition-opacity duration-500 ${showControls ? "opacity-0" : "opacity-0"}`}>
      </div>
    </div>
  );
}
