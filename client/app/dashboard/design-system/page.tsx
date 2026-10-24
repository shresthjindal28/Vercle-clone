"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Rocket, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { StatusIndicator, type DeploymentStatus } from "@/components/platform/status";
import { EmptyState, LoadingCard, Spinner } from "@/components/platform/states";
import { ConfirmationDialog } from "@/components/platform/confirmation-dialog";
import { EnvironmentSelector, type Environment } from "@/components/platform/environment-selector";
import { DataTable, type Column } from "@/components/platform/data-table";
import { LogViewer, type LogEntry } from "@/components/platform/log-viewer";
import { MetricCard } from "@/components/platform/metrics";
import { DeploymentTimeline } from "@/components/platform/deployment-timeline";
import { useKeyboardShortcut } from "@/components/platform/keyboard-shortcuts";

type Deployment = {
  id: string;
  project: string;
  status: DeploymentStatus;
  environment: Environment;
  duration: number;
};
const seed: Deployment[] = [
  {
    id: "dpl_001",
    project: "cloudforge-web",
    status: "ready",
    environment: "production",
    duration: 42,
  },
  {
    id: "dpl_002",
    project: "api-service",
    status: "building",
    environment: "production",
    duration: 18,
  },
  { id: "dpl_003", project: "docs", status: "queued", environment: "production", duration: 0 },
  {
    id: "dpl_004",
    project: "dashboard",
    status: "failed",
    environment: "production",
    duration: 63,
  },
  { id: "dpl_005", project: "worker", status: "ready", environment: "production", duration: 12 },
  { id: "dpl_006", project: "assets", status: "ready", environment: "production", duration: 8 },
  {
    id: "dpl_007",
    project: "cloudforge-preview",
    status: "ready",
    environment: "preview",
    duration: 36,
  },
];
const columns: Column<Deployment>[] = [
  { key: "project", label: "Project", value: (row) => row.project },
  {
    key: "status",
    label: "Status",
    value: (row) => row.status,
    render: (row) => <StatusIndicator status={row.status} />,
  },
  {
    key: "duration",
    label: "Build time",
    value: (row) => row.duration,
    render: (row) => `${row.duration}s`,
  },
];
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 space-y-6 border-t py-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
export default function DesignSystem() {
  const [environment, setEnvironment] = useState<Environment>("production");
  const [rows, setRows] = useState(seed);
  const [name, setName] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "initial",
      timestamp: "09:42:00",
      level: "info",
      message: "Application started. Ready to accept requests.",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  useKeyboardShortcut("/", () => search.current?.focus());
  useKeyboardShortcut("d", () => toast.info("Deploy shortcut activated in this demo."));
  useEffect(() => {
    if (!streaming) return;
    const timer = window.setInterval(() => {
      const now = new Date();
      setLogs((previous) => [
        ...previous.slice(-99),
        {
          id: `${now.getTime()}`,
          timestamp: now.toISOString().slice(11, 19),
          level: "info",
          message: "GET /api/health 200 · 12ms (simulated)",
        },
      ]);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [streaming]);
  return (
    <div id="design-system" className="mx-auto max-w-6xl px-6 py-12 md:px-10">
      <a
        className={[
          "skip-link [&]:fixed [&]:top-2 [&]:left-2 [&]:z-100 [&]:[padding:var(--space-3)]",
          "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--primary)]",
          "[&]:[color:var(--primary-foreground)] [&]:transform-[translateY(-200%)]",
          "focus:transform-[translateY(0)]",
        ].join(" ")}
        href="#components"
      >
        Skip to components
      </a>
      <header className="mb-10 space-y-4">
        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← Back to CloudForge
        </Link>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          CloudForge / Design system
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          A foundation for everything you build.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Shared foundations, component states, and developer platform patterns. All data on this
          page is demonstration data.
        </p>
        <nav
          aria-label="Design system sections"
          className="flex flex-wrap gap-4 text-sm underline underline-offset-4"
        >
          <a href="#foundations">Foundations</a>
          <a href="#components">Components</a>
          <a href="#table">Tables</a>
          <a href="#platform">Platform</a>
          <a href="#accessibility">Accessibility</a>
        </nav>
      </header>
      <Section id="foundations" title="01 / Design foundations">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-medium">4px / 8px spacing</h3>
            <div className="flex items-end gap-3">
              {[4, 8, 12, 16, 24, 32].map((size) => (
                <div key={size} className="space-y-2 text-center">
                  <div
                    className={[
                      "w-6 rounded-sm bg-primary",
                      (
                        {
                          4: "h-1",
                          8: "h-2",
                          12: "h-3",
                          16: "h-4",
                          24: "h-6",
                          32: "h-8",
                        } as Record<number, string>
                      )[size],
                    ].join(" ")}
                  />
                  <span className="text-xs text-muted-foreground">{size}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Use p-4, gap-2, space-y-6 or --space-* tokens.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Radii, borders & elevation</h3>
            <div className="flex flex-wrap gap-3">
              {["rounded-lg", "rounded-xl", "rounded-2xl"].map((radius, index) => (
                <div
                  key={radius}
                  className={[
                    "grid size-16 place-items-center border bg-card text-xs shadow-md",
                    radius,
                  ].join(" ")}
                >
                  {[8, 12, 16][index]}px
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Controls 8px · Cards 12px · Dialogs 16px
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Lucide icons</h3>
            <div className="flex items-end gap-4">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <Icon key={size} icon={Rocket} size={size} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">14 / 16 / 20 / 24px · 1.75px stroke</p>
            <div className="flex gap-3">
              <Icon icon={Settings} />
              <Icon icon={Search} />
            </div>
          </div>
        </div>
        <div className="grid gap-6 rounded-xl border bg-card p-6 md:grid-cols-2">
          <div>
            <p className="text-3xl font-semibold">Heading 32 / 40</p>
            <p className="mt-3 text-2xl font-semibold">Section 24 / 32</p>
            <p className="mt-3 text-xl font-medium">Subheading 20 / 28</p>
          </div>
          <div className="space-y-3">
            <p className="text-base">Body 16 / 24 — Geist Sans</p>
            <p className="text-sm">Interface 14 / 20 — forms and navigation</p>
            <p className="text-xs text-muted-foreground">Caption 12 / 16 — secondary information</p>
            <code className="block font-mono text-xs">Geist Mono · logs, IDs, and code</code>
          </div>
        </div>
      </Section>
      <Section id="components" title="02 / Component standards">
        <div className="flex flex-wrap gap-3">
          {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map(
            (variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ),
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Spinner label="Deploying" />
          </Button>
        </div>
        <form
          className="grid max-w-2xl gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            toast.success(`Project ${name} created (demo)`);
            setName("");
          }}
        >
          <div className="space-y-2">
            <label htmlFor="project-name" className="font-medium">
              Project name
            </label>
            <Input
              id="project-name"
              required
              pattern="[a-z0-9-]+"
              aria-describedby="project-help"
              placeholder="my-project"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <p id="project-help" className="text-xs text-muted-foreground">
              Lowercase letters, numbers and hyphens.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="disabled-input">Read only on your plan</label>
            <Input id="disabled-input" disabled value="Enterprise setting" />
          </div>
          <div className="space-y-2">
            <label htmlFor="invalid-input">Invalid example</label>
            <Input
              id="invalid-input"
              aria-invalid="true"
              aria-describedby="invalid-help"
              defaultValue="Invalid Name!"
            />
            <p id="invalid-help" className="text-xs text-destructive">
              Use lowercase letters, numbers, and hyphens.
            </p>
          </div>
          <div className="flex items-center">
            <Button type="submit">Create demo project</Button>
          </div>
        </form>
        <div className="flex flex-wrap gap-3">
          <ConfirmationDialog
            trigger="Confirm deployment"
            title="Deploy this project?"
            description="This demo shows the confirmation pattern. No deployment will be created."
            confirmLabel="Deploy demo"
            onConfirm={() => {
              toast.success("Demo deployment confirmed");
            }}
          />
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>Open details drawer</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Deployment details</SheetTitle>
                <SheetDescription>
                  Information for the selected demonstration deployment.
                </SheetDescription>
              </SheetHeader>
              <dl className="space-y-4 p-4">
                <div>
                  <dt className="text-xs text-muted-foreground">Project</dt>
                  <dd>cloudforge-web</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Commit</dt>
                  <dd className="font-mono text-sm">8c1f3a2</dd>
                </div>
                <div>
                  <dt className="mb-2 text-xs text-muted-foreground">Status</dt>
                  <dd>
                    <StatusIndicator status="ready" />
                  </dd>
                </div>
              </dl>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-wrap gap-3">
          {(["building", "ready", "failed", "queued"] as const).map((status) => (
            <StatusIndicator key={status} status={status} />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <EmptyState
            action={<Button onClick={() => search.current?.focus()}>Find a project below</Button>}
          />
          <div className="space-y-4">
            <LoadingCard />
            <Spinner label="Fetching deployments" />
            <Progress value={64} aria-label="Demo build progress" />
            <p className="text-xs text-muted-foreground">Build progress · 64%</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Deployment ready", { description: "Your project is available." })
            }
          >
            Success toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Build failed", { description: "Review the build logs and retry." })
            }
          >
            Error toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Usage is approaching your plan limit")}
          >
            Warning toast
          </Button>
        </div>
      </Section>
      <Section id="table" title="03 / Tables & environments">
        <EnvironmentSelector value={environment} onChange={setEnvironment} />
        <DataTable
          rows={rows.filter((row) => row.environment === environment)}
          columns={columns}
          rowKey={(row) => row.id}
          caption={`${environment} deployments`}
          actions={(row) => (
            <ConfirmationDialog
              trigger={`Remove ${row.project}`}
              title={`Remove ${row.project}?`}
              description="This only removes the row from the local demonstration table. Refresh to restore it."
              confirmLabel="Remove"
              destructive
              onConfirm={() => {
                setRows((previous) => previous.filter((item) => item.id !== row.id));
                toast.success("Demo row removed");
              }}
            />
          )}
        />
      </Section>
      <Section id="platform" title="04 / Developer platform essentials">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Requests",
              value: "124.8K",
              detail: "Last 24 hours",
              points: [12, 18, 14, 26, 22, 36, 42],
            },
            {
              label: "Build time",
              value: "42s",
              detail: "Last 7 builds · seconds",
              points: [68, 52, 60, 49, 46, 38, 42],
            },
            {
              label: "Bandwidth",
              value: "8.2 GB",
              detail: "Last 7 days",
              points: [2, 3, 2, 5, 4, 7, 8.2],
            },
            {
              label: "Response time",
              value: "84ms",
              detail: "p95 · last 7 hours",
              points: [120, 104, 90, 98, 76, 88, 84],
            },
          ].map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Log streaming</h3>
          <Button variant="outline" onClick={() => setStreaming(!streaming)}>
            {streaming ? "Stop demo stream" : "Start demo stream"}
          </Button>
        </div>
        <LogViewer entries={logs} streaming={streaming} />
        <div className="rounded-xl border bg-card p-6">
          <DeploymentTimeline
            stages={[
              { name: "Commit", detail: "8c1f3a2 · Update navigation", state: "complete" },
              { name: "Build", detail: "Compiled successfully in 42s", state: "complete" },
              { name: "Deploy", detail: "Uploading assets to edge network", state: "active" },
              { name: "Release", detail: "Waiting for deployment to complete", state: "pending" },
            ]}
          />
        </div>
      </Section>
      <Section id="accessibility" title="05 / Keyboard & accessibility">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label htmlFor="shortcut-search" className="font-medium">
              Keyboard search demo
            </label>
            <Input ref={search} id="shortcut-search" placeholder="Press / to focus this field" />
            <p className="text-xs text-muted-foreground">
              ⌘K / Ctrl+K opens workspace search. Press D outside a text field to trigger the demo
              action. Escape closes dialogs and drawers. Tab moves through controls.
            </p>
          </div>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>Visible focus indicators and semantic labels</li>
            <li>Status text accompanies every status color</li>
            <li>Dialogs trap focus and restore it on close</li>
            <li>Reduced-motion preferences are respected</li>
            <li>Charts include text descriptions of their values</li>
            <li>Live logs do not announce every line to screen readers</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
