type AnnouncementBarProps = {
  message: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function AnnouncementBar({ message, ctaHref, ctaLabel = "Ver detalles" }: AnnouncementBarProps) {
  return (
    <div className="w-full bg-black px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white sm:text-sm">
      <span>{message}</span>
      {ctaHref ? (
        <a
          className="ml-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white no-underline shadow-sm ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:bg-white/20 hover:shadow hover:ring-white/50 motion-safe:animate-glow"
          href={ctaHref}
        >
          ✦
          <span>{ctaLabel}</span>
        </a>
      ) : null}
    </div>
  );
}
