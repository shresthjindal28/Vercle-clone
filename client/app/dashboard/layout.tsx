import { Suspense } from "react";
import { WorkspaceProvider } from "@/components/platform/workspace-provider";
import { AppShell } from "@/components/app-shell";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="p-8" role="status">
          Loading workspace…
        </div>
      }
    >
      <WorkspaceProvider>
        <AppShell>{children}</AppShell>
      </WorkspaceProvider>
    </Suspense>
  );
}
