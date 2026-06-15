export default function Footer() {
  const links = [
    ["Perguntas Frequentes", "Central de Ajuda", "Conta", "Mídia"],
    ["Relações com Investidores", "Formas de Assistir", "Informações Corporativas", "Somente na Netflix"],
    ["Central de Privacidade", "Preferências de Cookies", "Informações Legais", "Declaração de Privacidade"],
    ["Acelerador de Velocidade", "Contato", "Teste de Velocidade", "Legal Notices"],
  ];

  return (
    <footer className="bg-zinc-950 px-4 md:px-8 lg:px-14 py-10 mt-8 border-t border-zinc-800/50">
      <div className="max-w-5xl">
        {/* Social Links */}
        <div className="flex items-center gap-4 mb-6">
          {[
            {
              label: "Facebook",
              icon: (
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              ),
            },
            {
              label: "Instagram",
              icon: (
                <>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </>
              ),
            },
            {
              label: "Twitter",
              icon: (
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              ),
            },
            {
              label: "YouTube",
              icon: (
                <>
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                </>
              ),
            },
          ].map((s) => (
            <button
              key={s.label}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              aria-label={s.label}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                {s.icon}
              </svg>
            </button>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {links.map((col, ci) =>
            col.map((link) => (
              <a
                key={`${ci}-${link}`}
                href="#"
                className="text-zinc-500 text-xs hover:text-zinc-300 hover:underline transition-colors py-0.5"
              >
                {link}
              </a>
            ))
          )}
        </div>

        {/* Service Code */}
        <button className="border border-zinc-600 text-zinc-400 text-xs px-3 py-1.5 rounded hover:border-zinc-400 hover:text-zinc-200 transition-colors mb-4">
          Código de Serviço
        </button>

        <p className="text-zinc-600 text-xs">© 2024 Netflix Clone — Desenvolvido com React + Tailwind CSS</p>
      </div>
    </footer>
  );
}
