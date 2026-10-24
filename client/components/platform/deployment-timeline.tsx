import { Check, Circle, LoaderCircle, X } from "lucide-react";
import { Icon } from "@/components/ui/icon";
export type DeploymentStage = {
  name: string;
  detail: string;
  state: "complete" | "active" | "pending" | "failed";
};
export function DeploymentTimeline({ stages }: { stages: DeploymentStage[] }) {
  return (
    <ol aria-label="Deployment stages" className="space-y-0">
      {stages.map((stage, index) => (
        <li key={stage.name} className="relative flex gap-4 pb-6 last:pb-0">
          {index < stages.length - 1 && (
            <span aria-hidden="true" className="absolute top-6 bottom-0 left-3 border-l" />
          )}
          <span
            className={[
              "relative grid size-6 shrink-0 place-items-center rounded-full border bg-card",
              stage.state === "complete"
                ? "text-(--success)"
                : stage.state === "failed"
                  ? "text-(--danger)"
                  : stage.state === "active"
                    ? "text-(--info)"
                    : "text-muted-foreground",
            ].join(" ")}
          >
            <Icon
              icon={
                stage.state === "complete"
                  ? Check
                  : stage.state === "failed"
                    ? X
                    : stage.state === "active"
                      ? LoaderCircle
                      : Circle
              }
              size="sm"
              className={stage.state === "active" ? "animate-spin" : undefined}
            />
          </span>
          <div>
            <p className="text-sm font-medium">
              {stage.name}
              <span className="sr-only">: {stage.state}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stage.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
