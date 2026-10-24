import { AlertTriangle, Clock3, Code2, CreditCard, Database, Globe, Wrench } from "lucide-react";

export const issues = [
  {
    id: "deployment",
    title: "Deployment failed",
    description: "Build errors, failed deployments, or application not starting.",
    icon: AlertTriangle,
    heading: "Fix a failed deployment",
    intro: "Follow these steps to resolve deployment failures.",
    steps: [
      {
        title: "Check the build logs",
        text: "Identify the first error in your deployment logs. This indicates the root cause.",
      },
      {
        title: "Verify your build command",
        text: "Make sure your build command matches your framework (e.g. npm run build, next build).",
      },
      {
        title: "Check environment variables",
        text: "Ensure all required environment variables are defined correctly.",
      },
      {
        title: "Review dependency versions",
        text: "Verify your package versions and lockfile are compatible.",
      },
      {
        title: "Redeploy your application",
        text: "Once the issue is fixed, trigger a new deployment.",
      },
    ],
    causes: [
      "Missing environment variables",
      "Incorrect build command",
      "Dependency version mismatch",
      "Framework configuration issues",
      "Build-time API calls failing",
    ],
    logs: [
      "Cloning repository…",
      "Installing dependencies…",
      "Running build command…",
      "› Framework build started",
      "Creating an optimized production…",
      "Error: Module not found: Can't resolve './config'",
      "./src/lib/config.ts",
      "1 | import { env } from './config'",
      "  |                    ^",
      "3 | export const config = {",
      "× Build failed with exit code 1",
    ],
  },
  {
    id: "domains",
    title: "Domain not working",
    description: "DNS, SSL, or custom domain issues.",
    icon: Globe,
    heading: "Get your domain connected",
    intro: "Check your domain configuration from DNS to SSL.",
    steps: [
      {
        title: "Confirm the domain spelling",
        text: "Compare the domain in your project settings with your registered domain.",
      },
      {
        title: "Inspect DNS records",
        text: "Compare the configured records with those supplied by your hosting provider.",
      },
      {
        title: "Remove conflicting entries",
        text: "Check for duplicate or conflicting records for the same hostname.",
      },
      {
        title: "Check SSL provisioning",
        text: "Ensure the domain resolves correctly before expecting certificate issuance.",
      },
      {
        title: "Allow DNS changes to propagate",
        text: "Use a DNS lookup to check that the updated records are visible.",
      },
    ],
    causes: [
      "Incorrect DNS record",
      "Conflicting hostname entries",
      "Domain not verified",
      "Certificate still provisioning",
    ],
    logs: [
      "Checking domain configuration…",
      "Looking up configured hostname…",
      "Inspecting DNS response…",
      "Warning: Expected record not detected",
      "Verify the record in your DNS provider",
      "Check for conflicting records",
      "Wait for DNS propagation",
      "Retry domain verification",
    ],
  },
  {
    id: "build-time",
    title: "Build taking too long",
    description: "Slow builds or timeouts.",
    icon: Clock3,
    heading: "Speed up your build",
    intro: "Identify expensive steps and keep your build predictable.",
    steps: [
      {
        title: "Review build timing",
        text: "Find the slowest phase in your build logs before changing configuration.",
      },
      {
        title: "Check dependency installation",
        text: "Commit your lockfile and avoid unnecessary dependency downloads.",
      },
      {
        title: "Reduce build-time network calls",
        text: "Check whether external requests are delaying page generation.",
      },
      {
        title: "Review generated pages",
        text: "Avoid generating unneeded pages or large assets during every build.",
      },
      {
        title: "Compare the next deployment",
        text: "Measure the same phases after your change to confirm the improvement.",
      },
    ],
    causes: [
      "Slow external API calls",
      "Large dependency tree",
      "Too many generated pages",
      "Uncached asset processing",
    ],
    logs: [
      "Preparing build…",
      "Installing dependencies… 24s",
      "Compiling application… 18s",
      "Generating static pages…",
      "Waiting for upstream API… 120s",
      "Warning: Build phase taking longer than expected",
      "Review requests during page generation",
    ],
  },
  {
    id: "environment",
    title: "Environment variables",
    description: "Configuration or secret issues.",
    icon: Wrench,
    heading: "Check your environment variables",
    intro: "Keep configuration consistent across environments.",
    steps: [
      {
        title: "Identify the missing key",
        text: "Use the first configuration error to locate the variable name.",
      },
      {
        title: "Check the deployment environment",
        text: "Verify whether the deployment uses development, preview, or production values.",
      },
      {
        title: "Review spelling and formatting",
        text: "Check case, whitespace, and how your application reads the value.",
      },
      {
        title: "Protect private values",
        text: "Do not expose server secrets through client-facing environment variables.",
      },
      {
        title: "Rebuild with the new values",
        text: "Build-time variables usually require a new deployment.",
      },
    ],
    causes: [
      "Variable not configured",
      "Wrong target environment",
      "Incorrect key name",
      "Old build using previous values",
    ],
    logs: [
      "Loading application configuration…",
      "Reading server environment…",
      "Error: Required environment variable not found",
      "Expected key: DATABASE_URL",
      "Do not print secret values to build logs",
      "Check the target environment",
      "Redeploy after updating configuration",
    ],
  },
  {
    id: "database",
    title: "Database issues",
    description: "Connection, migrations, or data errors.",
    icon: Database,
    heading: "Restore your database connection",
    intro: "Work through connection settings before changing your data.",
    steps: [
      {
        title: "Read the connection error",
        text: "Distinguish authentication failures, timeouts, and missing schema errors.",
      },
      {
        title: "Check the connection string",
        text: "Verify the host, port, database name, and credentials in your environment.",
      },
      {
        title: "Review access settings",
        text: "Confirm that the deployment environment can reach the database.",
      },
      {
        title: "Review schema migrations",
        text: "Compare the application schema with applied migrations. Back up data before changes.",
      },
      {
        title: "Verify with a safe query",
        text: "Use a read-only query to confirm connectivity before retrying the application.",
      },
    ],
    causes: [
      "Invalid connection string",
      "Network access restrictions",
      "Expired credentials",
      "Schema migration mismatch",
    ],
    logs: [
      "Initializing database client…",
      "Connecting to configured host…",
      "Connection attempt timed out",
      "Check host availability and network access",
      "Verify credentials in environment settings",
      "Review the database provider status",
    ],
  },
  {
    id: "functions",
    title: "Function errors",
    description: "Serverless function problems.",
    icon: Code2,
    heading: "Debug your serverless function",
    intro: "Trace an invocation from request to response.",
    steps: [
      {
        title: "Find the failed invocation",
        text: "Match the request timestamp to the function logs.",
      },
      {
        title: "Inspect the stack trace",
        text: "Start with the first application-level error and its source location.",
      },
      {
        title: "Check runtime compatibility",
        text: "Confirm your dependencies support the selected runtime.",
      },
      {
        title: "Review external requests",
        text: "Apply appropriate timeouts and handle upstream failures.",
      },
      {
        title: "Test the corrected handler",
        text: "Exercise the failing input and confirm an appropriate response.",
      },
    ],
    causes: [
      "Unhandled exception",
      "Runtime incompatibility",
      "Upstream request timeout",
      "Missing environment configuration",
    ],
    logs: [
      "Function invocation received",
      "Loading handler…",
      "Calling upstream service…",
      "Error: Upstream request timed out",
      "Handle failures and set a request timeout",
      "Return a meaningful error response",
    ],
  },
  {
    id: "billing",
    title: "Billing and usage",
    description: "Plan limits, usage, or payment issues.",
    icon: CreditCard,
    heading: "Understand your usage and billing",
    intro: "Find the information behind your account usage.",
    steps: [
      {
        title: "Open usage and billing",
        text: "Use the Organization navigation in your workspace.",
      },
      {
        title: "Confirm your workspace",
        text: "Make sure you are looking at the correct organization or project.",
      },
      {
        title: "Review the reporting period",
        text: "Match the date range to the period you want to investigate.",
      },
      {
        title: "Compare resource categories",
        text: "Review bandwidth, storage, compute, and deployment usage separately.",
      },
      {
        title: "Contact support with context",
        text: "Include the affected workspace and reporting period. Never share payment credentials.",
      },
    ],
    causes: [
      "Wrong reporting period",
      "Different workspace selected",
      "Resource allowance exceeded",
      "Payment details need review",
    ],
    logs: [
      "Workspace usage preview",
      "Billing integration not connected",
      "Sample resource categories:",
      "  Compute / Bandwidth / Storage",
      "No charges are created in this preview",
      "Open Usage & Billing to explore the template",
    ],
  },
];
export const guides = [
  {
    slug: "fix-build-errors",
    category: "DEPLOYMENTS",
    title: "How to fix common build errors",
    description: "A complete guide to debugging and resolving build failures.",
    minutes: 8,
    art: "build",
    issue: "deployment",
  },
  {
    slug: "custom-domains",
    category: "DOMAINS",
    title: "Setting up a custom domain",
    description: "Learn how to connect your domain and configure DNS.",
    minutes: 6,
    art: "domain",
    issue: "domains",
  },
  {
    slug: "environment-variables",
    category: "ENVIRONMENT VARIABLES",
    title: "Best practices for environment variables",
    description: "Keep your application secure and configuration consistent.",
    minutes: 5,
    art: "environment",
    issue: "environment",
  },
  {
    slug: "debug-serverless-functions",
    category: "FUNCTIONS",
    title: "Debugging serverless functions",
    description: "Learn how to troubleshoot and optimize your functions.",
    minutes: 7,
    art: "function",
    issue: "functions",
  },
];
export const services = ["API", "Deployments", "Functions", "Storage", "Databases", "Dashboard"];
