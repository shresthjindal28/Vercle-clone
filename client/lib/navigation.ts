import {
  Activity,
  Bell,
  ChartNoAxesCombined,
  Clock3,
  CreditCard,
  Database,
  FolderKanban,
  GitBranch,
  GitPullRequest,
  History,
  KeyRound,
  LayoutDashboard,
  Network,
  Rocket,
  ScrollText,
  Server,
  Settings,
  ShieldCheck,
  SquareTerminal,
  UsersRound,
} from "lucide-react";

export const groups = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Projects", icon: FolderKanban },
      { label: "Deployments", icon: Rocket },
      { label: "Git Repositories", icon: GitPullRequest },
    ],
  },
  {
    title: "Development",
    items: [
      { label: "Domains & Routing", icon: GitBranch },
      { label: "Environment Variables", icon: KeyRound },
      { label: "Storage", icon: Database },
      { label: "Build Logs", icon: SquareTerminal },
      { label: "Deployment History", icon: History },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "Compute & Services", icon: Server },
      { label: "Cron Jobs", icon: Clock3 },
      { label: "Functions", icon: Network },
      { label: "Security", icon: ShieldCheck },
    ],
  },
  {
    title: "Observability",
    items: [
      { label: "Analytics", icon: Activity },
      { label: "Monitoring", icon: ChartNoAxesCombined },
      { label: "Runtime Logs", icon: ScrollText },
      { label: "Alerts", icon: Bell },
    ],
  },
  {
    title: "Organization",
    items: [
      { label: "Team Members", icon: UsersRound },
      { label: "Usage & Billing", icon: CreditCard },
      { label: "Settings", icon: Settings },
    ],
  },
];

export const hrefFor = (label: string) =>
  label === "Overview"
    ? "/dashboard"
    : "/dashboard/" + label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
