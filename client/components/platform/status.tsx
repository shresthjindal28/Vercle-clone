import { cn } from "@/lib/utils";
export type DeploymentStatus = "building" | "ready" | "failed" | "queued";
const colors: Record<DeploymentStatus, string> = {
  building: "text-(--info)",
  ready: "text-(--success)",
  failed: "text-(--danger)",
  queued: "text-(--warning)",
};
export function StatusIndicator({ status }: { status: DeploymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-medium capitalize",
        colors[status],
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full bg-current", status === "building" && "animate-pulse")}
      />
      {status}
    </span>
  );
}
