import { CameraIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

type SiteFooterProps = {
  brandName: string;
  instagramHref: string;
  whatsappHref: string;
};

export function SiteFooter({ brandName, instagramHref, whatsappHref }: SiteFooterProps) {
  return (
    <footer className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-red-700">{brandName}</p>
          <p className="text-xs text-slate-500">Hamburguesas artesanales · Labranza</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300"
            href={instagramHref}
            target="_blank"
            rel="noreferrer"
          >
            <CameraIcon className="h-4 w-4" aria-hidden />
            Instagram
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-red-600 hover:text-white focus-visible:text-white visited:text-white"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            <PhoneIcon className="h-4 w-4 text-white" aria-hidden />
            <span className="text-white">Pedir por WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-2">
          <MapPinIcon className="mt-1 h-4 w-4 text-red-700" aria-hidden />
          <div>
            <p className="font-semibold text-slate-900">Zona de entrega</p>
            <p className="text-slate-600">Labranza, Temuco y puntos acordados.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ClockIcon className="mt-1 h-4 w-4 text-red-700" aria-hidden />
          <div>
            <p className="font-semibold text-slate-900">Horarios</p>
            <p className="text-slate-600">Jue–sáb 16:00–22:30 · Tiempo promedio 14–17 minutos.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <PhoneIcon className="mt-1 h-4 w-4 text-red-700" aria-hidden />
          <div>
            <p className="font-semibold text-slate-900">Contacto directo</p>
            <p className="text-slate-600">Pedidos online y WhatsApp para cambios o dudas.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {brandName}. Productos artesanales elaborados al momento.</p>
      </div>
    </footer>
  );
}
