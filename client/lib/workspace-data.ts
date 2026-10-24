export type Resource = {
  id: string;
  name: string;
  project: string;
  environment: string;
  status: string;
  detail: string;
  updated: string;
  value?: string;
  repository?: string;
};
export type Field = {
  key: string;
  label: string;
  placeholder?: string;
  type?: string;
  options?: string[];
  hint?: string;
};
export type SectionConfig = {
  title: string;
  description: string;
  group: string;
  singular: string;
  action: string;
  columns: [string, string, string];
  fields: Field[];
  rows: Resource[];
  note: string;
};
const row = (
  id: string,
  name: string,
  project: string,
  status: string,
  detail: string,
  environment = "Production",
): Resource => ({ id, name, project, status, detail, environment, updated: "2 hours ago" });
export const projectNames = ["portfolio", "ecommerce", "api-service", "blog", "docs"];
const project: Field = { key: "project", label: "Project", options: projectNames };
const environment: Field = {
  key: "environment",
  label: "Environment",
  options: ["Production", "Preview", "Development"],
};
export const sectionConfigs: Record<string, SectionConfig> = {
  projects: {
    title: "Projects",
    description: "A home for every application. Build, ship, and keep moving.",
    group: "Workspace",
    singular: "project",
    action: "New project",
    columns: ["Project", "Framework", "Domain"],
    fields: [
      {
        key: "name",
        label: "Project name",
        placeholder: "my-next-project",
        hint: "Use lowercase letters, numbers, and hyphens.",
      },
      {
        key: "project",
        label: "Framework",
        options: ["Next.js", "Astro", "VitePress", "FastAPI", "Other"],
      },
      { key: "repository", label: "Repository", placeholder: "your-team/my-project" },
      environment,
    ],
    rows: projectNames.map((name, i) =>
      row(
        name,
        name,
        ["Next.js", "Next.js", "FastAPI", "Astro", "VitePress"][i],
        ["Ready", "Building", "Ready", "Failed", "Ready"][i],
        `${name}.example.com`,
      ),
    ),
    note: "Domains shown are examples. Open a project to manage its deployments and configuration.",
  },
  deployments: {
    title: "Deployments",
    description: "Every release, from the first commit to the edge.",
    group: "Workspace",
    singular: "deployment",
    action: "Deploy project",
    columns: ["Deployment", "Project", "Commit"],
    fields: [project, { key: "detail", label: "Branch", placeholder: "main" }, environment],
    rows: projectNames.map((name, i) =>
      row(
        ["a1b2c3d", "f9e8d7c", "c4d5e6f", "9a8b7c6", "d3e2f1a"][i],
        `${name}-${["a1b2c3d", "f9e8d7c", "c4d5e6f", "9a8b7c6", "d3e2f1a"][i]}`,
        name,
        ["Ready", "Building", "Ready", "Failed", "Ready"][i],
        ["a1b2c3d", "f9e8d7c", "c4d5e6f", "9a8b7c6", "d3e2f1a"][i],
      ),
    ),
    note: "Deploy actions create a local preview record. No remote build or release runs.",
  },
  "git-repositories": {
    title: "Git Repositories",
    description: "Keep your source code and deployments in sync.",
    group: "Workspace",
    singular: "repository",
    action: "Connect repository",
    columns: ["Repository", "Project", "Default branch"],
    fields: [
      { key: "name", label: "Repository", placeholder: "acme/portfolio" },
      project,
      { key: "detail", label: "Default branch", placeholder: "main" },
    ],
    rows: projectNames.map((name) =>
      row(`repo-${name}`, `acme/${name}`, name, "Connected", "main"),
    ),
    note: "Repository connections are simulated. No Git provider access is requested.",
  },
  "domains-routing": {
    title: "Domains & Routing",
    description: "Give every application a place on the web.",
    group: "Development",
    singular: "domain",
    action: "Add domain",
    columns: ["Domain", "Project", "Record"],
    fields: [
      {
        key: "name",
        label: "Domain",
        placeholder: "app.example.com",
        hint: "Enter a hostname without https:// or a path.",
      },
      project,
      environment,
    ],
    rows: [
      row(
        "domain-1",
        "portfolio.example.com",
        "portfolio",
        "Valid",
        "CNAME → cname.cloudforge.example",
      ),
      row("domain-2", "shop.example.com", "ecommerce", "Valid", "CNAME → cname.cloudforge.example"),
      row("domain-3", "api.example.com", "api-service", "Pending", "A → 192.0.2.1"),
    ],
    note: "DNS records are illustrative. Verification here only updates the local preview.",
  },
  "environment-variables": {
    title: "Environment Variables",
    description: "Manage configuration across your environments.",
    group: "Development",
    singular: "variable",
    action: "Add variable",
    columns: ["Key", "Project", "Value"],
    fields: [
      { key: "name", label: "Key", placeholder: "NEXT_PUBLIC_API_URL" },
      {
        key: "value",
        label: "Demo value",
        type: "password",
        placeholder: "Enter a non-sensitive sample value",
        hint: "This prototype stores data in your browser. Do not enter real credentials.",
      },
      project,
      environment,
    ],
    rows: [
      {
        ...row("env-1", "NEXT_PUBLIC_API_URL", "portfolio", "Configured", "Masked"),
        value: "https://api.example.com",
      },
      {
        ...row("env-2", "DATABASE_URL", "api-service", "Configured", "Masked"),
        value: "postgres://demo:sample@localhost/demo",
      },
      { ...row("env-3", "NODE_ENV", "ecommerce", "Configured", "Masked"), value: "production" },
    ],
    note: "Values are masked for presentation, not encrypted. Use sample values only.",
  },
  storage: {
    title: "Storage",
    description: "One place for the assets your applications depend on.",
    group: "Development",
    singular: "bucket",
    action: "Create bucket",
    columns: ["Bucket", "Project", "Usage"],
    fields: [
      { key: "name", label: "Bucket name", placeholder: "project-assets" },
      project,
      {
        key: "detail",
        label: "Region",
        options: ["Mumbai · bom1", "Frankfurt · fra1", "Washington · iad1"],
      },
    ],
    rows: [
      row("bucket-1", "portfolio-assets", "portfolio", "Private", "2.4 GB · 128 objects"),
      row("bucket-2", "product-images", "ecommerce", "Public", "12.8 GB · 2,406 objects"),
      row("bucket-3", "database-backups", "api-service", "Private", "8.2 GB · 14 objects"),
    ],
    note: "Buckets and uploaded file metadata stay in this browser. File contents are not uploaded.",
  },
  "compute-services": {
    title: "Compute & Services",
    description: "The infrastructure behind your next big idea.",
    group: "Infrastructure",
    singular: "service",
    action: "Create service",
    columns: ["Service", "Project", "Resources"],
    fields: [
      { key: "name", label: "Service name", placeholder: "api-worker" },
      project,
      {
        key: "detail",
        label: "Instance",
        options: [
          "Starter · 1 vCPU / 1 GB",
          "Standard · 2 vCPU / 4 GB",
          "Performance · 4 vCPU / 8 GB",
        ],
      },
      environment,
    ],
    rows: [
      row("svc-1", "api-server", "api-service", "Running", "2 vCPU · 4 GB · bom1"),
      row("svc-2", "image-worker", "ecommerce", "Running", "1 vCPU · 2 GB · bom1"),
      row("svc-3", "preview-server", "portfolio", "Stopped", "1 vCPU · 1 GB · fra1", "Preview"),
    ],
    note: "Start, stop and restart controls affect preview state only.",
  },
  "cron-jobs": {
    title: "Cron Jobs",
    description: "Reliable schedules for the work that runs in the background.",
    group: "Infrastructure",
    singular: "cron job",
    action: "Create cron job",
    columns: ["Job", "Project", "Schedule (UTC)"],
    fields: [
      { key: "name", label: "Job name", placeholder: "daily-cleanup" },
      project,
      {
        key: "detail",
        label: "Schedule",
        placeholder: "0 0 * * *",
        hint: "Five-field cron expression, in UTC.",
      },
      environment,
    ],
    rows: [
      row("cron-1", "daily-backup", "api-service", "Active", "0 2 * * *"),
      row("cron-2", "sync-inventory", "ecommerce", "Active", "*/15 * * * *"),
      row("cron-3", "cleanup-previews", "portfolio", "Paused", "0 0 * * 0"),
    ],
    note: "Schedules are stored locally; this preview does not execute scheduled tasks.",
  },
  functions: {
    title: "Functions",
    description: "Small pieces of code. Global reach.",
    group: "Infrastructure",
    singular: "function",
    action: "Create function",
    columns: ["Function", "Project", "Runtime"],
    fields: [
      { key: "name", label: "Function name", placeholder: "hello-world" },
      project,
      { key: "detail", label: "Runtime", options: ["Node.js 22", "Python 3.12", "Edge runtime"] },
      environment,
    ],
    rows: [
      row("fn-1", "/api/checkout", "ecommerce", "Ready", "Node.js 22 · 128 MB"),
      row("fn-2", "/api/contact", "portfolio", "Ready", "Edge runtime · 128 MB"),
      row("fn-3", "/api/search", "docs", "Ready", "Node.js 22 · 256 MB"),
    ],
    note: "Function invocations show a simulated response; no code is executed remotely.",
  },
  alerts: {
    title: "Alerts",
    description: "Know when something needs your attention.",
    group: "Observability",
    singular: "alert rule",
    action: "Create alert",
    columns: ["Rule", "Project", "Condition"],
    fields: [
      { key: "name", label: "Rule name", placeholder: "High error rate" },
      project,
      {
        key: "detail",
        label: "Condition",
        options: [
          "Error rate > 5% for 5 minutes",
          "CPU usage > 80% for 5 minutes",
          "Response time > 500ms for 5 minutes",
          "Deployment failed",
        ],
      },
    ],
    rows: [
      row("alert-1", "High error rate", "api-service", "Enabled", "Error rate > 5% for 5 minutes"),
      row("alert-2", "Build failure", "blog", "Triggered", "Deployment failed"),
      row("alert-3", "CPU threshold", "ecommerce", "Enabled", "CPU usage > 80% for 5 minutes"),
    ],
    note: "Alert rules are local examples. Notifications are not sent.",
  },
  "team-members": {
    title: "Team Members",
    description: "Great things are built together.",
    group: "Organization",
    singular: "invitation",
    action: "Invite member",
    columns: ["Member", "Email", "Role"],
    fields: [
      { key: "name", label: "Full name", placeholder: "Alex Morgan" },
      { key: "project", label: "Email address", type: "email", placeholder: "alex@example.com" },
      { key: "detail", label: "Role", options: ["Developer", "Viewer", "Admin"] },
    ],
    rows: [
      row("member-1", "You", "you@example.com", "Active", "Owner"),
      row("member-2", "Sarah Chen", "sarah@example.com", "Active", "Admin"),
      row("member-3", "Alex Morgan", "alex@example.com", "Active", "Developer"),
      row("member-4", "Jordan Lee", "jordan@example.com", "Invited", "Viewer"),
    ],
    note: "Invitations are local preview records. No email is sent.",
  },
};
export const sectionDescriptions: Record<
  string,
  { title: string; description: string; group: string }
> = {
  "build-logs": {
    title: "Build Logs",
    description: "Follow every step from source to a successful build.",
    group: "Development",
  },
  "deployment-history": {
    title: "Deployment History",
    description: "A clear record of what shipped, when, and why.",
    group: "Development",
  },
  security: {
    title: "Security",
    description: "Keep your workspace protected, by default.",
    group: "Infrastructure",
  },
  analytics: {
    title: "Analytics",
    description: "Understand how people experience your applications.",
    group: "Observability",
  },
  monitoring: {
    title: "Monitoring",
    description: "A real-time view of your application's health.",
    group: "Observability",
  },
  "runtime-logs": {
    title: "Runtime Logs",
    description: "See what is happening inside your running applications.",
    group: "Observability",
  },
  "usage-billing": {
    title: "Usage & Billing",
    description: "Clear usage. Predictable costs. Room to grow.",
    group: "Organization",
  },
  settings: {
    title: "Settings",
    description: "Make this workspace work for your team.",
    group: "Organization",
  },
};
