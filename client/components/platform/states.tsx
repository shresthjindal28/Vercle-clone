import type { ReactNode } from "react";
import { Inbox, LoaderCircle } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
export function EmptyState({
  title = "No deployments yet",
  description = "Connect a repository to deploy your first project.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-8 text-center">
      <Icon icon={Inbox} size="xl" className="text-muted-foreground" />
      <h3 className="text-base font-medium">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Icon icon={LoaderCircle} className="animate-spin" />
      {label}
    </span>
  );
}
export function LoadingCard() {
  return (
    <div role="status" aria-label="Loading project" className="space-y-4 rounded-xl border p-6">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <span className="sr-only">Loading project</span>
    </div>
  );
}
