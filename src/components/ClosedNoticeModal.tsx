import { useEffect, useRef } from "react";

export function ClosedNoticeModal() {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="closed-notice-title"
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "Escape" || event.key === "Tab") {
            event.preventDefault();
            dialogRef.current?.focus();
          }
        }}
        className="w-full max-w-md rounded-lg border border-red-100 bg-white p-6 text-center shadow-2xl outline-none sm:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-red-600">Cerrado por ahora</p>
        <h2 id="closed-notice-title" className="mt-3 text-3xl font-black text-slate-950">
          No estamos atendiendo pedidos
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Por dificultades del momento, Ceeseburgers se encuentra cerrado temporalmente.
          Intentaremos volver lo antes posible.
        </p>
        <p className="mt-5 rounded-md bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
          Gracias por tu paciencia y comprensión.
        </p>
      </div>
    </div>
  );
}
