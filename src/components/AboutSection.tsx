import founderImage from "../../img/personaje.PNG";

const people = [
  {
    name: "Cristóbal",
    role: "Fundador · Cocina y Operaciones",
    photo: founderImage,
    accent: "from-red-500 to-amber-500",
    bio: "Perfeccionó la Cs-Bacon pensando en sabor, velocidad y precio justo para Labranza.",
  },
  {
    name: "Equipo Ceeseburgers",
    role: "Creatividad · Atención · Entrega",
    photo: founderImage,
    accent: "from-red-600 to-pink-500",
    bio: "Unimos cocina, diseño y logística para que cada pedido sea rápido, rico y sin complicaciones.",
  },
];

export function AboutSection() {
  return (
    <section className="p-8 sm:p-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center">
        <div className="space-y-3">
          <p className="inline-flex items-center rounded-full bg-red-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow">
            Conoce al equipo
          </p>
          <h2 className="text-4xl font-black text-slate-900 sm:text-5xl">Somos Ceeseburgers</h2>
          <div className="mx-auto max-w-xl rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow">
            Los que estamos detrás preparando tu próxima burger ;)
          </div>
          <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
            Si estás aquí, ya probaste de todo: entregas lentas, sabores genéricos o webs que no convierten. Tranquilo. No estás solo. Creamos Ceeseburgers
            para unir cocina, creatividad y tecnología en un sistema que hace lo que todos prometen — entregar burgers honestas que venden de verdad.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {people.map((person) => (
            <article
              key={person.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${person.accent} opacity-0 transition group-hover:opacity-30`} />
                <img src={person.photo} alt={person.name} className="h-64 w-full object-cover" />
              </div>
              <div className="space-y-2 px-5 py-4 text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">{person.role}</p>
                <h3 className="text-xl font-bold text-slate-900">{person.name}</h3>
                <p className="text-sm text-slate-600">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
