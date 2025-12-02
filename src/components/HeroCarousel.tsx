import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  description: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  align?: "left" | "right";
};

type HeroCarouselProps = {
  slides: Slide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => slides[index] ?? slides[0], [index, slides]);
  const intervalMs = 6000;

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

  useEffect(() => {
    if (!slides.length) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <section
      className="relative overflow-hidden rounded-3xl text-white shadow-lg animate-fade-up motion-reduce:animate-none"
      style={{
        backgroundImage: `url(${current.imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,0.18),transparent_32%)]" />

      <div className="relative flex flex-col gap-6 px-6 py-14 sm:px-10 lg:px-14">
        <div className="flex items-center gap-2">
          <button
            className="h-9 w-9 rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Anterior"
            onClick={() => goTo(index - 1)}
          >
            ◀
          </button>
          <button
            className="ml-auto h-9 w-9 rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Siguiente"
            onClick={() => goTo(index + 1)}
          >
            ▶
          </button>
        </div>

        <div className={`space-y-4 max-w-lg ${current.align === "right" ? "ml-auto text-right" : ""}`}>
          <h1 className="text-4xl font-bold leading-tight sm:text-[2.5rem]">{current.title}</h1>
          <p className="max-w-lg text-lg text-slate-100/85">{current.description}</p>

          <div className={`flex flex-wrap items-center gap-3 ${current.align === "right" ? "justify-end" : ""}`}>
            <a
              className="rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-600"
              href={current.ctaHref}
            >
              Pide tu Ceeseburger ahora
            </a>
            <span className="text-sm text-slate-100/80">Entrega estimada 14–17 minutos · Pago online seguro</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {slides.map((_, dotIndex) => {
            const isActive = dotIndex === index;
            return (
              <button
                key={dotIndex}
                aria-label={`Ir al slide ${dotIndex + 1}`}
                onClick={() => goTo(dotIndex)}
                className={`h-2 w-12 rounded-full transition ${isActive ? "bg-red-600" : "bg-white/35 hover:bg-white/50"}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
