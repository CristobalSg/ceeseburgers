import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      setIsLoadingSession(false);

      if (!data.session && window.location.pathname !== "/admin") {
        window.history.replaceState(null, "", "/admin");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoadingSession(false);

      if (!nextSession && window.location.pathname !== "/admin") {
        window.history.replaceState(null, "", "/admin");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isLoadingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-zinc-950 px-4 text-zinc-50">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Cargando admin...</p>
      </main>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={() => undefined} />;
  }

  return <AdminDashboard userEmail={session.user.email ?? "Usuario autenticado"} />;
}
