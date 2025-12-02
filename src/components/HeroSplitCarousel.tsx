import { useMemo, useState } from "react";

type SplitSlide = {
  title: string;
  subtitle: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

type HeroSplitCarouselProps = {
  slides: SplitSlide[];
};

export function HeroSplitCarousel({ slides }: HeroSplitCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => slides[index] ?? slides[0], [index, slides]);

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0) {
      setIndex(slides.length - 1);
      return;
    }
    if (nextIndex >= slides.length) {
      setIndex(0);
      return;
    }
    setIndex(nextIndex);
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="grid items-stretch lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col justify-center gap-6 px-8 py-12 text-white sm:px-12 lg:px-14">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />

          <div className="relative space-y-4">
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">{current.title}</h2>
            <p className="text-lg text-slate-200">{current.subtitle}</p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                href={current.ctaHref}
              >
                Ver productos
              </a>
            </div>
          </div>

          <div className="relative flex items-center gap-2 pt-4 text-white/70">
            <button
              className="h-9 w-9 rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"
              onClick={() => goTo(index - 1)}
              aria-label="Anterior"
            >
              ◀
            </button>
            <button
              className="ml-auto h-9 w-9 rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"
              onClick={() => goTo(index + 1)}
              aria-label="Siguiente"
            >
              ▶
            </button>
          </div>

          <div className="relative flex items-center gap-2">
            {slides.map((_, dotIndex) => {
              const isActive = dotIndex === index;
              return (
                <span
                  key={dotIndex}
                  className={`h-1.5 w-8 rounded-full ${isActive ? "bg-red-600" : "bg-white/30"}`}
                  aria-label={`Slide ${dotIndex + 1}`}
                />
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[340px] bg-slate-100">
          <img src={current.imageSrc} alt={current.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
