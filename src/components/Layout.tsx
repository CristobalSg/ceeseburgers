import type { ReactNode } from "react";

type LayoutProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function Layout({ header, children, footer }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="flex-1 space-y-12">
          {header}
          <main className="flex flex-col gap-12">{children}</main>
        </div>
        <div className="mt-12">{footer}</div>
      </div>
    </div>
  );
}
