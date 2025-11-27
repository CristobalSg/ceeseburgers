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
      <div className="flex items-center gap-3">
        <img src={logoSrc} alt={`${brandName} logo`} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-cyan-700">{brandName}</p>
          <p className="text-xs text-slate-500">Hamburguesas artesanales · Labranza</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300"
          href={instagramHref}
          target="_blank"
          rel="noreferrer"
        >
          <CameraIcon className="h-4 w-4" aria-hidden />
          Instagram
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-cyan-500"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden />
          Pedir por WhatsApp
        </a>
      </div>
    </header>
  );
}
