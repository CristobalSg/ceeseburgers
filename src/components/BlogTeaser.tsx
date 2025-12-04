import { blogPosts } from "../data/blogPosts";

export function BlogTeaser() {
  const posts = blogPosts.slice(0, 2);

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Blog e inbound</p>
        <h3 className="text-2xl font-bold text-slate-900">Contenido que construye comunidad</h3>
        <p className="text-sm text-slate-600">Educamos mientras generamos antojo y confianza. Ideal para el mix de exploradores y luchadores.</p>
        <a
          href="/blog"
          className="inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 underline-offset-4 hover:underline"
        >
          Ver todos los artículos del blog
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">{post.category}</p>
            <h4 className="mt-1 text-lg font-semibold text-slate-900">{post.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{post.subtitle}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Publicaciones base · SEO local y social</p>
          </a>
        ))}
      </div>
    </section>
  );
}
