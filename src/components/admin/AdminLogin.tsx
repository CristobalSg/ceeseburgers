import { useState } from "react";
import type { FormEvent } from "react";

import { supabase } from "@/lib/supabase";

type AdminLoginProps = {
  onLogin: () => void;
};

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message || "No pudimos iniciar sesion.");
      return;
    }

    onLogin();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-50 sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md items-center">
        <div className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-400">Admin</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">Ceeseburgers</h1>
            <p className="mt-2 text-sm text-zinc-400">Ingresa con tu cuenta autorizada.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-200">Email</span>
              <input
                className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-50 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                type="email"
                value={email}
                autoComplete="email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-zinc-200">Password</span>
              <input
                className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-50 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                type="password"
                value={password}
                autoComplete="current-password"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            <button
              className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-zinc-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Entrar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
