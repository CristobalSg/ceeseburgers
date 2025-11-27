export function BlogTeaser() {
  const posts = [
    {
      title: "Guía definitiva: ¿Qué hace que una hamburguesa sea realmente artesanal?",
      summary: "Selección y molienda de carne, pan fresco y recetas propias pensadas para Exploradores que buscan sabor auténtico.",
    },
    {
      title: "Paso a paso: domina la cebolla caramelizada en 5 minutos",
      summary: "Tutorial práctico para Luchadores que quieren mejorar sus skills en casa y elevar cualquier burger casera.",
    },
  ];

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Blog e inbound</p>
        <h3 className="text-2xl font-bold text-slate-900">Contenido que construye comunidad</h3>
        <p className="text-sm text-slate-600">Educamos mientras generamos antojo y confianza. Ideal para el mix de exploradores y luchadores.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-lg font-semibold text-slate-900">{post.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{post.summary}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Publicaciones base · SEO local y social</p>
          </article>
        ))}
      </div>
    </section>
  );
}
