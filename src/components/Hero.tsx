import heroImage from "../../img/cs-bacon.PNG";

type HeroProps = {
  ctaHref: string;
};

export function Hero({ ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-14 text-white shadow-lg sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,0.18),transparent_32%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Hamburguesas artesanales · Labranza
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            ¿Cansado de cocinar o comer siempre lo mismo?
            <span className="block text-cyan-200">Aquí empieza tu nueva Ceeseburger favorita.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-100/80">
            Preparamos burgers artesanales con recetas propias, porciones contundentes y entrega promedio de 14–17 minutos en Labranza. Sin filas,
            sin complicaciones: solo sabor honesto cuando más lo necesitas.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-600"
              href={ctaHref}
            >
              Pide tu Ceeseburger ahora
            </a>
            <span className="text-sm text-slate-100/80">Entrega estimada 14–17 minutos · Pago online seguro</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -rotate-3 rounded-2xl bg-cyan-300/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl">
            <img
              src={heroImage}
              alt="Cs-Bacon, hamburguesa artesanal de Ceeseburgers"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <p className="mt-3 text-sm text-slate-100/80">Foto real de la Cs-Bacon para activar el antojo inmediato.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
