import { BoltIcon, CurrencyDollarIcon, FireIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const attributes = [
  {
    icon: FireIcon,
    title: "Sabor propio",
    description: "Recetas con sello casero, salsas sabrosas y burgers bien cargadas.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Precios claros",
    description: "Opciones simples de entender, sin sorpresas al momento de pedir.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Hecho al momento",
    description: "Pan, carne, papitas y extras preparados para salir calientes.",
  },
  {
    icon: BoltIcon,
    title: "Retiro o delivery",
    description: "Pide fácil y coordina tu entrega durante nuestro horario.",
  },
];

export function ValueProps() {
  return (
    <section className="animate-fade-up motion-reduce:animate-none">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {attributes.map((item) => (
          <article
            key={item.title}
            className="flex min-h-32 flex-col items-center justify-start gap-2 rounded-2xl border border-amber-100 bg-white p-2.5 text-center shadow-sm sm:min-h-44 sm:p-5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700 sm:h-12 sm:w-12">
              <item.icon className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden />
            </div>
            <div className="space-y-1">
              <h4 className="text-[0.72rem] font-black leading-tight text-slate-950 sm:text-base">{item.title}</h4>
              <p className="text-[0.62rem] leading-snug text-slate-600 sm:text-sm sm:leading-6">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
