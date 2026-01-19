import { CameraIcon, PhoneIcon } from "@heroicons/react/24/solid";

type HeaderProps = {
  logoSrc: string;
  brandName: string;
  instagramHref: string;
  whatsappHref: string;
};

export function Header({ logoSrc, brandName, instagramHref, whatsappHref }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
      <a href="/" className="flex items-center gap-3 transition hover:-translate-y-0.5">
        <img src={logoSrc} alt={`${brandName} logo`} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-red-700">{brandName}</p>
          <p className="text-xs text-slate-500">Hamburguesas artesanales · Labranza</p>
        </div>
      </a>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href="/menu"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:text-red-700"
        >
          Menú
        </a>
        <a
          href="/blog"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:text-red-700"
        >
          Blog
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-red-300"
          href={instagramHref}
          target="_blank"
          rel="noreferrer"
        >
          <CameraIcon className="h-4 w-4" aria-hidden />
          Instagram
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white !text-white shadow-md transition hover:-translate-y-0.5 hover:bg-red-600 hover:!text-white focus-visible:!text-white visited:!text-white"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          <PhoneIcon className="h-4 w-4 text-white" aria-hidden />
          <span className="text-white">Pedir por WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
