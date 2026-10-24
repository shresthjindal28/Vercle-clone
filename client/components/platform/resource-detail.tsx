"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GitBranch, Globe, Rocket, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "./workspace-provider";
import {
  WorkspaceHeading,
  Summary,
  Panel,
  StateBadge,
  PreviewNote,
  LoadingWorkspace,
} from "./workspace-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable, type Column } from "./data-table";
import type { Resource } from "@/lib/workspace-data";
import { DeploymentTimeline } from "./deployment-timeline";
import { LogViewer } from "./log-viewer";
import { ConfirmationDialog } from "./confirmation-dialog";
import { EmptyState } from "./states";
export function ResourceDetail({ segments }: { segments: string[] }) {
  const { resources, save, ready } = useWorkspace();
  const router = useRouter();
  const deployment = segments[0] === "deployments" || segments[2] === "deployments";
  const id = decodeURIComponent(segments.at(-1) || "");
  const row = deployment
    ? resources.deployments.find((item) => item.id === id || item.detail === id)
    : resources.projects.find((item) => item.id === id || item.name === id);
  const [name, setName] = useState("");
  if (!ready) return <LoadingWorkspace />;
  if (!row)
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
        <EmptyState
          title={deployment ? "Deployment not found" : "Project not found"}
          description="This item may have been removed from the local workspace."
          action={
            <Button
              render={<Link href={`/dashboard/${deployment ? "deployments" : "projects"}`} />}
            >
              Back to {deployment ? "deployments" : "projects"}
            </Button>
          }
        />
      </div>
    );
  function redeploy() {
    if (!row) return;
    const project = deployment ? row.project : row.name;
    const id = Date.now().toString(36);
    save("deployments", [
      {
        id,
        name: `${project}-${id}`,
        project,
        environment: row.environment,
        status: "Queued",
        detail: id,
        updated: "Just now",
      },
      ...resources.deployments,
    ]);
    toast.success("Preview deployment queued", {
      description: "This creates a local record; no remote build runs.",
    });
    router.push(`/dashboard/deployments/${id}`);
  }
  const deployments = resources.deployments.filter((item) => item.project === row.name);
  const columns: Column<Resource>[] = [
    {
      key: "name",
      label: "Deployment",
      value: (item) => item.name,
      render: (item) => (
        <Link
          className={[
            "resource-title [&]:text-[12px] [&]:[color:var(--foreground)] [&]:font-medium",
            "[&]:cursor-pointer [&:hover]:[text-decoration:underline] [&:hover]:underline-offset-4",
          ].join(" ")}
          href={`/dashboard/deployments/${item.id}`}
        >
          {item.name}
        </Link>
      ),
    },
    {
      key: "status",
      label: "Status",
      value: (item) => item.status,
      render: (item) => <StateBadge status={item.status} />,
    },
    { key: "environment", label: "Environment", value: (item) => item.environment },
    { key: "updated", label: "Updated", value: (item) => item.updated },
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
      <Link
        href={`/dashboard/${deployment ? "deployments" : "projects"}`}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground"
      >
        <ArrowLeft className="size-3" />
        All {deployment ? "deployments" : "projects"}
      </Link>
      <WorkspaceHeading
        title={row.name}
        description={
          deployment
            ? `${row.project} · ${row.environment} deployment`
            : `${row.project} application · ${row.environment}`
        }
        group={deployment ? "Deployment details" : "Project overview"}
        action={
          <Button onClick={redeploy}>
            <Rocket />
            {deployment ? "Redeploy" : "Deploy project"}
          </Button>
        }
      />
      {deployment ? (
        <>
          <Summary
            items={[
              {
                label: "Deployment status",
                value: <StateBadge status={row.status} />,
                detail: row.updated,
              },
              { label: "Environment", value: row.environment, detail: "main branch" },
              {
                label: "Commit",
                value: <code className="text-base">{row.detail}</code>,
                detail: `acme/${row.project}`,
              },
            ]}
          />
          <div
            className={[
              "workspace-split [&]:grid [&]:grid-cols-[minmax(0,1.8fr)_minmax(260px,1fr)]",
              "[&]:gap-5 max-[1200px]:[&]:grid-cols-[1fr]",
            ].join(" ")}
          >
            <Panel title="Deployment progress" description="The lifecycle of this preview release.">
              <DeploymentTimeline
                stages={[
                  { name: "Source", detail: `acme/${row.project} · main`, state: "complete" },
                  {
                    name: "Build",
                    detail:
                      row.status === "Failed"
                        ? "Missing environment configuration"
                        : row.status === "Queued"
                          ? "Waiting for a build worker"
                          : "Dependencies installed and compiled",
                    state:
                      row.status === "Failed"
                        ? "failed"
                        : row.status === "Queued"
                          ? "pending"
                          : row.status === "Building"
                            ? "active"
                            : "complete",
                  },
                  {
                    name: "Deploy",
                    detail: "Distribute assets to the edge network",
                    state: row.status === "Ready" ? "complete" : "pending",
                  },
                  {
                    name: "Release",
                    detail: "Assign production domain",
                    state: row.status === "Ready" ? "complete" : "pending",
                  },
                ]}
              />
            </Panel>
            <Panel
              title="Release information"
              description="Configuration used for this deployment."
            >
              <dl
                className={[
                  "resource-details [&]:text-[12px] [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:gap-6",
                  "[&_>_div]:p-[14px_0] [&_>_div]:[border-bottom:1px_solid_var(--border-subtle)]",
                  "[&_dt]:[color:var(--muted-foreground)] [&_dt]:shrink-0 [&_dd]:text-right",
                  "[&_dd]:wrap-anywhere [&_dd]:min-w-0",
                ].join(" ")}
              >
                <div>
                  <dt>Project</dt>
                  <dd>
                    <Link href={`/dashboard/projects/${row.project}`}>
                      {row.project}
                      <ArrowUpRight className="ml-2 inline size-3" />
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt>Branch</dt>
                  <dd>main</dd>
                </div>
                <div>
                  <dt>Region</dt>
                  <dd>Mumbai · bom1</dd>
                </div>
                <div>
                  <dt>Deployment ID</dt>
                  <dd>{row.id}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <ConfirmationDialog
                  trigger={
                    <>
                      <RotateCcw />
                      Mark as preview release
                    </>
                  }
                  title="Promote this preview release?"
                  description="This marks the deployment ready in your local workspace. No live traffic is redirected."
                  confirmLabel="Promote in preview"
                  onConfirm={() => {
                    save(
                      "deployments",
                      resources.deployments.map((item) =>
                        item.id === row.id
                          ? { ...item, status: "Ready", updated: "Just now" }
                          : item,
                      ),
                    );
                    toast.success("Preview release promoted");
                  }}
                />
              </div>
            </Panel>
          </div>
          <Panel
            title="Build output"
            description="Sample log snapshot for this release."
            action={
              <Button variant="outline" size="sm" render={<Link href="/dashboard/build-logs" />}>
                Open build logs
                <ArrowUpRight />
              </Button>
            }
          >
            <LogViewer
              entries={
                row.status === "Queued"
                  ? []
                  : [
                      {
                        id: "1",
                        timestamp: "10:12:01",
                        level: "info",
                        message: `Cloning acme/${row.project} from main`,
                      },
                      {
                        id: "2",
                        timestamp: "10:12:04",
                        level: "info",
                        message: "Installing dependencies…",
                      },
                      {
                        id: "3",
                        timestamp: "10:12:27",
                        level: row.status === "Failed" ? "error" : "info",
                        message:
                          row.status === "Failed"
                            ? "Build failed: missing CONTENT_API_URL"
                            : row.status === "Building"
                              ? "Compiling application…"
                              : "Build completed successfully.",
                      },
                    ]
              }
            />
          </Panel>
        </>
      ) : (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-5">
            <div
              className={[
                "project-preview [&]:grid [&]:grid-cols-[1.5fr_1fr] [&]:[border:1px_solid_var(--border)]",
                "[&]:[border-radius:var(--radius-card)] [&]:overflow-hidden [&]:[background:var(--card)]",
                "max-[768px]:[&]:grid-cols-[1fr]",
              ].join(" ")}
            >
              <div
                className={[
                  "project-preview-art [&]:min-h-65 [&]:flex [&]:justify-center [&]:items-center",
                  "[&]:gap-5 [&]:p-8",
                  "[&]:[background:radial-gradient(ellipse_at_50%_0%,#292929_0,transparent_75%),#101010]",
                  "[&]:[border-right:1px_solid_var(--border)] [&_>_span]:text-[64px] [&_>_span]:font-semibold",
                  "[&_p]:text-[9px] [&_p]:tracking-[2px] [&_p]:[color:var(--muted-foreground)]",
                  "[&_strong]:block [&_strong]:text-[30px] [&_strong]:tracking-[-1px]",
                  "[&_strong]:m-[8px_0] [&_strong]:wrap-anywhere [&_small]:text-[11px]",
                  "[&_small]:[color:var(--muted-foreground)] max-[768px]:[&]:min-h-50",
                  "max-[768px]:[&]:[border-right:0] max-[768px]:[&]:[border-bottom:1px_solid_var(--border)]",
                  "max-[768px]:[&]:p-5 max-[768px]:[&_strong]:text-[24px]",
                ].join(" ")}
              >
                <span>{row.name[0].toUpperCase()}</span>
                <div>
                  <p>YOUR NEXT BIG IDEA</p>
                  <strong>{row.name}</strong>
                  <small>Built with {row.project}. Deployed with CloudForge.</small>
                </div>
              </div>
              <div
                className={[
                  "project-preview-info [&]:p-7 [&_h2]:text-[20px] [&_h2]:font-medium",
                  "[&_h2]:mt-4 [&_p]:[color:var(--muted-foreground)] [&_p]:text-[12px]",
                  "[&_p]:my-2 [&_p]:wrap-anywhere [&_>_span:not([data-slot])]:flex",
                  "[&_>_span:not([data-slot])]:items-center [&_>_span:not([data-slot])]:gap-2",
                  "[&_>_span:not([data-slot])]:text-[12px] [&_>_span:not([data-slot])]:mt-3",
                ].join(" ")}
              >
                <StateBadge status={row.status} />
                <h2>{row.name}</h2>
                <p>{row.detail}</p>
                <span>
                  <GitBranch className="size-3" />
                  main · Production
                </span>
                <span>
                  <Globe className="size-3" />
                  Mumbai · bom1
                </span>
                <p className="mt-4 text-xs">Sample project preview. Domains are illustrative.</p>
              </div>
            </div>
            <Panel
              title="Latest deployments"
              description="Your most recent builds for this project."
            >
              <DataTable
                rows={deployments.slice(0, 3)}
                columns={columns}
                rowKey={(item) => item.id}
                caption="Project deployments"
              />
            </Panel>
            <div
              className={[
                "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
                "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
              ].join(" ")}
            >
              <Panel
                title="Project configuration"
                description="Manage the settings your application depends on."
              >
                <div
                  className={[
                    "project-quick-links [&_a]:flex [&_a]:items-center [&_a]:justify-between [&_a]:p-[14px_0]",
                    [
                      "[&_a]:[border-bottom:1px_solid_var(--border-subtle)] [&_a]:gap-5",
                      "[&_a:last-child]:[border:0]",
                    ].join(" "),
                    "[&_strong]:text-[12px] [&_strong]:font-medium [&_small]:block [&_small]:mt-1",
                    "[&_small]:[color:var(--muted-foreground)] [&_small]:text-[11px]",
                  ].join(" ")}
                >
                  {[
                    [
                      "Environment variables",
                      "Configure runtime and build values",
                      "/dashboard/environment-variables",
                    ],
                    [
                      "Domains & routing",
                      "Connect and verify custom domains",
                      "/dashboard/domains-routing",
                    ],
                    [
                      "Runtime logs",
                      "Understand your running application",
                      "/dashboard/runtime-logs",
                    ],
                  ].map(([title, description, href]) => (
                    <Link key={href} href={href}>
                      <span>
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </span>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  ))}
                </div>
              </Panel>
              <Panel title="Source repository" description="The source of your project.">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <GitBranch className="size-5" />
                  <span className="text-sm">{row.repository || `acme/${row.name}`}</span>
                </div>
                <Button
                  className="mt-4"
                  variant="outline"
                  render={<Link href="/dashboard/git-repositories" />}
                >
                  Manage repositories
                </Button>
              </Panel>
            </div>
          </TabsContent>
          <TabsContent value="deployments">
            <Panel title="All deployments" description="Every local release for this project.">
              <DataTable
                rows={deployments}
                columns={columns}
                rowKey={(item) => item.id}
                caption="All project deployments"
              />
            </Panel>
          </TabsContent>
          <TabsContent value="settings" className="space-y-5">
            <Panel title="General settings" description="Update the name of this local project.">
              <form
                key={row.id}
                className={"workspace-form [&]:flex [&]:flex-col [&]:gap-5 max-w-md"}
                onSubmit={(event) => {
                  event.preventDefault();
                  const next = name.trim();
                  if (resources.projects.some((item) => item.id !== row.id && item.name === next)) {
                    toast.error("A project with that name already exists");
                    return;
                  }
                  save(
                    "projects",
                    resources.projects.map((item) =>
                      item.id === row.id ? { ...item, name: next, updated: "Just now" } : item,
                    ),
                  );
                  for (const [key, collection] of Object.entries(resources)) {
                    if (key !== "projects" && key !== "team-members")
                      save(
                        key,
                        collection.map((item) =>
                          item.project === row.name ? { ...item, project: next } : item,
                        ),
                      );
                  }
                  toast.success("Project updated");
                }}
              >
                <Label htmlFor="detail-project-name">Project name</Label>
                <Input
                  id="detail-project-name"
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  defaultValue={row.name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Button className="w-fit" type="submit" disabled={!name.trim()}>
                  Save changes
                </Button>
              </form>
            </Panel>
            <Panel
              title="Remove project"
              description="Remove this project and its related resources from the local preview."
            >
              <ConfirmationDialog
                trigger="Remove project"
                destructive
                title={`Remove ${row.name}?`}
                description="The project and its related resources will be removed from this browser. No live resources are affected."
                onConfirm={() => {
                  save(
                    "projects",
                    resources.projects.filter((item) => item.id !== row.id),
                  );
                  for (const [key, collection] of Object.entries(resources)) {
                    if (key !== "projects" && key !== "team-members")
                      save(
                        key,
                        collection.filter((item) => item.project !== row.name),
                      );
                  }
                  router.push("/dashboard/projects");
                  toast.success("Project removed");
                }}
              />
            </Panel>
          </TabsContent>
        </Tabs>
      )}
      <PreviewNote>
        Project details, builds, and release actions are local previews. No live application is
        modified.
      </PreviewNote>
    </div>
  );
}
