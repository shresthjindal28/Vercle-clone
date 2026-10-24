"use client";
import type { ReactNode } from "react";
import { Check, Circle, Clock3, LoaderCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
export function StateBadge({ status }: { status: string }) {
  const Icon = ["Failed", "Triggered", "Stopped"].includes(status)
    ? X
    : ["Building", "Queued", "Pending", "Invited"].includes(status)
      ? Clock3
      : ["Ready", "Running", "Valid", "Active", "Connected", "Configured", "Enabled"].includes(
            status,
          )
        ? Check
        : Circle;
  return (
    <Badge
      variant="outline"
      className={[
        "workspace-state [&]:[color:var(--foreground)] [&]:[background:var(--muted)]",
        "[&]:[border-color:var(--border)] [&]:rounded-md [&]:text-[10px] [&]:leading-4.5",
        "[&]:gap-1.25 [&]:p-[2px_7px] [&]:font-normal [&]:whitespace-nowrap",
      ].join(" ")}
    >
      <Icon className="size-3" />
      {status}
    </Badge>
  );
}
export function WorkspaceHeading({
  title,
  description,
  group,
  action,
}: {
  title: string;
  description: string;
  group: string;
  action?: ReactNode;
}) {
  return (
    <header
      className={[
        "workspace-heading [&]:flex [&]:justify-between [&]:items-center [&]:gap-6",
        "[&_.eyebrow]:[color:var(--muted-foreground)] [&_.eyebrow]:uppercase",
        "[&_.eyebrow]:text-[10px] [&_.eyebrow]:tracking-[1.5px] [&_.eyebrow]:mb-2",
        "[&_h1]:text-[27px] [&_h1]:font-semibold [&_h1]:tracking-[-0.8px]",
        "[&_h1]:mb-1.5 [&_h1]:wrap-anywhere [&_p:not(.eyebrow)]:text-[13px]",
        "[&_p:not(.eyebrow)]:leading-[1.7] [&_p:not(.eyebrow)]:[color:var(--muted-foreground)]",
        "max-[768px]:[&]:items-start max-[768px]:[&]:flex-col max-[768px]:[&]:gap-4",
        "max-[768px]:[&_h1]:text-[24px]",
      ].join(" ")}
    >
      <div>
        <p className="eyebrow">{group}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && (
        <div
          className={
            "workspace-heading-actions [&]:shrink-0 max-[768px]:[&]:w-full max-[768px]:[&_>_div]:flex-wrap"
          }
        >
          {action}
        </div>
      )}
    </header>
  );
}
export function Panel({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={[
        "dashboard-card [&]:[background:#090909] [&]:[border:1px_solid_#252525]",
        "[&]:[box-shadow:0_2px_6px_#0005] [&]:[--card-spacing:18px] max-[768px]:[&]:[--card-spacing:15px]",
        'workspace-panel [&]:min-w-0 **:data-[slot="card-title"]:text-[15px]',
        '**:data-[slot="card-title"]:font-[550] **:data-[slot="card-description"]:text-[12px]',
        '**:data-[slot="card-description"]:leading-[1.6] [&_table]:text-[12px]',
        "[&_th]:[background:var(--muted)] [&_th]:text-[11px] [&_th]:p-3 [&_td]:p-[14px_12px]",
        "[&_td]:text-[12px] [&_td:first-child]:min-w-45 max-[768px]:[&]:[--card-spacing:16px]",
        'max-[768px]:**:data-[slot="card-header"]:gap-2',
        'max-[768px]:**:data-[slot="card-action"]:col-span-full',
        'max-[768px]:**:data-[slot="card-action"]:row-auto',
        'max-[768px]:**:data-[slot="card-action"]:[justify-self:start]',
        className,
      ].join(" ")}
    >
      <CardHeader>
        <CardTitle>
          <h2>{title}</h2>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
export function Summary({
  items,
}: {
  items: { label: string; value: ReactNode; detail: string }[];
}) {
  return (
    <div
      className={[
        "workspace-summary [&]:grid [&]:grid-cols-3 [&]:gap-4",
        '**:data-[slot="card-content"]:flex **:data-[slot="card-content"]:flex-col',
        '**:data-[slot="card-content"]:gap-3 [&_p]:[color:var(--muted-foreground)]',
        "[&_p]:text-[12px] [&_strong]:text-[27px] [&_strong]:font-[550]",
        "[&_strong]:leading-[1.2] [&_strong]:tracking-[-0.7px]",
        "[&_span:not([data-slot])]:[color:var(--muted-foreground)] [&_span:not([data-slot])]:text-[11px]",
        "max-[768px]:[&]:gap-2 max-[768px]:[&_.dashboard-card]:[--card-spacing:12px]",
        "max-[768px]:[&_strong]:text-[22px] max-[768px]:[&_p]:text-[10px]",
        "max-[768px]:[&_span:not([data-slot])]:text-[10px]",
        "max-[768px]:[&_span:not([data-slot])]:leading-[1.6]",
      ].join(" ")}
    >
      {items.map((item) => (
        <Card
          className={[
            "dashboard-card [&]:[background:#090909] [&]:[border:1px_solid_#252525]",
            "[&]:[box-shadow:0_2px_6px_#0005] [&]:[--card-spacing:18px] max-[768px]:[&]:[--card-spacing:15px]",
          ].join(" ")}
          key={item.label}
        >
          <CardContent>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
            <span>{item.detail}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export function PreviewNote({ children }: { children: ReactNode }) {
  return (
    <p
      className={[
        "workspace-note [&]:flex [&]:items-baseline [&]:gap-2 [&]:[color:var(--muted-foreground)]",
        "[&]:text-[11px] [&]:leading-[1.7] [&]:pb-2",
      ].join(" ")}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-current" />
      {children}
    </p>
  );
}
export function LoadingWorkspace() {
  return (
    <div className="flex items-center gap-2 py-20 text-muted-foreground" role="status">
      <LoaderCircle className="size-4 animate-spin" />
      Loading workspace…
    </div>
  );
}
