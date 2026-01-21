import { CameraIcon, PhoneIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type HeaderProps = {
  logoSrc: string;
  brandName: string;
  instagramHref: string;
  whatsappHref: string;
};

export function Header({ logoSrc, brandName, instagramHref, whatsappHref }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
      <a href="/" className="flex items-center gap-3 transition hover:-translate-y-0.5">
        <img src={logoSrc} alt={`${brandName} logo`} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-red-700">{brandName}</p>
          <p className="text-xs text-slate-500">Hamburguesas · Labranza</p>
        </div>
      </a>

      {/* Desktop links (visible on md+) */}
      <div className="hidden md:flex flex-wrap items-center gap-2 ml-4">
        <a href="/menu" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:text-red-700">Menú</a>
        <a href="/blog" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:text-red-700">Blog</a>
        <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-red-300" href={instagramHref} target="_blank" rel="noreferrer">
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
        <button aria-label="Abrir menú" onClick={() => setMenuOpen(true)} className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100">
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
