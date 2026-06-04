import { CameraIcon, PhoneIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type HeaderProps = {
  logoSrc: string;
  brandName: string;
  instagramHref: string;
  whatsappHref: string;
  transparentOnTop?: boolean;
};

export function Header({ logoSrc, brandName, instagramHref, whatsappHref, transparentOnTop = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isTransparent = transparentOnTop && !hasScrolled;

  useEffect(() => {
    if (!transparentOnTop) return;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 56);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentOnTop]);

  return (
    <>
      <header
        className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 shadow-sm backdrop-blur-xl transition duration-300 ${
          isTransparent ? "border-white/15 bg-black/15 text-white shadow-black/10" : "border-slate-200 bg-white/90 text-slate-900 shadow-slate-900/10"
        }`}
      >
      <a href="/" className="flex items-center gap-3 transition hover:-translate-y-0.5">
        <img src={logoSrc} alt={`${brandName} logo`} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
        <div>
          <p className={`text-sm font-semibold ${isTransparent ? "text-white" : "text-red-700"}`}>{brandName}</p>
          <p className={`text-xs ${isTransparent ? "text-white/75" : "text-slate-500"}`}>No son solo hamburguesas.</p>
        </div>
      </a>

      {/* Desktop links (visible on md+) */}
      <div className="hidden md:flex flex-wrap items-center gap-2 ml-4">
        <a href="/menu" className={`text-xs font-semibold uppercase tracking-[0.2em] transition ${isTransparent ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-red-700"}`}>Menú</a>
        <a href="/ceesepuntos" className={`text-xs font-semibold uppercase tracking-[0.2em] transition ${isTransparent ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-red-700"}`}>Ceesepuntos</a>
        <a href="/blog" className={`text-xs font-semibold uppercase tracking-[0.2em] transition ${isTransparent ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-red-700"}`}>Blog</a>
        <a className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${
          isTransparent ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : "border-slate-200 bg-white text-slate-800 hover:border-red-300"
        }`} href={instagramHref} target="_blank" rel="noreferrer">
          <CameraIcon className="h-4 w-4" aria-hidden />
          Instagram
        </a>
        <a className="inline-flex items-center gap-2 rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-red-600" href={whatsappHref} target="_blank" rel="noreferrer">
          <PhoneIcon className="h-4 w-4 text-white" aria-hidden />
          <span className="text-white">Pedir por WhatsApp</span>
        </a>
      </div>

      {/* Hamburger button (mobile only) */}
      <div className="md:hidden ml-auto">
        <button
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(true)}
          className={`inline-flex items-center justify-center rounded-md p-2 transition ${isTransparent ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
    </header>

    {/* Mobile menu overlay rendered outside header to avoid stacking context issues */}
    {menuOpen && (
      <div className="fixed inset-0 z-50 flex">
        {/* Non-transparent backdrop (opaque color) */}
        <div className="absolute inset-0" onClick={() => setMenuOpen(false)} />
        <nav className="relative ml-auto w-64 max-w-full bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Menú</div>
            <button aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} className="p-1">
              <XMarkIcon className="h-6 w-6 text-slate-700" />
            </button>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <a href="/menu" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Menú</a>
            </li>
            <li>
              <a href="/ceesepuntos" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Ceesepuntos</a>
            </li>
            <li>
              <a href="/ceesepuntos/ranking" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Ranking</a>
            </li>
            <li>
              <a href="/blog" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Blog</a>
            </li>
            <li>
              <a href={instagramHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <CameraIcon className="h-4 w-4" /> Instagram
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white">
                <PhoneIcon className="h-4 w-4 text-white" /> Pedir por WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )}
    </>
  );
}
