import { useMemo, useState } from "react";

type Slide = {
  title: string;
  description: string;
  ctaHref: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
};

type CarouselProps = {
  slides: Slide[];
};

export function Carousel({ slides }: CarouselProps) {
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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-cyan-400" />
          <p className="text-sm font-semibold text-slate-700">Qué hacemos · Por qué lo hacemos · Cómo lo hacemos</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => goTo(index - 1)}
            aria-label="Anterior"
          >
            ◀
          </button>
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
            {current.badge}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{current.title}</h2>
          <p className="text-base leading-relaxed text-slate-700">{current.description}</p>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
            href={current.ctaHref}
          >
            Hacer pedido
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-200 via-amber-300 to-rose-400 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
            <img src={current.imageSrc} alt={current.imageAlt} className="aspect-[4/3] w-full object-cover" />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((_, dotIndex) => {
              const isActive = dotIndex === index;
              return (
                <button
                  key={dotIndex}
                  aria-label={`Ir a la diapositiva ${dotIndex + 1}`}
                  onClick={() => goTo(dotIndex)}
                  className={`h-2 w-8 rounded-full transition ${isActive ? "bg-slate-900" : "bg-slate-200 hover:bg-slate-300"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
