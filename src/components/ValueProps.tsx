const attributes = [
  {
    title: "Sabor inolvidable",
    description:
      "Recetas propias que equilibran jugosidad, textura y un sello artesanal. Pensadas para quienes buscan algo distinto sin salir de casa.",
  },
  {
    title: "Precio transparente y justo",
    description: "Mostramos el valor real de cada burger y sus insumos para que sepas exactamente qué estás pagando.",
  },
  {
    title: "Ingredientes seleccionados",
    description: "Carne de calidad, pan fresco y vegetales de proveedores confiables. Nada genérico, todo cuidado desde la cocina.",
  },
  {
    title: "Entrega rápida en Labranza",
    description: "Despacho y retiro optimizados para llegar en 14–17 minutos promedio sin perder frescura ni temperatura.",
  },
];

type ValuePropsProps = {
  ctaHref: string;
};

export function ValueProps({ ctaHref }: ValuePropsProps) {
  return (
    <section className="space-y-8">
      <div className="grid gap-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Propuesta de valor</p>
        <h3 className="text-3xl font-bold text-slate-900">Burgers artesanales, calidad honesta y velocidad real</h3>
        <p className="text-base text-slate-600">
          Alineado al segmento 20–30 años, Exploradores y Luchadores que necesitan una comida rica, transparente y rápida después de un dı́a largo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {attributes.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-500"
          href={ctaHref}
        >
          Pide tu Ceeseburger ahora
        </a>
        <span className="text-sm text-slate-600">Horario: jue–sáb 16:00–22:30 · Zona: solo Labranza</span>
      </div>
    </section>
  );
}
