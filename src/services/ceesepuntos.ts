import { supabase } from "@/lib/supabase";

export type CeesepuntosRegistration = {
  rut: string;
  username: string;
  displayName: string;
  isAnonymous: boolean;
  instagram: string;
  whatsapp: string;
  acceptedTerms: boolean;
};

export type CeesepuntosRankingItem = {
  id: string;
  public_name: string;
  puntos_actuales: number;
  ultima_compra: string | null;
  referidos_mes: number;
};

type CeesepuntosInsert = {
  rut: string;
  username: string;
  alias: string;
  aparecer_anonimo: boolean;
  instagram: string | null;
  whatsapp: string | null;
  fecha_cumpleanos: null;
  terminos_aceptados: boolean;
};

export function normalizeRut(value: string) {
  return value.trim().replace(/\./g, "").replace(/\s/g, "").toUpperCase();
}

export function normalizeUsername(value: string) {
  return value.trim().replace(/^@/, "").toLowerCase();
}

export function normalizeInstagram(value: string) {
  return value.trim().replace(/^@/, "").toLowerCase();
}

export function normalizeWhatsapp(value: string) {
  if (!value.trim()) return "";

  const compact = value.trim().replace(/[^\d+]/g, "");
  return compact.startsWith("+") ? compact : `+${compact}`;
}

export function cleanDisplayName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function validateRegistration(payload: CeesepuntosRegistration) {
  const errors: Partial<Record<keyof CeesepuntosRegistration, string>> = {};

  if (!payload.rut) errors.rut = "Ingresa tu RUT.";
  if (!payload.username) errors.username = "Ingresa un username.";
  if (!payload.displayName) errors.displayName = "Ingresa tu alias o nombre visible.";
  if (!payload.acceptedTerms) errors.acceptedTerms = "Debes aceptar las reglas del sistema.";

  if (payload.username && !/^[a-z0-9._-]{3,24}$/.test(payload.username)) {
    errors.username = "Usa 3 a 24 caracteres: letras, números, punto, guion o guion bajo.";
  }

  if (payload.instagram && !/^[a-z0-9._]{2,30}$/.test(payload.instagram)) {
    errors.instagram = "Ingresa un usuario de Instagram válido, sin espacios.";
  }

  if (payload.whatsapp && payload.whatsapp.length < 9) {
    errors.whatsapp = "Ingresa un WhatsApp válido.";
  }

  return errors;
}

export async function registerCeesepuntosClient(payload: CeesepuntosRegistration) {
  const row: CeesepuntosInsert = {
    rut: normalizeRut(payload.rut),
    username: normalizeUsername(payload.username),
    alias: cleanDisplayName(payload.displayName),
    aparecer_anonimo: payload.isAnonymous,
    instagram: payload.instagram ? normalizeInstagram(payload.instagram) : null,
    whatsapp: payload.whatsapp ? normalizeWhatsapp(payload.whatsapp) : null,
    fecha_cumpleanos: null,
    terminos_aceptados: payload.acceptedTerms,
  };

  const { error } = await supabase.from("ceesepuntos_clientes").insert(row);

  if (error) {
    if (error.code === "23505") {
      const details = `${error.message} ${error.details ?? ""}`.toLowerCase();

      if (details.includes("rut")) throw new Error("Ese RUT ya está registrado.");
      if (details.includes("username")) throw new Error("Ese username ya está registrado.");
      if (details.includes("instagram")) throw new Error("Ese Instagram ya está registrado.");
      if (details.includes("whatsapp")) throw new Error("Ese WhatsApp ya está registrado.");

      throw new Error("Ya existe un registro con esos datos.");
    }

    throw new Error(error.message || "No pudimos registrar tus datos. Intenta nuevamente.");
  }
}

export async function getCeesepuntosRanking() {
  const { data, error } = await supabase
    .from("ceesepuntos_ranking_public")
    .select("id, public_name, puntos_actuales, ultima_compra, referidos_mes")
    .order("puntos_actuales", { ascending: false })
    .order("ultima_compra", { ascending: false, nullsFirst: false })
    .limit(50);

  if (error) {
    throw new Error(error.message || "No pudimos cargar el ranking.");
  }

  return (data ?? []) as CeesepuntosRankingItem[];
}
