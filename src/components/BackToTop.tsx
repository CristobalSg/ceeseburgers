import { ArrowUpIcon } from "@heroicons/react/24/solid";

export function BackToTop() {
  return (
    <a
      href="#top"
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      aria-label="Volver arriba"
    >
      <ArrowUpIcon className="h-5 w-5" aria-hidden />
    </a>
  );
}
