type CTABannerProps = {
  title: string;
  subtitle: string;
  ctaHref: string;
  variant?: "light" | "dark";
};

export function CTABanner({ title, subtitle, ctaHref, variant = "light" }: CTABannerProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={`rounded-3xl border px-6 py-7 shadow-md sm:px-8 ${
        isDark ? "border-slate-800 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className={`${isDark ? "text-slate-100/80" : "text-slate-600"}`}>{subtitle}</p>
        </div>
        <a
          className="inline-flex items-center justify-center rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600"
          href={ctaHref}
        >
          Pide tu Ceeseburger ahora
        </a>
      </div>
    </section>
  );
}
