import comboImage from "../../img/combos/01-full-clasicas.webp";
import papasImage from "../../img/acompaniamiento/papas.webp";
import smokeImage from "../../img/hamb-solas/smoke-criminal.webp";

type MenuPreviewProps = {
  menuHref: string;
};

const menuHighlights = [
  {
    title: "Burgers contundentes",
    description: "Clásicas, bacon, smoke y rompedietas para distintos niveles de hambre.",
    image: smokeImage,
    alt: "Hamburguesa Smoke Criminal de Ceeseburger's",
  },
  {
    title: "Combos para compartir",
    description: "Opciones armadas con papitas y salsas para pedir sin darle tantas vueltas.",
    image: comboImage,
    alt: "Combo de hamburguesas Ceeseburger's",
  },
  {
    title: "Papitas y extras",
    description: "Acompañamientos calientes para cerrar el pedido como corresponde.",
    image: papasImage,
    alt: "Papitas fritas de Ceeseburger's",
  },
];

export function MenuPreview({ menuHref }: MenuPreviewProps) {
  return (
    <section id="menu" className="space-y-6 scroll-mt-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-zinc-950 px-6 py-7 text-white shadow-xl shadow-red-950/15 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Menú Ceeseburger's</p>
          <h2 className="text-2xl font-black sm:text-3xl">Elige tu antojo directo en el menú</h2>
          <p className="max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Revisa burgers, combos, papitas y extras disponibles para retiro o delivery.
          </p>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-extrabold text-zinc-950 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-amber-200/50"
          href={menuHref}
        >
          Ver menú y pedir
        </a>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {menuHighlights.map((item) => (
          <a
            key={item.title}
            href={menuHref}
            className="group relative min-h-[260px] overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-end gap-2 p-5">
              <h3 className="text-xl font-black drop-shadow">{item.title}</h3>
              <p className="text-sm leading-6 text-zinc-100 drop-shadow">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
