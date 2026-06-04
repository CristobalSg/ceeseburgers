import { useEffect, useState } from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { getCeesepuntosRanking, type CeesepuntosRankingItem } from "@/services/ceesepuntos";

export function CeesepuntosRankingPage() {
  const [items, setItems] = useState<CeesepuntosRankingItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    getCeesepuntosRanking()
      .then((ranking) => {
        if (!mounted) return;
        setItems(ranking);
        setStatus("ready");
      })
      .catch((error) => {
        if (!mounted) return;
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "No pudimos cargar el ranking.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 text-white shadow-xl sm:px-10">
        <div className="max-w-3xl space-y-4">
          <p className="inline-flex rounded-full border border-amber-200/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
            Ranking público
          </p>
          <h1 className="text-4xl font-black sm:text-5xl">Ranking Ceesepuntos</h1>
          <p className="text-base leading-7 text-zinc-200">
            Los clientes con más puntos aparecen arriba. Nunca mostramos RUT, WhatsApp ni datos sensibles.
          </p>
          <a className="inline-flex rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-zinc-950 transition hover:bg-orange-400" href="/ceesepuntos">
            Registrarme
          </a>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[64px_1fr_92px] gap-3 bg-zinc-950 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-amber-200 sm:grid-cols-[80px_1fr_130px_150px_130px]">
          <span>Pos.</span>
          <span>Cliente</span>
          <span>Puntos</span>
          <span className="hidden sm:block">Última compra</span>
          <span className="hidden sm:block">Referidos mes</span>
        </div>

        {status === "loading" ? <StateRow text="Cargando ranking..." /> : null}
        {status === "error" ? <StateRow text={message} /> : null}
        {status === "ready" && !items.length ? <StateRow text="Aún no hay clientes registrados en el ranking." /> : null}

        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid grid-cols-[64px_1fr_92px] items-center gap-3 border-t border-slate-100 px-4 py-4 sm:grid-cols-[80px_1fr_130px_150px_130px]"
          >
            <div className="flex items-center gap-2 font-black text-slate-900">
              {index < 3 ? <TrophyIcon className="h-5 w-5 text-amber-500" aria-hidden /> : null}
              #{index + 1}
            </div>
            <div>
              <p className="font-black text-slate-950">{item.public_name || "Burger fan anónimo"}</p>
              <p className="text-xs text-slate-500 sm:hidden">
                Última compra: {formatDate(item.ultima_compra)} · Referidos: {item.referidos_mes ?? 0}
              </p>
            </div>
            <p className="rounded-full bg-amber-100 px-3 py-1 text-center text-sm font-black text-amber-900">{item.puntos_actuales} pts</p>
            <p className="hidden text-sm font-medium text-slate-600 sm:block">{formatDate(item.ultima_compra)}</p>
            <p className="hidden text-sm font-bold text-slate-700 sm:block">{item.referidos_mes ?? 0}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function StateRow({ text }: { text: string }) {
  return <div className="px-4 py-8 text-center text-sm font-semibold text-slate-600">{text}</div>;
}

function formatDate(value: string | null) {
  if (!value) return "Sin registro";

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
