import { useState } from "react";
import { CheckCircleIcon, FireIcon, GiftIcon, TrophyIcon } from "@heroicons/react/24/solid";
import heroDesktopImage from "../../img/hero-desktop.webp";
import heroMobileImage from "../../img/hero-mobile.webp";
import {
  cleanDisplayName,
  normalizeInstagram,
  normalizeRut,
  normalizeUsername,
  normalizeWhatsapp,
  registerCeesepuntosClient,
  validateRegistration,
  type CeesepuntosRegistration,
} from "@/services/ceesepuntos";

const earningRules = [
  "1 Ceesepunto por cada $100 en tu pedido.",
  "Historia etiquetando a Ceeseburger’s: +10 pts.",
  "Invitar a un cliente nuevo: +30 pts.",
  "Cliente nuevo recomendado: +10 pts.",
  "Cumpleaños con pedido: +50 pts.",
  "Opinión útil: +10 pts.",
];

const rewards = [
  ["Salsa a elección", "30 pts"],
  ["Bebida", "80 pts"],
  ["Papitas fritas", "90 pts"],
  ["Nuggets x5", "120 pts"],
  ["Cs-Clásica", "220 pts"],
  ["Falsa Bic Mac secreta", "250 pts"],
  ["Cs-Bacon", "270 pts"],
  ["Cs-Smoke Criminal", "270 pts"],
  ["Combo Papero Cs-Clásica", "340 pts"],
];

const importantRules = [
  "Los puntos se acumulan solo en pedidos pagados.",
  "Los productos canjeados no generan puntos.",
  "Los puntos no se cambian por dinero.",
  "Los canjes están sujetos a disponibilidad.",
  "Los puntos vencen después de 90 días sin comprar.",
];

const initialForm: CeesepuntosRegistration = {
  rut: "",
  username: "",
  displayName: "",
  isAnonymous: false,
  instagram: "",
  whatsapp: "",
  acceptedTerms: false,
};

export function CeesepuntosPage() {
  const [form, setForm] = useState<CeesepuntosRegistration>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CeesepuntosRegistration, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const updateField = <Field extends keyof CeesepuntosRegistration>(field: Field, value: CeesepuntosRegistration[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleaned: CeesepuntosRegistration = {
      ...form,
      rut: normalizeRut(form.rut),
      username: normalizeUsername(form.username),
      displayName: cleanDisplayName(form.displayName),
      instagram: normalizeInstagram(form.instagram),
      whatsapp: normalizeWhatsapp(form.whatsapp),
    };
    const validationErrors = validateRegistration(cleaned);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("error");
      setMessage("Revisa los campos marcados antes de enviar.");
      return;
    }

    try {
      setStatus("submitting");
      setMessage("");
      await registerCeesepuntosClient(cleaned);
      setStatus("success");
      setMessage("Registro listo 🍔 Ya puedes empezar a juntar Ceesepuntos en tus pedidos.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No pudimos registrar tus datos. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <section className="relative isolate min-h-svh overflow-hidden bg-zinc-950 text-white shadow-2xl shadow-red-950/20">
        <picture className="absolute inset-0 -z-10 block">
          <source media="(min-width: 1024px)" srcSet={heroDesktopImage} />
          <img
            src={heroMobileImage}
            alt="Combo de Ceeseburger's para juntar Ceesepuntos"
            className="h-full w-full object-cover object-center lg:object-right"
            fetchPriority="high"
          />
        </picture>

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/75 to-black/15 lg:bg-gradient-to-r lg:from-black lg:via-black/75 lg:to-black/10" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(127,29,29,0.10),rgba(251,146,60,0.12))]" />

        <div className="mx-auto flex min-h-svh w-full max-w-6xl items-end px-6 pb-12 pt-32 sm:px-8 sm:pb-14 lg:items-center lg:px-10 lg:py-28">
          <div className="max-w-xl space-y-5 text-center sm:text-left">
            <p className="inline-flex rounded-full border border-amber-200/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 backdrop-blur">
            Programa de fidelización
          </p>

            <h1 className="text-5xl font-black leading-[0.95] text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
              Ceesepuntos
            </h1>

            <p className="text-xl font-black text-amber-200 drop-shadow sm:text-2xl">Cada pedido te acerca a tu próxima burger.</p>

            <p className="mx-auto max-w-lg text-base font-medium leading-7 text-zinc-100 drop-shadow sm:mx-0 sm:text-lg">
            Acumula puntos con tus pedidos, gana bonus y canjea productos exclusivos de Ceeseburger’s.
          </p>

            <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-base font-extrabold text-zinc-950 shadow-xl shadow-black/35 transition hover:-translate-y-0.5 hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-amber-200/60"
                href="#registro"
              >
              Registrarme
            </a>
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                href="/ceesepuntos/ranking"
              >
              Ver ranking
            </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-10">
        <section className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <InfoCard icon={FireIcon} title="Cómo ganas puntos" items={earningRules} />
          <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <GiftIcon className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-2xl font-black text-slate-950">Canjes disponibles</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {rewards.map(([name, points]) => (
              <div key={name} className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-950 px-4 py-3 text-white">
                <span className="text-sm font-semibold">{name}</span>
                <span className="shrink-0 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-zinc-950">{points}</span>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <InfoCard icon={CheckCircleIcon} title="Reglas importantes" items={importantRules} />
          <RegistrationForm form={form} errors={errors} status={status} message={message} updateField={updateField} onSubmit={handleSubmit} />
        </section>
      </div>
    </div>
  );
}

type InfoCardProps = {
  icon: typeof FireIcon;
  title: string;
  items: string[];
};

function InfoCard({ icon: Icon, title, items }: InfoCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-700">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-medium leading-6 text-slate-700">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

type RegistrationFormProps = {
  form: CeesepuntosRegistration;
  errors: Partial<Record<keyof CeesepuntosRegistration, string>>;
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  updateField: <Field extends keyof CeesepuntosRegistration>(field: Field, value: CeesepuntosRegistration[Field]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function RegistrationForm({ form, errors, status, message, updateField, onSubmit }: RegistrationFormProps) {
  return (
    <section id="registro" className="scroll-mt-8 rounded-3xl bg-zinc-950 p-5 text-white shadow-xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-zinc-950">
          <TrophyIcon className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h2 className="text-2xl font-black">Registro provisional</h2>
          <p className="text-sm text-zinc-300">Solo guardamos tus datos. Los puntos se gestionan después.</p>
        </div>
      </div>

      <form className="grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="RUT" value={form.rut} error={errors.rut} onChange={(value) => updateField("rut", value)} placeholder="12.345.678-9" />
          <TextInput label="Username" value={form.username} error={errors.username} onChange={(value) => updateField("username", value)} placeholder="burgerfan" />
          <TextInput label="Alias o nombre visible" value={form.displayName} error={errors.displayName} onChange={(value) => updateField("displayName", value)} placeholder="Cris" />
          <TextInput label="Instagram (opcional)" value={form.instagram} error={errors.instagram} onChange={(value) => updateField("instagram", value)} placeholder="@ceesefan" />
          <TextInput label="WhatsApp (opcional)" value={form.whatsapp} error={errors.whatsapp} onChange={(value) => updateField("whatsapp", value)} placeholder="+56912345678" />
        </div>

        <label className="flex gap-3 rounded-2xl bg-white/10 p-4 text-sm font-medium leading-6 text-zinc-100">
          <input
            className="mt-1 h-4 w-4 accent-amber-400"
            type="checkbox"
            checked={form.isAnonymous}
            onChange={(event) => updateField("isAnonymous", event.target.checked)}
          />
          Aparecer como anónimo en el ranking público.
        </label>

        <label className="flex gap-3 rounded-2xl bg-white/10 p-4 text-sm font-medium leading-6 text-zinc-100">
          <input
            className="mt-1 h-4 w-4 accent-amber-400"
            type="checkbox"
            checked={form.acceptedTerms}
            onChange={(event) => updateField("acceptedTerms", event.target.checked)}
          />
          Acepto las reglas del sistema Ceesepuntos.
        </label>
        {errors.acceptedTerms ? <p className="text-sm font-semibold text-amber-200">{errors.acceptedTerms}</p> : null}

        {message ? (
          <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status === "success" ? "bg-emerald-400/15 text-emerald-100" : "bg-red-500/15 text-red-100"}`}>
            {message}
          </p>
        ) : null}

        <button
          className="min-h-13 rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-zinc-950 shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Registrando..." : "Crear registro"}
        </button>
      </form>
    </section>
  );
}

type TextInputProps = {
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function TextInput({ label, value, error, placeholder, onChange }: TextInputProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-zinc-100">
      {label}
      <input
        className="min-h-12 rounded-2xl border border-white/10 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-200/30"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className="text-xs font-bold text-amber-200">{error}</span> : null}
    </label>
  );
}
