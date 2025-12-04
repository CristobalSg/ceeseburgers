import { blogPosts } from "../data/blogPosts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogList() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Blog corporativo</p>
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Contenido para jóvenes que estudian y trabajan</h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Ideas, guías y técnicas pensadas para quienes llegan tarde, están cansados y aun así quieren comer rico sin complicarse demasiado.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">{post.category}</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 group-hover:text-red-700">{post.title}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-600">{post.subtitle}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{formatDate(post.date)}</span>
              <span className="font-semibold tracking-[0.16em]">Leer artículo</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

