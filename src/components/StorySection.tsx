import founderImage from "../../img/personaje.PNG";

export function StorySection() {
  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[1fr_1.3fr] sm:p-8">
      <div className="relative overflow-hidden rounded-2xl bg-slate-50">
        <img src={founderImage} alt="Cristóbal Sandoval cocinando una hamburguesa" className="h-full w-full object-cover" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Nuestra historia</p>
            <h3 className="text-2xl font-bold text-slate-900">Cristóbal y el origen de Ceeseburgers</h3>
          </div>
        </div>
        <div className="space-y-3 text-base text-slate-700">
          <p>
            Cristóbal Sandoval creció obsesionado con el sabor de las hamburguesas. Prefiería pedir dos o tres burgers en vez de un combo, buscando siempre la combinación perfecta. Cocinando para amigos fue refinando recetas hasta que la Cs-Bacon se volvió su bandera.
          </p>
          <p>
            Tras la pérdida de su mascota decidió convertir esa pasión en propósito. Con apoyo familiar profesionalizó el proyecto, disenó una carta clara y se propuso ofrecer comida honesta, rica y accesible que mejorara el dı́a de quien la pide.
          </p>
          <p>
            Hoy cada pedido en Labranza es parte de esa historia: burgers artesanales, precios transparentes y entregas de 14–17 minutos pensadas para jóvenes exploradores y luchadores que necesitan una pausa rica y sin complicaciones.
          </p>
        </div>
      </div>
    </section>
  );
}
