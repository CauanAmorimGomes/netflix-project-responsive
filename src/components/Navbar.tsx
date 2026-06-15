import { useState, useEffect } from "react";
import { categories } from "../data/movies";

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Navbar({ onSearch, searchQuery }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Início");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/98 shadow-2xl shadow-black/50"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      <div className="px-4 md:px-8 lg:px-14 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6 lg:gap-10 shrink-0">
          <a href="#" className="shrink-0">
            <svg
              viewBox="0 0 111 30"
              className="h-6 md:h-7 lg:h-8 fill-red-600"
              aria-label="Netflix"
            >
              <path d="M105.06 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.7-.24-3.4-.507-5.148-.768l6.226-14.464L94.25 0h5.16l3.065 7.997L105.85 0h5.063l-5.853 14.28zM90.3 0h4.865v27.88c-1.618-.18-3.257-.39-4.865-.578V0zm-6.33 16.434c-1.394.12-2.8.205-4.23.35v8.005c-1.59.178-3.2.302-4.79.48V0h4.78v11.394c1.44-.12 2.862-.258 4.24-.343V0h4.79v23.75c-1.595.24-3.2.448-4.79.66V16.43zm-15.54-11.37v4.638c1.97 0 3.952-.1 5.908-.153V14.2c-1.965.05-3.938.123-5.908.17v4.82c2.61-.21 5.248-.394 7.897-.52v4.626l-12.69 1.1V0h12.69v4.63c-2.64-.13-5.28-.19-7.897-.19v.634zm-16.43 21.35c-1.66.145-3.325.26-4.993.4V9.07H43.2V4.478h14.43V9.07h-4.833v17.34zM27.43 26.52c.007 0 .013 0 .02-.006l4.842-16.23V26.94c1.61-.05 3.24-.1 4.865-.12V0h-4.77L27.2 14.78 22.017 0h-4.847v27.47c1.598.16 3.205.33 4.81.5V10.253l5.44 16.268zM0 26.94V0h4.872v22.4C3.23 22.45 1.604 22.7 0 26.94z" />
            </svg>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm transition-colors duration-200 ${
                    activeCategory === cat
                      ? "text-white font-semibold"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black/80 border border-white/50 rounded px-3 py-1.5 gap-2">
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  autoFocus
                  placeholder="Títulos, pessoas, gêneros"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-transparent text-white placeholder-zinc-400 text-sm outline-none w-40 md:w-56"
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                />
                {searchQuery && (
                  <button onClick={() => { onSearch(""); setSearchOpen(false); }} className="text-zinc-400 hover:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-white hover:text-zinc-300 transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Kids */}
          <button className="hidden lg:block text-sm text-zinc-200 hover:text-white transition-colors">
            Infantil
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
              className="text-white hover:text-zinc-300 transition-colors p-1 relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-10 w-80 bg-zinc-900 border border-zinc-700 rounded shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-zinc-700">
                  <p className="text-white font-semibold text-sm">Notificações</p>
                </div>
                {["Shadow Protocol está disponível", "Novo episódio: Dark Frequency", "Recomendado para você: The Order"].map((n, i) => (
                  <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1.5"></div>
                    <p className="text-zinc-200 text-sm">{n}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
              className="flex items-center gap-1.5 group"
            >
              <div className="w-8 h-8 rounded overflow-hidden bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <svg
                className={`w-3 h-3 text-white transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-52 bg-zinc-900 border border-zinc-700 rounded shadow-2xl overflow-hidden z-50">
                {[
                  { icon: "👤", label: "Meu Perfil" },
                  { icon: "➕", label: "Gerenciar Perfis" },
                  { icon: "📱", label: "Transferir App" },
                  { icon: "💳", label: "Conta" },
                  { icon: "❓", label: "Central de Ajuda" },
                ].map((item) => (
                  <div key={item.label} className="px-4 py-2.5 flex items-center gap-3 hover:bg-zinc-800 cursor-pointer">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-zinc-200 text-sm">{item.label}</span>
                  </div>
                ))}
                <div className="border-t border-zinc-700 px-4 py-2.5">
                  <button className="text-zinc-300 text-sm hover:text-white w-full text-left">Sair da Netflix</button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-zinc-800 px-4 py-4">
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => { setActiveCategory(cat); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded text-sm transition-colors ${
                    activeCategory === cat
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
