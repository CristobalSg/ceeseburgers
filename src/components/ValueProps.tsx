import { BoltIcon, CurrencyDollarIcon, FireIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const attributes = [
  {
    icon: FireIcon,
    title: "Sabor inolvidable",
    description:
      "Recetas propias que equilibran jugosidad, textura y un sello artesanal. Pensadas para quienes buscan algo distinto sin salir de casa.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Precio transparente y justo",
    description: "Mostramos el valor real de cada burger y sus insumos para que sepas exactamente qué estás pagando.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Ingredientes seleccionados",
    description: "Carne de calidad, pan fresco y vegetales de proveedores confiables. Nada genérico, todo cuidado desde la cocina.",
  },
  {
    icon: BoltIcon,
    title: "Entrega rápida en Labranza",
    description: "Despacho y retiro optimizados para llegar en 14–17 minutos promedio sin perder frescura ni temperatura.",
  },
];

export function ValueProps() {
  return (
    <section className="space-y-8 animate-fade-up motion-reduce:animate-none">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {attributes.map((item) => (
          <article key={item.title} className="flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center text-red-700">
              <item.icon className="h-8 w-8" aria-hidden />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
