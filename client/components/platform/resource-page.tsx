"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Settings2,
  Trash2,
  Upload,
  GitBranch,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { sectionConfigs, type Resource } from "@/lib/workspace-data";
import { useWorkspace } from "./workspace-provider";
import {
  WorkspaceHeading,
  Summary,
  Panel,
  StateBadge,
  PreviewNote,
  LoadingWorkspace,
} from "./workspace-ui";
import { DataTable, type Column } from "./data-table";
import { EmptyState } from "./states";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function ResourcePage({ section }: { section: string }) {
  const config = sectionConfigs[section];
  const { resources, save, ready } = useWorkspace();
  const rows = resources[section] || [];
  const [environment, setEnvironment] = useState("All");
  const [create, setCreate] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [selected, setSelected] = useState<Resource | null>(null);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<Record<string, string[]>>({});
  const isEnv = section === "environment-variables";
  const filtered =
    environment === "All" ? rows : rows.filter((row) => row.environment === environment);
  const active = rows.filter(
    (row) =>
      !["Failed", "Paused", "Stopped", "Pending", "Invited", "Triggered"].includes(row.status),
  ).length;
  function update(row: Resource, changes: Partial<Resource>) {
    const next = { ...row, ...changes, updated: "Just now" };
    save(
      section,
      rows.map((item) => (item.id === row.id ? next : item)),
    );
    setSelected(next);
  }
  function openCreate() {
    setEditing(null);
    setError("");
    setCreate(true);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const values = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value).trim()]),
    );
    const name =
      section === "deployments" ? `${values.project}-${Date.now().toString(36)}` : values.name;
    if (!name) return;
    if (
      rows.some(
        (row) =>
          row.id !== editing?.id &&
          row.name === name &&
          (!isEnv || (row.project === values.project && row.environment === values.environment)),
      )
    ) {
      setError(`A ${config.singular} with this name already exists.`);
      return;
    }
    if (section === "projects" && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
      setError("Use lowercase letters, numbers, and hyphens.");
      return;
    }
    if (
      section === "domains-routing" &&
      !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(name)
    ) {
      setError("Enter a valid hostname, such as app.example.com.");
      return;
    }
    if (isEnv && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      setError(
        "Variable names must start with a letter or underscore and contain only letters, numbers, and underscores.",
      );
      return;
    }
    if (section === "cron-jobs" && !/^([\d*/,-]+\s+){4}[\d*/,-]+$/.test(values.detail)) {
      setError("Use a five-field cron expression, such as 0 2 * * *.");
      return;
    }
    const status =
      editing?.status ||
      {
        projects: "Draft",
        deployments: "Queued",
        "git-repositories": "Connected",
        "domains-routing": "Pending",
        "environment-variables": "Configured",
        storage: "Private",
        "compute-services": "Stopped",
        "cron-jobs": "Active",
        functions: "Ready",
        alerts: "Enabled",
        "team-members": "Invited",
      }[section] ||
      "Active";
    const next: Resource = {
      id: editing?.id || `${section}-${Date.now().toString(36)}`,
      name,
      project: values.project || "portfolio",
      environment: values.environment || "Production",
      status,
      repository: values.repository || editing?.repository,
      detail:
        (section === "projects" ? `${name}.example.com` : values.detail) ||
        (section === "domains-routing"
          ? "CNAME → cname.cloudforge.example"
          : isEnv
            ? "Masked"
            : section === "storage"
              ? "0 B · 0 objects"
              : "—"),
      updated: "Just now",
      ...(isEnv ? { value: values.value } : {}),
    };
    save(
      section,
      editing ? rows.map((row) => (row.id === editing.id ? next : row)) : [next, ...rows],
    );
    if (section === "projects" && editing && editing.name !== name) {
      for (const [key, collection] of Object.entries(resources)) {
        if (key !== "projects" && key !== "team-members")
          save(
            key,
            collection.map((item) =>
              item.project === editing.name ? { ...item, project: name } : item,
            ),
          );
      }
    }
    setCreate(false);
    setSelected(null);
    toast.success(editing ? `${config.singular} updated` : `${config.singular} added`, {
      description: "Saved to this browser's preview workspace.",
    });
  }
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Unable to copy. Please select and copy the text.");
    }
  }
  const columns: Column<Resource>[] = [
    {
      key: "name",
      label: config.columns[0],
      value: (row) => row.name,
      render: (row) => (
        <div
          className={[
            "resource-name [&]:flex [&]:items-center [&]:gap-2.5 [&_small]:block [&_small]:mt-1",
            "[&_small]:text-[10px] [&_small]:[color:var(--muted-foreground)]",
          ].join(" ")}
        >
          <span
            className={[
              "resource-monogram [&]:grid [&]:place-items-center [&]:w-8 [&]:h-8",
              "[&]:[border:1px_solid_var(--border)] [&]:rounded-[8px] [&]:[background:var(--muted)]",
              "[&]:text-[17px] [&]:[color:var(--foreground)] [&]:shrink-0",
            ].join(" ")}
          >
            {row.name.replace(/^\//, "")[0]?.toUpperCase()}
          </span>
          <div>
            {section === "projects" || section === "deployments" ? (
              <Link
                href={`/dashboard/${section}/${encodeURIComponent(row.id)}`}
                className={[
                  "resource-title [&]:text-[12px] [&]:[color:var(--foreground)] [&]:font-medium",
                  "[&]:cursor-pointer [&:hover]:[text-decoration:underline] [&:hover]:underline-offset-4",
                ].join(" ")}
              >
                {row.name}
              </Link>
            ) : (
              <button
                className={[
                  "resource-title [&]:text-[12px] [&]:[color:var(--foreground)] [&]:font-medium",
                  "[&]:cursor-pointer [&:hover]:[text-decoration:underline] [&:hover]:underline-offset-4",
                  "text-left",
                ].join(" ")}
                onClick={() => setSelected(row)}
              >
                {row.name}
              </button>
            )}
            <small>{section === "team-members" ? "Workspace member" : row.environment}</small>
          </div>
        </div>
      ),
    },
    { key: "project", label: config.columns[1], value: (row) => row.project },
    {
      key: "detail",
      label: config.columns[2],
      value: (row) => (isEnv ? "Masked" : row.detail),
      render: (row) =>
        isEnv ? (
          <div className="inline-flex items-center gap-2">
            <code>{revealed.includes(row.id) ? row.value : "••••••••••••"}</code>
            <Button
              size="icon-xs"
              variant="ghost"
              aria-label={`${revealed.includes(row.id) ? "Hide" : "Reveal"} ${row.name}`}
              onClick={() =>
                setRevealed((previous) =>
                  previous.includes(row.id)
                    ? previous.filter((id) => id !== row.id)
                    : [...previous, row.id],
                )
              }
            >
              {revealed.includes(row.id) ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        ) : (
          <span className={section === "cron-jobs" ? "font-mono text-xs" : ""}>{row.detail}</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      value: (row) => row.status,
      render: (row) => <StateBadge status={row.status} />,
    },
  ];
  if (!ready) return <LoadingWorkspace />;
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
      key={section}
    >
      <WorkspaceHeading
        {...config}
        action={
          <Button onClick={openCreate}>
            <Plus />
            {config.action}
          </Button>
        }
      />
      <Summary
        items={[
          {
            label: `Total ${config.title.toLowerCase()}`,
            value: rows.length,
            detail: "Across your workspace",
          },
          {
            label: section === "team-members" ? "Active members" : "Active & available",
            value: active,
            detail:
              section === "team-members" ? "With workspace access" : "Configured and ready to use",
          },
          {
            label: section === "team-members" ? "Pending invitations" : "Needs attention",
            value: rows.length - active,
            detail:
              section === "team-members" ? "Waiting to join" : "Review pending or inactive items",
          },
        ]}
      />
      {section === "git-repositories" && (
        <Panel
          title="Source control, connected"
          description="Push to your default branch to trigger a deployment in a connected production workspace."
          action={
            <Badge variant="outline">
              <GitBranch className="size-3" />
              GitHub · Demo
            </Badge>
          }
        >
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-md border px-3 py-2">Automatic deployments</span>
            <span className="rounded-md border px-3 py-2">Branch previews</span>
            <span className="rounded-md border px-3 py-2">Commit checks</span>
          </div>
        </Panel>
      )}
      {section === "domains-routing" && (
        <div
          className={[
            "workspace-callout [&]:flex [&]:items-center [&]:gap-4 [&]:p-[18px_20px]",
            "[&]:[background:var(--muted)] [&]:[border:1px_solid_var(--border)]",
            "[&]:[border-radius:var(--radius-card)] [&_strong]:text-[12px] [&_strong]:font-medium",
            "[&_p]:[color:var(--muted-foreground)] [&_p]:text-[12px] [&_p]:mt-1",
            "[&_p]:leading-[1.7]",
          ].join(" ")}
        >
          <span className="callout-icon">
            <Settings2 className="size-4" />
          </span>
          <div>
            <strong>A custom domain in a few steps</strong>
            <p>
              Add your domain, configure the displayed DNS record with your provider, then verify
              the connection.
            </p>
          </div>
        </div>
      )}
      {section === "environment-variables" && (
        <div
          className={[
            "workspace-callout [&]:flex [&]:items-center [&]:gap-4 [&]:p-[18px_20px]",
            "[&]:[background:var(--muted)] [&]:[border:1px_solid_var(--border)]",
            "[&]:[border-radius:var(--radius-card)] [&_strong]:text-[12px] [&_strong]:font-medium",
            "[&_p]:[color:var(--muted-foreground)] [&_p]:text-[12px] [&_p]:mt-1",
            "[&_p]:leading-[1.7]",
          ].join(" ")}
        >
          <EyeOff className="size-4 shrink-0" />
          <div>
            <strong>Configuration, scoped to the right environment</strong>
            <p>
              Use non-sensitive sample values here. Values are stored locally and are not encrypted.
            </p>
          </div>
        </div>
      )}
      <Panel
        title={config.title}
        description={
          section === "team-members"
            ? "Manage access and invitations for your team."
            : "Select an item to view details and available actions."
        }
      >
        {!["team-members", "git-repositories", "alerts", "storage"].includes(section) && (
          <Tabs
            value={environment}
            onValueChange={(value) => setEnvironment(String(value))}
            className="mb-5"
          >
            <TabsList variant="line">
              {["All", "Production", "Preview", "Development"].map((value) => (
                <TabsTrigger value={value} key={value}>
                  {value}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        {rows.length === 0 ? (
          <EmptyState
            title={`No ${config.title.toLowerCase()} yet`}
            description={`Add your first ${config.singular} to get started.`}
            action={<Button onClick={openCreate}>{config.action}</Button>}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={`No ${config.title.toLowerCase()} in ${environment.toLowerCase()}`}
            description="Choose another environment or view all resources."
            action={
              <Button variant="outline" onClick={() => setEnvironment("All")}>
                View all environments
              </Button>
            }
          />
        ) : (
          <DataTable
            rows={filtered}
            columns={columns}
            rowKey={(row) => row.id}
            caption={config.title}
            pageSize={6}
            actions={(row) => (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Manage ${row.name}`}
                onClick={() => setSelected(row)}
              >
                <Settings2 />
              </Button>
            )}
          />
        )}
      </Panel>
      <PreviewNote>{config.note}</PreviewNote>
      <Dialog open={create} onOpenChange={setCreate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${config.singular}` : config.action}</DialogTitle>
            <DialogDescription>
              Configure this {config.singular} in your local preview workspace.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={submit}
            className={"workspace-form [&]:flex [&]:flex-col [&]:gap-5"}
            key={editing?.id || "new"}
          >
            {config.fields.map((field) => (
              <div className={"field-group [&]:flex [&]:flex-col [&]:gap-2"} key={field.key}>
                <Label htmlFor={`resource-${field.key}`}>{field.label}</Label>
                {field.options ? (
                  <select
                    className={[
                      "workspace-select [&]:min-h-8 [&]:p-[6px_12px] [&]:[border:1px_solid_var(--input)]",
                      "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--card)] [&]:[color:var(--foreground)]",
                      "[&]:font-[inherit] [&]:text-[12px] [&]:max-w-full",
                    ].join(" ")}
                    id={`resource-${field.key}`}
                    name={field.key}
                    defaultValue={editing?.[field.key as keyof Resource] || field.options[0]}
                  >
                    {(field.key === "project" && !["projects", "team-members"].includes(section)
                      ? resources.projects.map((row) => row.name)
                      : field.options
                    ).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={`resource-${field.key}`}
                    name={field.key}
                    type={field.type || "text"}
                    required
                    placeholder={field.placeholder}
                    defaultValue={editing?.[field.key as keyof Resource] || ""}
                    autoComplete={field.type === "password" ? "off" : undefined}
                    aria-describedby={field.hint ? `hint-${field.key}` : undefined}
                  />
                )}
                {field.hint && (
                  <p
                    id={`hint-${field.key}`}
                    className={
                      "field-hint [&]:text-[11px] [&]:leading-[1.6] [&]:[color:var(--muted-foreground)]"
                    }
                  >
                    {field.hint}
                  </p>
                )}
              </div>
            ))}
            {error && (
              <p role="alert" className="text-xs text-destructive">
                {error}
              </p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreate(false)}>
                Cancel
              </Button>
              <Button type="submit">{editing ? "Save changes" : config.action}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <SheetContent className={"resource-drawer [&]:max-w-110 overflow-y-auto sm:max-w-md"}>
          <SheetHeader>
            <SheetTitle>{selected?.name}</SheetTitle>
            <SheetDescription>{config.singular} details and configuration</SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="space-y-6 px-4 pb-6">
              <StateBadge status={selected.status} />
              <dl
                className={[
                  "resource-details [&]:text-[12px] [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:gap-6",
                  "[&_>_div]:p-[14px_0] [&_>_div]:[border-bottom:1px_solid_var(--border-subtle)]",
                  "[&_dt]:[color:var(--muted-foreground)] [&_dt]:shrink-0 [&_dd]:text-right",
                  "[&_dd]:wrap-anywhere [&_dd]:min-w-0",
                ].join(" ")}
              >
                {[
                  [config.columns[1], selected.project],
                  ["Environment", selected.environment],
                  [config.columns[2], isEnv ? "••••••••••••" : selected.detail],
                  ["Last updated", selected.updated],
                  ["Resource ID", selected.id],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {section === "domains-routing" && (
                <div className="rounded-xl border bg-muted/40 p-4">
                  <p className="mb-3 text-xs text-muted-foreground">
                    Add this example record with your DNS provider
                  </p>
                  <code className="block text-xs break-all">
                    CNAME {selected.name} → cname.cloudforge.example
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      update(selected, { status: "Valid" });
                      toast.success("Domain marked valid in preview");
                    }}
                  >
                    Verify in preview
                  </Button>
                </div>
              )}
              {section === "storage" && (
                <div className="space-y-3">
                  <Label htmlFor="bucket-file">Add a file (metadata only)</Label>
                  <Input
                    id="bucket-file"
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setFiles((previous) => ({
                          ...previous,
                          [selected.id]: [
                            ...(previous[selected.id] || []),
                            `${file.name} · ${Math.ceil(file.size / 1024)} KB`,
                          ],
                        }));
                        toast.success("File metadata added to this session");
                      }
                    }}
                  />
                  {(files[selected.id] || []).map((name, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      {name}
                    </p>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    No file content leaves your device.
                  </p>
                </div>
              )}
              {section === "functions" && (
                <div className="space-y-3">
                  <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-xs">
                    <code>{`export default function handler() {\n  return Response.json({ ok: true });\n}`}</code>
                  </pre>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.success("200 OK · 24ms", {
                        description: 'Simulated response: { "ok": true }',
                      })
                    }
                  >
                    <Play />
                    Test invocation
                  </Button>
                </div>
              )}
              {["compute-services", "cron-jobs", "alerts"].includes(section) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const enabled = ["Running", "Active", "Enabled", "Triggered"].includes(
                      selected.status,
                    );
                    update(selected, {
                      status: enabled
                        ? section === "compute-services"
                          ? "Stopped"
                          : "Paused"
                        : section === "compute-services"
                          ? "Running"
                          : section === "alerts"
                            ? "Enabled"
                            : "Active",
                    });
                    toast.success("Preview status updated");
                  }}
                >
                  {["Running", "Active", "Enabled", "Triggered"].includes(selected.status) ? (
                    <Pause />
                  ) : (
                    <Play />
                  )}
                  {["Running", "Active", "Enabled", "Triggered"].includes(selected.status)
                    ? "Pause"
                    : "Activate"}{" "}
                  {config.singular}
                </Button>
              )}
              {section === "cron-jobs" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("Demo run completed", {
                      description: "No remote task was executed.",
                    })
                  }
                >
                  <Play />
                  Run once in preview
                </Button>
              )}
              {section === "git-repositories" && (
                <Button
                  variant="outline"
                  onClick={() => {
                    update(selected, { updated: "Just now" });
                    toast.success("Repository preview refreshed");
                  }}
                >
                  <RefreshCw />
                  Refresh preview
                </Button>
              )}
              {section === "team-members" && selected.status === "Invited" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.info("Invitation remains pending", {
                      description: "This prototype does not send invitation emails.",
                    })
                  }
                >
                  Review invitation
                </Button>
              )}
              <div className="flex flex-wrap gap-2">
                {!(["team-members"].includes(section) && selected.detail === "Owner") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(selected);
                      setError("");
                      setSelected(null);
                      setCreate(true);
                    }}
                  >
                    <Settings2 />
                    Edit {config.singular}
                  </Button>
                )}
                <Button variant="ghost" onClick={() => copy(selected.name)}>
                  <Copy />
                  Copy name
                </Button>
              </div>
              {section === "projects" && (
                <Button render={<Link href={`/dashboard/projects/${selected.id}`} />}>
                  Open project
                  <ArrowUpRight />
                </Button>
              )}
              {!(section === "team-members" && selected.detail === "Owner") && (
                <div className="border-t pt-5">
                  <ConfirmationDialog
                    destructive
                    trigger={
                      <>
                        <Trash2 />
                        Remove {config.singular}
                      </>
                    }
                    title={`Remove ${selected.name}?`}
                    description="This removes the item from your browser's preview workspace. It will not affect a live service."
                    confirmLabel="Remove"
                    onConfirm={() => {
                      save(
                        section,
                        rows.filter((row) => row.id !== selected.id),
                      );
                      if (section === "projects") {
                        for (const [key, collection] of Object.entries(resources)) {
                          if (key !== "projects" && key !== "team-members")
                            save(
                              key,
                              collection.filter((item) => item.project !== selected.name),
                            );
                        }
                      }
                      setSelected(null);
                      toast.success(`${config.singular} removed`);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
