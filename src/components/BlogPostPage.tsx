import type { BlogPost } from "../data/blogPosts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type BlogPostPageProps = {
  post: BlogPost | null;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return (
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Artículo no encontrado</h1>
        <p className="text-sm text-slate-600">
          Puede que este post haya cambiado de nombre o que el enlace esté desactualizado.
        </p>
        <div className="pt-2">
          <a
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-red-600"
          >
            Volver al blog
          </a>
        </div>
      </section>
    );
  }

  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-red-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {post.category}
        </p>
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">{post.title}</h1>
        <p className="text-sm text-slate-600 sm:text-base">{post.subtitle}</p>
        <p className="text-xs text-slate-500">{formatDate(post.date)}</p>
      </header>

      <div className="h-px w-full bg-slate-200" />

      <section
        className="space-y-6 text-base leading-relaxed text-slate-700"
        data-blog-content
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
