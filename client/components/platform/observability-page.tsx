"use client";
import { chartHeightClass } from "@/lib/chart-classes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Pause, Play, RefreshCw, ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import { sectionDescriptions } from "@/lib/workspace-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useWorkspace } from "./workspace-provider";
import { WorkspaceHeading, Summary, Panel, StateBadge, PreviewNote } from "./workspace-ui";
import { LogViewer, type LogEntry } from "./log-viewer";
import { DeploymentTimeline } from "./deployment-timeline";
import { DataTable, type Column } from "./data-table";
import type { Resource } from "@/lib/workspace-data";

const points = [
  24, 32, 28, 36, 45, 40, 34, 26, 30, 35, 43, 38, 50, 46, 42, 34, 37, 48, 55, 50, 44, 52, 58, 54,
  62, 56, 60, 48,
];
export function WorkspaceChart({
  title,
  description,
  metric,
  period = "7",
  variant = "bar",
}: {
  title: string;
  description: string;
  metric: string;
  period?: string;
  variant?: "bar" | "line";
}) {
  const values = points.map((point, index) =>
    Math.round(point * (period === "30" ? 1.3 : period === "90" ? 1.7 : 1) + (index % 3) * 3),
  );
  return (
    <Panel title={title} description={description}>
      <div
        className={[
          "chart-headline [&]:flex [&]:flex-wrap [&]:items-center [&]:gap-4 [&_strong]:text-[27px]",
          "[&_strong]:font-[550] [&_strong]:tracking-[-0.8px]",
          "[&_span]:[color:var(--muted-foreground)] [&_span]:text-[11px]",
        ].join(" ")}
      >
        <strong>{metric}</strong>
        <span>Last {period} days · Sample data</span>
      </div>
      {variant === "bar" ? (
        <div
          className={[
            "workspace-bar-chart [&]:h-50 [&]:relative [&]:flex [&]:[align-items:end] [&]:gap-1.5",
            "[&]:[border-bottom:1px_solid_var(--border-strong)] [&]:m-[24px_0_12px] [&_>_span]:flex-1",
            "[&_>_span]:min-w-0.5 [&_>_span]:[background:linear-gradient(to_top,#444,#ddd)]",
            "[&_>_span]:rounded-[3px_3px_0_0] [&_>_span]:z-1",
            "[&_>_span:hover]:[background:var(--foreground)] max-[768px]:[&]:gap-0.75",
            "max-[768px]:[&]:h-40",
          ].join(" ")}
          role="img"
          aria-label={`${title}, sample trend values: ${values.join(", ")}`}
        >
          <div
            className={[
              "workspace-chart-grid [&]:absolute [&]:inset-0",
              [
                "[&]:[background:repeating-linear-gradient(to_top,transparent_0,transparent_calc(25%-1px),var(--border)_25%)]",
              ].join(" "),
            ].join(" ")}
          />
          {values.map((point, index) => (
            <span
              key={index}
              className={chartHeightClass((point / 110) * 100)}
              title={`Day ${index + 1}: ${point}`}
            />
          ))}
        </div>
      ) : (
        <svg
          viewBox="0 0 600 160"
          role="img"
          aria-label={`${title}, sample trend values: ${values.join(", ")}`}
          className={"workspace-line-chart [&]:w-full [&]:h-50 [&]:m-[20px_0_12px]"}
          preserveAspectRatio="none"
        >
          <path
            d="M0 40 H600 M0 80 H600 M0 120 H600"
            stroke="var(--border)"
            strokeDasharray="3 5"
          />
          <polyline
            points={values
              .map((value, index) => `${(index / (values.length - 1)) * 600},${150 - value}`)
              .join(" ")}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{period} days ago</span>
        <span>Today</span>
      </div>
    </Panel>
  );
}
export function ObservabilityPage({ section }: { section: string }) {
  const config = sectionDescriptions[section];
  const { resources } = useWorkspace();
  const [period, setPeriod] = useState("7");
  const [project, setProject] = useState("All projects");
  const [live, setLive] = useState(false);
  const [level, setLevel] = useState("all");
  const [query, setQuery] = useState("");
  const [historyTab, setHistoryTab] = useState("All");
  const [liveEntries, setLiveEntries] = useState<LogEntry[]>([]);
  const [refreshed, setRefreshed] = useState(false);
  useEffect(() => {
    if (!live) return;
    const interval = window.setInterval(() => {
      const now = new Date();
      setLiveEntries((previous) => [
        ...previous.slice(-79),
        {
          id: String(now.getTime()),
          timestamp: now.toISOString().slice(11, 19),
          level: "info",
          message: `${project === "All projects" ? "portfolio" : project}  GET /api/health  200  12ms (simulated)`,
        },
      ]);
    }, 1800);
    return () => window.clearInterval(interval);
  }, [live, project]);
  const filterControls = (
    <div className="flex flex-wrap gap-2">
      <select
        className={[
          "workspace-select [&]:min-h-8 [&]:p-[6px_12px] [&]:[border:1px_solid_var(--input)]",
          "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--card)] [&]:[color:var(--foreground)]",
          "[&]:font-[inherit] [&]:text-[12px] [&]:max-w-full",
        ].join(" ")}
        aria-label="Filter project"
        value={project}
        onChange={(event) => {
          setProject(event.target.value);
          setLiveEntries([]);
          setQuery("");
        }}
      >
        <option>All projects</option>
        {resources.projects.map((row) => (
          <option key={row.id}>{row.name}</option>
        ))}
      </select>
      <select
        className={[
          "workspace-select [&]:min-h-8 [&]:p-[6px_12px] [&]:[border:1px_solid_var(--input)]",
          "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--card)] [&]:[color:var(--foreground)]",
          "[&]:font-[inherit] [&]:text-[12px] [&]:max-w-full",
        ].join(" ")}
        aria-label="Reporting period"
        value={period}
        onChange={(event) => setPeriod(event.target.value)}
      >
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
      </select>
    </div>
  );
  const deploymentRows = resources.deployments.filter(
    (row) =>
      (project === "All projects" || row.project === project) &&
      (historyTab === "All" || row.status === historyTab),
  );
  if (section === "build-logs" || section === "runtime-logs") {
    const build = section === "build-logs";
    const base: LogEntry[] = build
      ? [
          {
            id: "b1",
            timestamp: "10:12:01",
            level: "info",
            message: `Cloning acme/${project === "All projects" ? "portfolio" : project} (branch: main)`,
          },
          {
            id: "b2",
            timestamp: "10:12:03",
            level: "info",
            message: "Installing dependencies with npm ci…",
          },
          {
            id: "b3",
            timestamp: "10:12:12",
            level: "info",
            message: "Detected Next.js · Running production build",
          },
          {
            id: "b4",
            timestamp: "10:12:24",
            level: project === "blog" ? "error" : "info",
            message:
              project === "blog"
                ? "Build failed: missing CONTENT_API_URL environment variable"
                : "Compiled successfully. Checking types…",
          },
          {
            id: "b5",
            timestamp: "10:12:27",
            level: project === "blog" ? "error" : "info",
            message:
              project === "blog"
                ? "Exit code 1. Add the variable and redeploy."
                : "Generated static pages. Build completed in 26s.",
          },
        ]
      : [
          {
            id: "r1",
            timestamp: "10:12:01",
            level: "info" as const,
            message: "portfolio  GET /  200  42ms",
          },
          {
            id: "r2",
            timestamp: "10:12:02",
            level: "info" as const,
            message: "ecommerce  POST /api/checkout  200  128ms",
          },
          {
            id: "r3",
            timestamp: "10:12:04",
            level: "warning" as const,
            message: "api-service  Connection pool approaching limit: 18/20",
          },
          {
            id: "r4",
            timestamp: "10:12:06",
            level: "error" as const,
            message: "blog  GET /api/posts  500  Missing CONTENT_API_URL",
          },
          {
            id: "r5",
            timestamp: "10:12:08",
            level: "info" as const,
            message: "docs  GET /getting-started  200  18ms",
          },
        ].filter((entry) => project === "All projects" || entry.message.startsWith(project));
    const all = [...base, ...liveEntries];
    const entries = all.filter(
      (entry) =>
        (level === "all" || entry.level === level) &&
        entry.message.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <div
        className={[
          "workspace-page [&]:[--card:#090909] [&]:[--card-foreground:var(--foreground)] [&]:flex [&]:flex-col",
          '[&]:gap-6 [&]:min-w-0 **:data-[slot="button"]:text-[12px]',
          '**:data-[slot="button"]:gap-2 **:data-[slot="button"]:min-h-8',
          'max-[768px]:[&]:gap-5 max-[768px]:**:data-[slot="tabs-list"]:max-w-full',
          'max-[768px]:**:data-[slot="tabs-list"]:overflow-x-auto',
          'max-[768px]:**:data-[slot="tabs-list"]:justify-start',
          'max-[768px]:**:data-[slot="tabs-trigger"]:text-[12px]',
          'max-[768px]:**:data-[slot="tabs-trigger"]:px-2',
          "[&_.dashboard-card]:[background:var(--card)] [&_.dashboard-card]:[border:1px_solid_var(--border)]",
          "[&_.dashboard-card]:[box-shadow:var(--shadow-sm)] [&_.dashboard-card]:[--card-spacing:20px]",
        ].join(" ")}
      >
        <WorkspaceHeading
          {...config}
          action={
            <Button
              variant="outline"
              onClick={() => {
                const blob = new Blob(
                  [
                    entries
                      .map((entry) => `${entry.timestamp} [${entry.level}] ${entry.message}`)
                      .join("\n"),
                  ],
                  { type: "text/plain" },
                );
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `cloudforge-${section}.txt`;
                link.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                toast.success("Log export downloaded");
              }}
            >
              <Download />
              Export logs
            </Button>
          }
        />
        <div
          className={[
            "workspace-toolbar [&]:flex [&]:items-center [&]:justify-between [&]:gap-3 [&]:flex-wrap",
            "max-[768px]:[&_>_div]:w-full max-[768px]:[&_select]:flex-1",
            "max-[768px]:[&_select]:min-w-0",
          ].join(" ")}
        >
          {filterControls}
          <Button variant={live ? "secondary" : "outline"} onClick={() => setLive(!live)}>
            {live ? <Pause /> : <Play />}
            {live ? "Pause stream" : "Start demo stream"}
          </Button>
        </div>
        {build && (
          <Panel
            title={project === "blog" ? "Build failed" : "Build completed"}
            description={`${project === "All projects" ? "portfolio" : project} · main · a1b2c3d`}
            action={<StateBadge status={project === "blog" ? "Failed" : "Ready"} />}
          >
            <div
              className={[
                "build-stages [&]:grid [&]:grid-cols-4 [&]:gap-4",
                "[&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-2 [&_>_span]:text-[12px]",
                "[&_small]:ml-auto [&_small]:text-[11px] [&_small]:[color:var(--muted-foreground)]",
                "max-[768px]:[&]:grid-cols-2",
              ].join(" ")}
            >
              {["Clone", "Install", "Build", "Deploy"].map((stage, index) => (
                <span key={stage}>
                  {project === "blog" && index >= 2 ? (
                    <span aria-hidden="true">{index === 2 ? "×" : "○"}</span>
                  ) : (
                    <Check className="size-3" />
                  )}
                  {stage}
                  <small>
                    {project === "blog" && index >= 2
                      ? index === 2
                        ? "Failed"
                        : "Skipped"
                      : ["2s", "9s", "15s", "< 1s"][index]}
                  </small>
                </span>
              ))}
            </div>
          </Panel>
        )}
        <Panel
          title={build ? "Build output" : "Application output"}
          description="Timestamped logs with level filtering and text search."
        >
          <div className="mb-5 flex flex-wrap gap-3">
            <Input
              aria-label="Search logs"
              placeholder="Search messages…"
              className="max-w-sm"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              className={[
                "workspace-select [&]:min-h-8 [&]:p-[6px_12px] [&]:[border:1px_solid_var(--input)]",
                "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--card)] [&]:[color:var(--foreground)]",
                "[&]:font-[inherit] [&]:text-[12px] [&]:max-w-full",
              ].join(" ")}
              aria-label="Log level"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            >
              <option value="all">All levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <span className="ml-auto self-center text-xs text-muted-foreground">
              {entries.length} entries
            </span>
          </div>
          <LogViewer entries={entries} streaming={live} />
        </Panel>
        <PreviewNote>
          Logs and optional streaming are simulated. Export downloads only the currently filtered
          entries.
        </PreviewNote>
      </div>
    );
  }
  if (section === "deployment-history") {
    const historyColumns: Column<Resource>[] = [
      {
        key: "name",
        label: "Deployment",
        value: (row) => row.name,
        render: (row) => (
          <Link
            className={[
              "resource-title [&]:text-[12px] [&]:[color:var(--foreground)] [&]:font-medium",
              "[&]:cursor-pointer [&:hover]:[text-decoration:underline] [&:hover]:underline-offset-4",
            ].join(" ")}
            href={`/dashboard/deployments/${row.id}`}
          >
            {row.name}
          </Link>
        ),
      },
      { key: "project", label: "Project", value: (row) => row.project },
      {
        key: "commit",
        label: "Commit",
        value: (row) => row.detail,
        render: (row) => <code>{row.detail}</code>,
      },
      {
        key: "status",
        label: "Result",
        value: (row) => row.status,
        render: (row) => <StateBadge status={row.status} />,
      },
      { key: "updated", label: "When", value: (row) => row.updated },
    ];
    return (
      <div
        className={[
          "workspace-page [&]:[--card:#090909] [&]:[--card-foreground:var(--foreground)] [&]:flex [&]:flex-col",
          '[&]:gap-6 [&]:min-w-0 **:data-[slot="button"]:text-[12px]',
          '**:data-[slot="button"]:gap-2 **:data-[slot="button"]:min-h-8',
          'max-[768px]:[&]:gap-5 max-[768px]:**:data-[slot="tabs-list"]:max-w-full',
          'max-[768px]:**:data-[slot="tabs-list"]:overflow-x-auto',
          'max-[768px]:**:data-[slot="tabs-list"]:justify-start',
          'max-[768px]:**:data-[slot="tabs-trigger"]:text-[12px]',
          'max-[768px]:**:data-[slot="tabs-trigger"]:px-2',
          "[&_.dashboard-card]:[background:var(--card)] [&_.dashboard-card]:[border:1px_solid_var(--border)]",
          "[&_.dashboard-card]:[box-shadow:var(--shadow-sm)] [&_.dashboard-card]:[--card-spacing:20px]",
        ].join(" ")}
      >
        <WorkspaceHeading {...config} action={filterControls} />
        <Summary
          items={[
            {
              label: "Total releases",
              value: resources.deployments.length,
              detail: "Across all projects",
            },
            {
              label: "Successful",
              value: resources.deployments.filter((row) => row.status === "Ready").length,
              detail: "Ready deployments",
            },
            {
              label: "Failed",
              value: resources.deployments.filter((row) => row.status === "Failed").length,
              detail: "Review logs before retrying",
            },
          ]}
        />
        <div
          className={[
            "workspace-split [&]:grid [&]:grid-cols-[minmax(0,1.8fr)_minmax(260px,1fr)]",
            "[&]:gap-5 max-[1200px]:[&]:grid-cols-[1fr]",
          ].join(" ")}
        >
          <Panel title="Release history" description="Trace each release back to its source.">
            <Tabs
              value={historyTab}
              onValueChange={(value) => setHistoryTab(String(value))}
              className="mb-5"
            >
              <TabsList variant="line">
                {["All", "Ready", "Failed"].map((value) => (
                  <TabsTrigger key={value} value={value}>
                    {value}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <DataTable
              rows={deploymentRows}
              columns={historyColumns}
              rowKey={(row) => row.id}
              caption="Release history"
            />
          </Panel>
          <Panel title="Latest successful release" description="portfolio · a1b2c3d">
            <DeploymentTimeline
              stages={[
                {
                  name: "Commit pushed",
                  detail: "Update portfolio navigation · main",
                  state: "complete",
                },
                {
                  name: "Build completed",
                  detail: "Dependencies installed and checks passed",
                  state: "complete",
                },
                {
                  name: "Assets deployed",
                  detail: "Available on the edge network",
                  state: "complete",
                },
                {
                  name: "Release promoted",
                  detail: "Production alias assigned",
                  state: "complete",
                },
              ]}
            />
            <Link
              className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground"
              href="/dashboard/deployments/a1b2c3d"
            >
              View release details
              <ArrowUpRight className="size-3" />
            </Link>
          </Panel>
        </div>
        <PreviewNote>Release history shows local demonstration records.</PreviewNote>
      </div>
    );
  }
  const multiplier = Number(period) / 7;
  const projectFactor = project === "All projects" ? 1 : 0.2;
  return (
    <div
      className={[
        "workspace-page [&]:[--card:#090909] [&]:[--card-foreground:var(--foreground)] [&]:flex [&]:flex-col",
        '[&]:gap-6 [&]:min-w-0 **:data-[slot="button"]:text-[12px]',
        '**:data-[slot="button"]:gap-2 **:data-[slot="button"]:min-h-8',
        'max-[768px]:[&]:gap-5 max-[768px]:**:data-[slot="tabs-list"]:max-w-full',
        'max-[768px]:**:data-[slot="tabs-list"]:overflow-x-auto',
        'max-[768px]:**:data-[slot="tabs-list"]:justify-start',
        'max-[768px]:**:data-[slot="tabs-trigger"]:text-[12px]',
        'max-[768px]:**:data-[slot="tabs-trigger"]:px-2',
        "[&_.dashboard-card]:[background:var(--card)] [&_.dashboard-card]:[border:1px_solid_var(--border)]",
        "[&_.dashboard-card]:[box-shadow:var(--shadow-sm)] [&_.dashboard-card]:[--card-spacing:20px]",
      ].join(" ")}
    >
      <WorkspaceHeading {...config} action={filterControls} />
      {section === "monitoring" ? (
        <>
          <div
            className={[
              "workspace-health [&]:flex [&]:items-center [&]:gap-3.5 [&]:[border:1px_solid_var(--border)]",
              "[&]:[border-radius:var(--radius-card)] [&]:p-[18px_20px] [&]:[background:var(--card)]",
              "[&_strong]:text-[13px] [&_strong]:font-medium [&_p]:[color:var(--muted-foreground)]",
              "[&_p]:text-[11px] [&_p]:mt-1 [&_button]:ml-auto max-[768px]:[&]:flex-wrap",
              "max-[768px]:[&_button]:ml-0",
            ].join(" ")}
          >
            <span className="grid size-9 place-items-center rounded-full border">
              <Check className="size-4" />
            </span>
            <div>
              <strong>All systems operational</strong>
              <p>No active incidents in this sample workspace</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setRefreshed(true);
                toast.success("Sample health check refreshed");
              }}
            >
              <RefreshCw />
              {refreshed ? "Just refreshed" : "Refresh"}
            </Button>
          </div>
          <Summary
            items={[
              { label: "Uptime", value: "99.98%", detail: `Last ${period} days` },
              {
                label: "Response time",
                value: project === "api-service" ? "128ms" : "84ms",
                detail: "p95 across selected services",
              },
              { label: "Error rate", value: "0.12%", detail: "Within the 1% threshold" },
            ]}
          />
          <div
            className={[
              "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
              "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
            ].join(" ")}
          >
            <WorkspaceChart
              title="Response time"
              description="p95 latency across your application"
              metric="84 ms"
              period={period}
              variant="line"
            />
            <WorkspaceChart
              title="Request volume"
              description="Requests served by your infrastructure"
              metric={Math.round(1204832 * multiplier * projectFactor).toLocaleString("en-US")}
              period={period}
            />
          </div>
          <Panel
            title="Service health"
            description="Current sample status for your deployed services."
          >
            <div
              className={[
                "health-list [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-6 [&_>_div]:p-[18px_0]",
                "[&_>_div]:[border-bottom:1px_solid_var(--border-subtle)] [&_>_div:last-child]:[border:0]",
                "[&_strong]:text-[12px] [&_strong]:font-medium [&_small]:block",
                "[&_small]:[color:var(--muted-foreground)] [&_small]:text-[11px] [&_small]:mt-1",
                "max-[1200px]:[&_>_div]:gap-3.5 max-[1200px]:[&_>_div]:flex-wrap",
              ].join(" ")}
            >
              {resources["compute-services"]
                .filter((row) => project === "All projects" || row.project === project)
                .map((row) => (
                  <div key={row.id}>
                    <span>
                      <strong>{row.name}</strong>
                      <small>{row.detail}</small>
                    </span>
                    <StateBadge status={row.status} />
                    <div
                      className={[
                        "uptime-bars [&]:mt-3.75 [&]:h-4 [&]:flex [&]:gap-0.75 [&]:flex-1",
                        "[&]:max-w-90 [&]:ml-auto [&_>_span]:[background:linear-gradient(#ccc,#777)]",
                        "[&_>_span]:flex-1 [&_>_span]:min-w-px [&_>_span]:rounded-[1px]",
                        "[&_>_span:nth-child(4n)]:opacity-[0.65] [&_>_span:hover]:[background:#fff]",
                        "[&_>_span:hover]:opacity-[1] [&_i]:h-6 [&_i]:flex-1 [&_i]:rounded-xs",
                        "[&_i]:[background:#aaa] max-[1200px]:[&]:min-w-25",
                      ].join(" ")}
                      aria-label="Sample uptime: 99.98%"
                    >
                      {Array.from({ length: 24 }, (_, index) => (
                        <i key={index} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">99.98%</span>
                  </div>
                ))}
            </div>
          </Panel>
          <Panel
            title="Resource utilization"
            description="Sample utilization for the selected service group."
          >
            <div
              className={[
                "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
                "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
              ].join(" ")}
            >
              {[
                { name: "CPU", value: 42, detail: "4.2 / 10 vCPU" },
                { name: "Memory", value: 28, detail: "7.2 / 25 GB" },
              ].map((item) => (
                <div className="space-y-3" key={item.name}>
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} aria-label={`${item.name} utilization`} />
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
        </>
      ) : (
        <>
          <Summary
            items={[
              {
                label: "Total requests",
                value: (1.2 * multiplier * projectFactor).toFixed(2) + "M",
                detail: "+28% vs previous period · sample",
              },
              {
                label: "Unique visitors",
                value: Math.round(42891 * multiplier * projectFactor).toLocaleString("en-US"),
                detail: "+14% vs previous period · sample",
              },
              {
                label: "Bandwidth",
                value: (48.5 * multiplier * projectFactor).toFixed(1) + " GB",
                detail: "68% static · 22% API · 10% functions",
              },
            ]}
          />
          <WorkspaceChart
            title="Traffic overview"
            description="How your application is being used over time."
            metric={
              Math.round(1204832 * multiplier * projectFactor).toLocaleString("en-US") + " requests"
            }
            period={period}
          />
          <div
            className={[
              "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
              "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
            ].join(" ")}
          >
            <Panel title="Top pages" description="Most visited routes in the selected period.">
              <div
                className={[
                  "ranked-list [&]:flex [&]:flex-col [&]:gap-5 [&_>_div]:grid",
                  "[&_>_div]:grid-cols-[minmax(80px,1fr)_minmax(40px,1fr)_40px] [&_>_div]:items-center",
                  "[&_>_div]:gap-4 [&_>_div]:text-[12px]",
                  "[&_>_div_>_span:last-child]:[color:var(--muted-foreground)] [&_>_div_>_span:last-child]:text-right",
                ].join(" ")}
              >
                {[
                  ["/", "42.8%"],
                  ["/products", "24.1%"],
                  ["/about", "16.4%"],
                  ["/blog", "10.2%"],
                  ["/contact", "6.5%"],
                ].map(([name, value]) => (
                  <div key={name}>
                    <code>{name}</code>
                    <Progress value={parseFloat(value)} aria-label={`${name} traffic share`} />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Visitors by country" description="Where your requests come from.">
              <div
                className={[
                  "ranked-list [&]:flex [&]:flex-col [&]:gap-5 [&_>_div]:grid",
                  "[&_>_div]:grid-cols-[minmax(80px,1fr)_minmax(40px,1fr)_40px] [&_>_div]:items-center",
                  "[&_>_div]:gap-4 [&_>_div]:text-[12px]",
                  "[&_>_div_>_span:last-child]:[color:var(--muted-foreground)] [&_>_div_>_span:last-child]:text-right",
                ].join(" ")}
              >
                {[
                  ["India", "38%"],
                  ["United States", "27%"],
                  ["Germany", "16%"],
                  ["United Kingdom", "12%"],
                  ["Other", "7%"],
                ].map(([name, value]) => (
                  <div key={name}>
                    <span>{name}</span>
                    <Progress value={parseFloat(value)} aria-label={`${name} visitor share`} />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </>
      )}
      <PreviewNote>
        Metrics are illustrative. Period and project filters adjust sample totals; no live telemetry
        is connected.
      </PreviewNote>
    </div>
  );
}
