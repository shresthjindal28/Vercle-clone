"use client";
import { useEffect, useState, type FormEvent } from "react";
import {
  Check,
  Copy,
  CreditCard,
  Download,
  KeyRound,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { sectionConfigs, sectionDescriptions } from "@/lib/workspace-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ConfirmationDialog } from "./confirmation-dialog";
import { WorkspaceHeading, Summary, Panel, StateBadge, PreviewNote } from "./workspace-ui";
import { useWorkspace } from "./workspace-provider";
const defaults = {
  name: "Personal Workspace",
  slug: "personal-workspace",
  region: "Mumbai · bom1",
  buildCommand: "npm run build",
  outputDirectory: ".next",
  autoDeploy: true,
  previewDeploys: true,
  emailAlerts: true,
  buildAlerts: true,
  usageAlerts: true,
  twoFactor: false,
  firewall: true,
  ddos: true,
  budget: "50",
  budgetAlerts: true,
  plan: "Hobby",
  tokens: [] as { id: string; name: string; value: string }[],
};
function usePreferences() {
  const [values, setValues] = useState(defaults);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem("cloudforge-preferences-v1") || "null");
      if (value && typeof value === "object") setValues({ ...defaults, ...value });
    } catch {}
    setReady(true);
  }, []);
  function persist(next: typeof defaults) {
    setValues(next);
    try {
      localStorage.setItem("cloudforge-preferences-v1", JSON.stringify(next));
      window.dispatchEvent(new Event("cloudforge-preferences"));
      toast.success("Preview preferences saved");
    } catch {
      toast.warning("Saved for this session. Browser storage is unavailable.");
    }
  }
  return { values, setValues, persist, ready };
}
function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      className={[
        "setting-row [&]:flex [&]:justify-between [&]:items-center [&]:gap-6 [&]:p-[20px_0]",
        "[&]:[border-bottom:1px_solid_var(--border-subtle)] last:[border:0]",
        "[&_strong]:text-[12px] [&_strong]:font-medium [&_label]:text-[12px]",
        "[&_label]:font-medium [&_p]:text-[11px] [&_p]:[color:var(--muted-foreground)]",
        "[&_p]:leading-[1.7] [&_p]:mt-1.25",
      ].join(" ")}
    >
      <div>
        <Label>{title}</Label>
        <p>{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
    </div>
  );
}
export function OrganizationPage({ section }: { section: string }) {
  const config = sectionDescriptions[section];
  const { values, setValues, persist, ready } = usePreferences();
  const { save } = useWorkspace();
  const [dialog, setDialog] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [createdToken, setCreatedToken] = useState("");
  const [plan, setPlan] = useState("Pro");
  if (!ready)
    return (
      <p role="status" className="py-16 text-muted-foreground">
        Loading preferences…
      </p>
    );
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persist(values);
  }
  if (section === "security")
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
            <Badge variant="outline">
              <ShieldCheck className="size-3" />
              Security overview
            </Badge>
          }
        />
        <div
          className={[
            "workspace-callout [&]:flex [&]:items-center [&]:gap-4 [&]:p-[18px_20px]",
            "[&]:[background:var(--muted)] [&]:[border:1px_solid_var(--border)]",
            "[&]:[border-radius:var(--radius-card)] [&_strong]:text-[12px] [&_strong]:font-medium",
            "[&_p]:[color:var(--muted-foreground)] [&_p]:text-[12px] [&_p]:mt-1",
            "[&_p]:leading-[1.7]",
          ].join(" ")}
        >
          <ShieldCheck className="size-5 shrink-0" />
          <div>
            <strong>A safer workspace starts with the basics</strong>
            <p>Review access, protect your deployments, and keep credentials under control.</p>
          </div>
        </div>
        <Summary
          items={[
            { label: "Protected domains", value: "3 / 3", detail: "Sample TLS coverage" },
            {
              label: "Firewall",
              value: values.firewall ? "Enabled" : "Disabled",
              detail: "Preview preference",
            },
            {
              label: "Access tokens",
              value: values.tokens.length,
              detail: "Demonstration tokens only",
            },
          ]}
        />
        <div
          className={[
            "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
            "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
          ].join(" ")}
        >
          <Panel
            title="Account protection"
            description="Security preferences for this preview workspace."
          >
            <ToggleRow
              title="Two-factor authentication"
              description="Preview the preference for an additional sign-in factor."
              checked={values.twoFactor}
              onChange={(checked) => persist({ ...values, twoFactor: checked })}
            />
            <ToggleRow
              title="Deployment protection"
              description="Require authentication to access preview deployments."
              checked={values.firewall}
              onChange={(checked) => persist({ ...values, firewall: checked })}
            />
            <ToggleRow
              title="DDoS protection"
              description="Filter suspicious traffic at the network edge."
              checked={values.ddos}
              onChange={(checked) => persist({ ...values, ddos: checked })}
            />
            <p className="mt-4 text-xs text-muted-foreground">
              These switches store UI preferences. They do not enforce authentication or network
              protection.
            </p>
          </Panel>
          <Panel title="Security activity" description="Recent sample events from your workspace.">
            <div
              className={[
                "security-events [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-3 [&_>_div]:p-[14px_0]",
                "[&_strong]:text-[12px] [&_strong]:font-medium [&_p]:text-[11px]",
                "[&_p]:[color:var(--muted-foreground)] [&_p]:mt-1.25",
              ].join(" ")}
            >
              {[
                { title: "Successful sign-in", detail: "You · Mumbai, India · 10 minutes ago" },
                { title: "TLS certificate renewed", detail: "portfolio.example.com · 2 hours ago" },
                { title: "Workspace permissions reviewed", detail: "Sarah Chen · Yesterday" },
              ].map((event) => (
                <div key={event.title}>
                  <span
                    className={[
                      "activity-icon [&]:grid [&]:place-items-center [&]:w-8.5 [&]:h-8.5",
                      "[&]:[background:#202020] [&]:[border:1px_solid_#303030] [&]:rounded-[9px] [&]:shrink-0",
                      "[&]:text-[#ccc]",
                    ].join(" ")}
                  >
                    <Check className="size-4" />
                  </span>
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <Panel
          title="Access tokens"
          description="Preview the lifecycle of scoped API access."
          action={
            <Button
              size="sm"
              onClick={() => {
                setCreatedToken("");
                setTokenName("");
                setDialog(true);
              }}
            >
              <Plus />
              Create demo token
            </Button>
          }
        >
          {values.tokens.length === 0 ? (
            <div className="py-8 text-center">
              <KeyRound className="mx-auto mb-3 size-6 text-muted-foreground" />
              <h3 className="text-sm font-medium">No access tokens yet</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Create a sample token to preview token management.
              </p>
            </div>
          ) : (
            values.tokens.map((token) => (
              <div
                className={[
                  "setting-row [&]:flex [&]:justify-between [&]:items-center [&]:gap-6 [&]:p-[20px_0]",
                  "[&]:[border-bottom:1px_solid_var(--border-subtle)] last:[border:0]",
                  "[&_strong]:text-[12px] [&_strong]:font-medium [&_label]:text-[12px]",
                  "[&_label]:font-medium [&_p]:text-[11px] [&_p]:[color:var(--muted-foreground)]",
                  "[&_p]:leading-[1.7] [&_p]:mt-1.25",
                ].join(" ")}
                key={token.id}
              >
                <div>
                  <strong>{token.name}</strong>
                  <p className="font-mono">cf_demo_•••••••• · Read only</p>
                </div>
                <ConfirmationDialog
                  trigger="Revoke"
                  destructive
                  title={`Revoke ${token.name}?`}
                  description="This will remove the demonstration token from your browser."
                  onConfirm={() =>
                    persist({
                      ...values,
                      tokens: values.tokens.filter((item) => item.id !== token.id),
                    })
                  }
                />
              </div>
            ))
          )}
        </Panel>
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{createdToken ? "Demo token created" : "Create demo token"}</DialogTitle>
              <DialogDescription>
                This token is a UI sample and cannot authenticate API requests.
              </DialogDescription>
            </DialogHeader>
            {createdToken ? (
              <div className="space-y-4">
                <code className="block break-all rounded-lg border p-3 text-xs">
                  {createdToken}
                </code>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(createdToken);
                      toast.success("Demo token copied");
                    } catch {
                      toast.error("Unable to copy token");
                    }
                  }}
                >
                  <Copy />
                  Copy sample token
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const value = `cf_demo_${crypto.randomUUID().replaceAll("-", "")}`;
                  persist({
                    ...values,
                    tokens: [
                      ...values.tokens,
                      { id: crypto.randomUUID(), name: tokenName.trim(), value },
                    ],
                  });
                  setCreatedToken(value);
                }}
                className={"workspace-form [&]:flex [&]:flex-col [&]:gap-5"}
              >
                <Label htmlFor="token-name">Token name</Label>
                <Input
                  id="token-name"
                  required
                  value={tokenName}
                  onChange={(event) => setTokenName(event.target.value)}
                  placeholder="Local development"
                />
                <p className="text-xs text-muted-foreground">
                  Scope: Read only · Preview workspace
                </p>
                <Button disabled={!tokenName.trim()} type="submit">
                  Create demo token
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
        <PreviewNote>
          Security controls and events are illustrative. Connect an authentication and
          infrastructure backend to enforce them.
        </PreviewNote>
      </div>
    );
  if (section === "usage-billing")
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
          action={<Button onClick={() => setDialog(true)}>Manage plan</Button>}
        />
        <div
          className={[
            "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
            "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
          ].join(" ")}
        >
          <Panel
            title={`${values.plan} plan`}
            description={
              values.plan === "Hobby"
                ? "Everything you need to start shipping."
                : "More capacity for your growing team."
            }
            action={<Badge variant="outline">Current plan</Badge>}
          >
            <div
              className={[
                "plan-price [&]:flex [&]:items-baseline [&]:gap-2 [&]:text-[36px]",
                "[&]:font-[550] [&]:mb-4.5 [&]:tracking-[-1px]",
                "[&_span]:[color:var(--muted-foreground)] [&_span]:text-[12px] [&_span]:tracking-normal",
                "[&_span]:font-normal",
              ].join(" ")}
            >
              {values.plan === "Hobby" ? "$0" : "$20"}
              <span>/ month</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Preview plan · No payment method connected
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs">
              <span className="inline-flex gap-2">
                <Check className="size-3" />
                Unlimited preview deploys
              </span>
              <span className="inline-flex gap-2">
                <Check className="size-3" />
                Automatic HTTPS
              </span>
            </div>
          </Panel>
          <Panel
            title="Current cycle"
            description="Illustrative usage for the current billing period."
          >
            <div
              className={[
                "plan-price [&]:flex [&]:items-baseline [&]:gap-2 [&]:text-[36px]",
                "[&]:font-[550] [&]:mb-4.5 [&]:tracking-[-1px]",
                "[&_span]:[color:var(--muted-foreground)] [&_span]:text-[12px] [&_span]:tracking-normal",
                "[&_span]:font-normal",
              ].join(" ")}
            >
              $0.00<span>estimated total</span>
            </div>
            <Progress value={18} aria-label="Billing cycle progress" />
            <p className="mt-3 text-xs text-muted-foreground">
              All usage is sample data. No charges are incurred.
            </p>
          </Panel>
        </div>
        <Panel
          title="Resource usage"
          description="Understand how your workspace uses its included capacity."
        >
          <div
            className={[
              "usage-grid [&]:grid [&]:grid-cols-4 [&]:gap-6",
              "max-[1200px]:[&]:grid-cols-2",
            ].join(" ")}
          >
            {[
              { label: "Bandwidth", value: 12, used: "48.5 GB", limit: "400 GB" },
              { label: "Build minutes", value: 34, used: "340 min", limit: "1,000 min" },
              { label: "Storage", value: 68, used: "68 GB", limit: "100 GB" },
              { label: "Function invocations", value: 24, used: "240K", limit: "1M" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-3 flex justify-between gap-3 text-sm">
                  <strong className="font-medium">{item.label}</strong>
                  <span>{item.value}%</span>
                </div>
                <Progress value={item.value} aria-label={`${item.label} usage`} />
                <p className="mt-3 text-xs text-muted-foreground">
                  {item.used} / {item.limit} included
                </p>
              </div>
            ))}
          </div>
        </Panel>
        <div
          className={[
            "workspace-two-col [&]:grid [&]:grid-cols-2 [&]:gap-5",
            "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
          ].join(" ")}
        >
          <Panel
            title="Spend management"
            description="Set a local preview budget and notification preference."
          >
            <form className={"workspace-form [&]:flex [&]:flex-col [&]:gap-5"} onSubmit={submit}>
              <Label htmlFor="budget">Monthly budget (USD)</Label>
              <div className="flex gap-3">
                <Input
                  id="budget"
                  type="number"
                  min="1"
                  max="100000"
                  value={values.budget}
                  onChange={(event) => setValues({ ...values, budget: event.target.value })}
                  required
                />
                <Button type="submit" variant="outline">
                  Save budget
                </Button>
              </div>
              <ToggleRow
                title="Budget notifications"
                description="Preview alerts at 80% and 100% of budget."
                checked={values.budgetAlerts}
                onChange={(checked) => persist({ ...values, budgetAlerts: checked })}
              />
            </form>
          </Panel>
          <Panel
            title="Billing history"
            description="Download a sample statement for your records."
          >
            <div
              className={[
                "setting-row [&]:flex [&]:justify-between [&]:items-center [&]:gap-6 [&]:p-[20px_0]",
                "[&]:[border-bottom:1px_solid_var(--border-subtle)] last:[border:0]",
                "[&_strong]:text-[12px] [&_strong]:font-medium [&_label]:text-[12px]",
                "[&_label]:font-medium [&_p]:text-[11px] [&_p]:[color:var(--muted-foreground)]",
                "[&_p]:leading-[1.7] [&_p]:mt-1.25",
              ].join(" ")}
            >
              <div>
                <strong>Sample monthly statement</strong>
                <p>Hobby plan · $0.00 · Demo</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const blob = new Blob(
                    [
                      "CLOUDFORGE — DEMONSTRATION STATEMENT\nPlan: Hobby\nAmount: $0.00\nThis is sample data, not a financial document.",
                    ],
                    { type: "text/plain" },
                  );
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = "cloudforge-sample-statement.txt";
                  anchor.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
              >
                <Download />
                Download
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <CreditCard className="size-4" />
              No payment method is stored in this preview.
            </div>
          </Panel>
        </div>
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose your preview plan</DialogTitle>
              <DialogDescription>
                Compare plans and update the local display. There is no checkout or charge.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {["Hobby", "Pro"].map((option) => (
                <label
                  key={option}
                  className={[
                    "plan-option [&]:flex [&]:items-center [&]:gap-3.5 [&]:[border:1px_solid_var(--border)]",
                    "[&]:[border-radius:var(--radius-card)] [&]:p-4 [&]:cursor-pointer",
                    "[&.selected]:[border-color:var(--foreground)] [&.selected]:[background:var(--muted)]",
                    "[&_>_strong]:ml-auto [&_small]:block [&_small]:[color:var(--muted-foreground)]",
                    "[&_small]:text-[11px] [&_small]:font-normal [&_small]:mt-1",
                    plan === option ? "selected" : "",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={option}
                    checked={plan === option}
                    onChange={() => setPlan(option)}
                  />
                  <span>
                    <strong>{option}</strong>
                    <small>
                      {option === "Hobby" ? "For personal projects" : "For growing teams"}
                    </small>
                  </span>
                  <strong>
                    {option === "Hobby" ? "$0" : "$20"}
                    <small>/ mo</small>
                  </strong>
                </label>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  persist({ ...values, plan });
                  setDialog(false);
                }}
              >
                Update preview plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <PreviewNote>
          Plan changes, budgets, and statements are local UI examples. No billing provider is
          connected.
        </PreviewNote>
      </div>
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
      <WorkspaceHeading {...config} />
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList variant="line">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Panel title="Workspace details" description="The basics that make this workspace yours.">
            <form
              className={"workspace-form [&]:flex [&]:flex-col [&]:gap-5 max-w-xl"}
              onSubmit={submit}
            >
              <div className={"field-group [&]:flex [&]:flex-col [&]:gap-2"}>
                <Label htmlFor="workspace-name">Workspace name</Label>
                <Input
                  id="workspace-name"
                  required
                  value={values.name}
                  onChange={(event) => setValues({ ...values, name: event.target.value })}
                />
              </div>
              <div className={"field-group [&]:flex [&]:flex-col [&]:gap-2"}>
                <Label htmlFor="workspace-slug">Workspace slug</Label>
                <Input
                  id="workspace-slug"
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  value={values.slug}
                  onChange={(event) => setValues({ ...values, slug: event.target.value })}
                />
                <p
                  className={
                    "field-hint [&]:text-[11px] [&]:leading-[1.6] [&]:[color:var(--muted-foreground)]"
                  }
                >
                  Use lowercase letters, numbers, and hyphens.
                </p>
              </div>
              <div className={"field-group [&]:flex [&]:flex-col [&]:gap-2"}>
                <Label htmlFor="workspace-region">Default region</Label>
                <select
                  className={[
                    "workspace-select [&]:min-h-8 [&]:p-[6px_12px] [&]:[border:1px_solid_var(--input)]",
                    "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--card)] [&]:[color:var(--foreground)]",
                    "[&]:font-[inherit] [&]:text-[12px] [&]:max-w-full",
                  ].join(" ")}
                  id="workspace-region"
                  value={values.region}
                  onChange={(event) => setValues({ ...values, region: event.target.value })}
                >
                  {["Mumbai · bom1", "Frankfurt · fra1", "Washington · iad1"].map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
              </div>
              <Button className="w-fit" type="submit">
                Save changes
              </Button>
            </form>
          </Panel>
          <Panel
            title="Reset preview data"
            description="Restore the original sample resources in this browser."
          >
            <ConfirmationDialog
              destructive
              trigger={
                <>
                  <Trash2 />
                  Reset resources
                </>
              }
              title="Reset all preview resources?"
              description="This discards resource changes, including added projects, invitations, and sample variables. Your workspace preferences will be kept."
              confirmLabel="Reset resources"
              onConfirm={() => {
                for (const [key, config] of Object.entries(sectionConfigs)) save(key, config.rows);
                toast.success("Sample resources restored");
              }}
            />
          </Panel>
        </TabsContent>
        <TabsContent value="deployments">
          <Panel
            title="Deployment defaults"
            description="Configure the default build settings for new projects."
          >
            <form
              className={"workspace-form [&]:flex [&]:flex-col [&]:gap-5 max-w-xl"}
              onSubmit={submit}
            >
              <Label htmlFor="build-command">Build command</Label>
              <Input
                id="build-command"
                value={values.buildCommand}
                onChange={(event) => setValues({ ...values, buildCommand: event.target.value })}
                required
              />
              <Label htmlFor="output-dir">Output directory</Label>
              <Input
                id="output-dir"
                value={values.outputDirectory}
                onChange={(event) => setValues({ ...values, outputDirectory: event.target.value })}
                required
              />
              <ToggleRow
                title="Automatic deployments"
                description="Build when commits are pushed to the production branch."
                checked={values.autoDeploy}
                onChange={(checked) => setValues({ ...values, autoDeploy: checked })}
              />
              <ToggleRow
                title="Preview deployments"
                description="Create a preview for each pull request."
                checked={values.previewDeploys}
                onChange={(checked) => setValues({ ...values, previewDeploys: checked })}
              />
              <Button type="submit" className="w-fit">
                Save deployment defaults
              </Button>
            </form>
          </Panel>
        </TabsContent>
        <TabsContent value="notifications">
          <Panel
            title="Notification preferences"
            description="Choose the updates you would like to receive."
          >
            <ToggleRow
              title="Deployment updates"
              description="Build successes and failures for your projects."
              checked={values.buildAlerts}
              onChange={(checked) => persist({ ...values, buildAlerts: checked })}
            />
            <ToggleRow
              title="Usage notifications"
              description="Updates when you approach plan limits."
              checked={values.usageAlerts}
              onChange={(checked) => persist({ ...values, usageAlerts: checked })}
            />
            <ToggleRow
              title="Email notifications"
              description="A summary of important workspace events."
              checked={values.emailAlerts}
              onChange={(checked) => persist({ ...values, emailAlerts: checked })}
            />
          </Panel>
        </TabsContent>
      </Tabs>
      <PreviewNote>
        Preferences are saved in this browser. No deployment configuration or email delivery is
        changed remotely.
      </PreviewNote>
    </div>
  );
}
