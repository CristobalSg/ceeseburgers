import { CameraIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";

type SocialLinksProps = {
  instagramUrl?: string;
  tiktokUrl?: string;
};

export function SocialLinks({ instagramUrl = "https://instagram.com/tu-cuenta", tiktokUrl = "https://tiktok.com/@tu-cuenta" }: SocialLinksProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-8 text-white shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Redes sociales</p>
          <h3 className="text-2xl font-bold">Síguenos y vive el backstage</h3>
          <p className="text-sm text-slate-100/80">
            Publicamos contenido de producto, empresa, educación y trends en video para activar antojo y comunidad.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:bg-white/20"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <CameraIcon className="h-4 w-4" aria-hidden /> Instagram
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-400"
            href={tiktokUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MusicalNoteIcon className="h-4 w-4" aria-hidden /> TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
