import heroDesktopImage from "../../img/hero-desktop.webp";
import heroMobileImage from "../../img/hero-mobile.webp";

type HeroProps = {
  ctaHref: string;
};

export function Hero({ ctaHref }: HeroProps) {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-zinc-950 text-white shadow-2xl shadow-red-950/20">
      <picture className="absolute inset-0 -z-10 block">
        <source media="(min-width: 1024px)" srcSet={heroDesktopImage} />
        <img
          src={heroMobileImage}
          alt="Combo de hamburguesa Ceeseburger's con papitas"
          className="h-full w-full object-cover object-center lg:object-right"
          fetchPriority="high"
        />
      </picture>

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/10 lg:bg-gradient-to-r lg:from-black lg:via-black/70 lg:to-black/5" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(127,29,29,0.08),rgba(251,146,60,0.10))]" />

      <div className="mx-auto flex min-h-svh w-full max-w-6xl items-end px-6 pb-12 pt-32 sm:px-8 sm:pb-14 lg:items-center lg:px-10 lg:py-28">
        <div className="max-w-xl space-y-5 text-center sm:text-left">
          <p className="inline-flex rounded-full border border-amber-200/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 backdrop-blur">
            Out kitchen · Retiro o delivery
          </p>

          <h1 className="text-4xl font-black leading-[1.02] text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
            Hoy se come Ceeseburger’s
          </h1>

          <p className="mx-auto max-w-lg text-base font-medium leading-7 text-zinc-100 drop-shadow sm:mx-0 sm:text-lg">
            Hamburguesas contundentes, papitas y combos listos para retiro o delivery.
          </p>

          <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-base font-extrabold text-zinc-950 shadow-xl shadow-black/35 transition hover:-translate-y-0.5 hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-amber-200/60"
              href={ctaHref}
            >
              Ver menú y pedir
            </a>
            <span className="text-sm font-semibold text-zinc-200 drop-shadow">Jueves a sábado · 17:00 a 01:00 aprox.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
