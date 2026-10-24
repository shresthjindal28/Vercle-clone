"use client";

import { useState } from "react";
import {
  ArrowRight,
  Box,
  ChevronRight,
  CreditCard,
  Database,
  Globe,
  Mail,
  MessageCircle,
  Rocket,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const topics = [
  {
    title: "Getting Started",
    icon: Rocket,
    description: "Set up your account and deploy your first project.",
    articles: [
      {
        title: "Explore your workspace",
        body: "Select Start Deploying at the top of the page, then continue to the demo workspace. The overview brings your projects, deployments, traffic, and resource usage together.",
      },
      {
        title: "Create your first project",
        body: "Open the dashboard and select New Project. Enter a lowercase project name using letters, numbers, and hyphens. Projects created in this preview last for the current session.",
      },
      {
        title: "Navigate the platform",
        body: "Use the sidebar to switch between workspace pages. Collapse it with the top bar control, or press ⌘K (Ctrl+K on Windows) to search navigation.",
      },
    ],
  },
  {
    title: "Deployments",
    icon: Box,
    description: "Build, deploy and manage your applications.",
    articles: [
      {
        title: "Understand deployment status",
        body: "Ready means a build completed, Building indicates a build in progress, and Failed indicates an unsuccessful build. The current dashboard uses sample data to demonstrate these states.",
      },
      {
        title: "Inspect a deployment",
        body: "Open a project in Recent Deployments, or select its commit hash to view deployment details. Breadcrumbs let you return to the parent project.",
      },
      {
        title: "Read build logs",
        body: "Build Logs is available in the Development sidebar. Live build execution and log streaming will become available when the deployment backend is connected.",
      },
    ],
  },
  {
    title: "Domains & Routing",
    icon: Globe,
    description: "Connect custom domains and configure DNS.",
    articles: [
      {
        title: "Find domain settings",
        body: "Open Domains & Routing in the dashboard’s Development navigation. This is the home for future custom domain configuration.",
      },
      {
        title: "Prepare a custom domain",
        body: "Keep access to your domain provider’s DNS settings. The platform will supply the required DNS records when domain provisioning is connected; this preview does not issue DNS records.",
      },
      {
        title: "Preview URLs",
        body: "The domain names shown in the demo dashboard are examples. They do not represent active hosted projects.",
      },
    ],
  },
  {
    title: "Environment Variables",
    icon: Database,
    description: "Manage secrets and configuration.",
    articles: [
      {
        title: "Find environment configuration",
        body: "Use Environment Variables in the Development sidebar to access your project configuration template.",
      },
      {
        title: "Keep secrets private",
        body: "Store private keys and credentials on your server. Do not put private secrets in variables intended for client-side code or commit them to your repository.",
      },
      {
        title: "Preview environments",
        body: "Deployment details show the environment associated with a resource. Environment-specific secrets and deployment actions require a connected backend.",
      },
    ],
  },
  {
    title: "Team & Permissions",
    icon: Users,
    description: "Invite members and manage access control.",
    articles: [
      {
        title: "View your team",
        body: "Open Team Members under Organization to see the team management template. Invitations are not sent from this preview.",
      },
      {
        title: "Workspace settings",
        body: "General workspace settings are available under Settings. Changes are saved locally on your device.",
      },
      {
        title: "Account access",
        body: "The current sign-in page provides access to a demo workspace. Authentication, organization membership, and role enforcement are not connected yet.",
      },
    ],
  },
  {
    title: "Billing & Usage",
    icon: CreditCard,
    description: "Understand pricing, invoices and usage.",
    articles: [
      {
        title: "Inspect resource usage",
        body: "The overview displays CPU, memory, storage, and bandwidth examples. All usage values are sample data, not metered account activity.",
      },
      {
        title: "Usage and billing",
        body: "Open Usage & Billing under Organization for the billing page template. This preview does not collect payment details or charge for usage.",
      },
      {
        title: "Reporting periods",
        body: "Use the reporting period selector on the overview to explore the sample metric presentation across 7, 30, and 90 days.",
      },
    ],
  },
];
export function LandingSupport() {
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [contact, setContact] = useState<string | null>(null);
  const matched = topics
    .map((t, i) => ({ ...t, index: i }))
    .filter((t) =>
      `${t.title} ${t.description} ${t.articles.map((a) => a.title).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  return (
    <section
      className={[
        "support-section [&]:max-w-344 [&]:m-[65px_auto_0] [&]:p-[55px_40px_60px]",
        "[&]:[border-top:1px_solid_#191919] [&]:scroll-mt-6 min-[1500px]:[&]:max-w-364",
        "max-[1200px]:[&]:px-7.5 max-[768px]:[&]:mt-6.25",
        "max-[768px]:[&]:p-[38px_20px]",
      ].join(" ")}
      id="solutions"
      aria-labelledby="support-title"
    >
      <div
        className={[
          "support-topic-grid [&]:grid [&]:grid-cols-6 [&]:gap-3.5",
          "[&]:mb-6 max-[1200px]:[&]:grid-cols-3",
          "max-[768px]:[&]:grid-cols-2 max-[768px]:[&]:gap-3",
        ].join(" ")}
      >
        {topics.map((t, i) => (
          <button
            className={[
              "topic-card [&]:flex [&]:flex-col [&]:items-start [&]:text-left [&]:min-w-0 [&]:relative",
              "[&]:isolate [&]:overflow-hidden [&]:[background:linear-gradient(135deg,#0c0c0c,#050505)]",
              "[&]:[border:1px_solid_#242424] [&]:rounded-[9px] [&]:p-5 [&]:cursor-pointer",
              "[&]:[transition:border-color_.2s,box-shadow_.2s,transform_.2s] [&:hover]:border-[#8a8a8a]",
              "[&:hover]:[box-shadow:0_0_22px_#ffffff0d] [&:hover]:transform-[translateY(-3px)]",
              "focus-visible:border-[#8a8a8a] focus-visible:[box-shadow:0_0_22px_#ffffff0d]",
              "focus-visible:transform-[translateY(-3px)] [&_h3]:text-[12px] [&_h3]:font-medium",
              "[&_h3]:tracking-[-.25px] [&_h3]:leading-normal [&_h3]:whitespace-nowrap [&_>_p]:text-[11px]",
              "[&_>_p]:leading-[1.8] [&_>_p]:text-[#919191] [&_>_p]:mt-1.5 [&_>_p]:mb-5",
              "[&:hover_.topic-arrow]:[color:#111] [&:hover_.topic-arrow]:[background:#f5f5f5]",
              "[&:hover_.topic-arrow]:[box-shadow:0_0_13px_#ffffff20] min-[1500px]:[&]:p-5.75",
              "min-[1500px]:[&_h3]:text-[13px] min-[1500px]:[&_>_p]:text-[12px] max-[1200px]:[&_h3]:text-[14px]",
              "max-[1200px]:[&_>_p]:text-[12px] max-[1200px]:[&_>_p]:max-w-50 max-[768px]:[&]:p-4.25",
              "max-[768px]:[&_h3]:text-[12px] max-[768px]:[&_h3]:whitespace-normal",
              "max-[768px]:[&_>_p]:text-[11px] max-[768px]:[&_>_p]:mb-3.75",
              i === 1
                ? [
                    "topic-featured [&]:border-[#737373] [&]:[box-shadow:0_0_25px_#ffffff0c]",
                    "[&]:[background:radial-gradient(ellipse_at_70%_0%,#23232380,transparent_70%),#090909]",
                    '[&::before]:[content:""] [&::before]:absolute [&::before]:right-8.75 [&::before]:-top-7.5',
                    "[&::before]:w-10 [&::before]:h-22.5 [&::before]:[border:1px_solid_#ffffff0a]",
                    "[&::before]:transform-[skewY(-30deg)] [&::before]:z-[-1] [&_.topic-arrow]:[color:#111]",
                    "[&_.topic-arrow]:[background:#f5f5f5] [&_.topic-arrow]:[box-shadow:0_0_13px_#ffffff20]",
                  ].join(" ")
                : "",
            ].join(" ")}
            key={t.title}
            onClick={() => setSelected(i)}
          >
            <span
              className={[
                "topic-icon [&]:w-10.75 [&]:h-10.75 [&]:grid [&]:place-items-center [&]:text-[#ccc]",
                "[&]:rounded-[10px] [&]:[background:linear-gradient(140deg,#1b1b1b,#0b0b0b)]",
                "[&]:[border-top:1px_solid_#ffffff09] [&]:mb-3.75 max-[768px]:[&]:w-9",
                "max-[768px]:[&]:h-9 max-[768px]:[&]:mb-3 max-[768px]:[&_svg]:w-5.25",
              ].join(" ")}
            >
              <t.icon size={24} />
            </span>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <div
              className={[
                "topic-bottom [&]:flex [&]:items-center [&]:justify-between [&]:w-full [&]:mt-auto",
                "[&]:text-[10px] [&]:text-[#888]",
              ].join(" ")}
            >
              <span>{t.articles.length} articles</span>
              <span
                className={[
                  "topic-arrow [&]:w-7 [&]:h-7 [&]:rounded-[50%]",
                  "[&]:[background:linear-gradient(#222,#111)] [&]:[border:1px_solid_#ffffff0c] [&]:grid",
                  "[&]:place-items-center [&]:text-muted-foreground",
                ].join(" ")}
              >
                <ArrowRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
      <Card
        className={[
          "docs-banner [&]:[background:linear-gradient(125deg,#101010,#070707_45%,#090909)]",
          "[&]:[border:1px_solid_#272727] [&]:[box-shadow:none] [&]:p-0 [&]:gap-0 [&]:overflow-hidden",
          "[&]:[--card:#0b0b0b] [&]:mb-4.75 [&]:scroll-mt-6.25",
        ].join(" ")}
        id="docs"
      >
        <CardContent
          className={[
            "docs-banner-content [&]:grid [&]:grid-cols-[1.15fr_.7fr_1fr] [&]:gap-5",
            "[&]:items-center [&]:min-h-62.5 [&]:p-[32px_38px] [&]:relative",
            "max-[1200px]:[&]:grid-cols-[1fr_.8fr] max-[768px]:[&]:grid-cols-[1fr]",
            "max-[768px]:[&]:p-6.25 max-[768px]:[&]:gap-7",
          ].join(" ")}
        >
          <div
            className={[
              "docs-banner-copy [&]:relative [&]:z-2 [&_h2]:text-[27px] [&_h2]:tracking-[-.8px]",
              "[&_h2]:leading-[1.2] [&_h2]:mb-3 [&_h2]:font-medium",
              "[&_>_p:not(.support-eyebrow)]:text-[12px] [&_>_p:not(.support-eyebrow)]:text-[#929292]",
              "[&_>_p:not(.support-eyebrow)]:leading-[1.8] [&_>_p:not(.support-eyebrow)]:mb-5",
              "[&_.landing-cta]:text-[10px] [&_.landing-cta]:p-[10px_15px]",
              "[&_.landing-cta]:rounded-[12px] [&_.landing-cta]:[box-shadow:0_0_20px_#ffffff0d]",
              "max-[768px]:[&_h2]:text-[25px] max-[768px]:[&_>_p:not(.support-eyebrow)]:text-[11px]",
            ].join(" ")}
          >
            <p
              className={[
                "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
                "[&]:mb-3.75",
              ].join(" ")}
            >
              DOCUMENTATION
            </p>
            <h2>Go deeper with our docs</h2>
            <p>
              Step-by-step guides, API references and best practices
              <br className={"desktop-break max-[768px]:[&]:hidden"} /> to help you build and scale
              faster.
            </p>
            <button
              className={[
                "landing-cta [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-3",
                "[&]:[background:#f8f8f8] [&]:text-[#161616] [&]:[border:1px_solid_#dedede] [&]:rounded-[13px]",
                "[&]:text-[13px] [&]:font-[550] [&]:p-[13px_23px]",
                "[&]:[box-shadow:0_0_25px_#ffffff25,0_0_6px_#ffffff1a] [&]:[transition:box-shadow_.2s,background_.2s]",
                "[&]:whitespace-nowrap [&:hover]:[background:#dedede] [&:hover]:[box-shadow:0_0_35px_#ffffff38]",
                "max-[600px]:[&]:text-[12px] max-[600px]:[&]:p-[12px_17px] max-[600px]:[&]:gap-2.25",
                "max-[600px]:[&]:rounded-[11px]",
              ].join(" ")}
              onClick={() => {
                setSelected(0);
                setQuery("");
              }}
            >
              Browse Documentation <ArrowRight size={14} />
            </button>
          </div>
          <div
            className={[
              "docs-preview [&]:z-2 [&]:relative [&]:min-w-0 [&]:self-center",
              "max-[768px]:[&]:max-w-full",
            ].join(" ")}
          >
            <label
              className={[
                "docs-search [&]:flex [&]:items-center [&]:[background:#171717] [&]:[border:1px_solid_#ffffff0c]",
                "[&]:rounded-[8px] [&]:p-[4px_8px] [&]:gap-1.5 [&]:text-muted-foreground [&_svg]:shrink-0",
                "[&_input]:p-0 [&_input]:h-6.5 [&_input]:min-w-0 [&_input]:[border:0]",
                "[&_input]:[background:transparent]! [&_input]:text-[9px] [&_input]:[box-shadow:none]",
                "[&_>_span]:text-[10px] [&_>_span]:[background:#ffffff0b] [&_>_span]:rounded-[3px]",
                "[&_>_span]:p-[1px_5px] max-[768px]:[&_input]:text-[11px]",
              ].join(" ")}
            >
              <Search size={14} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation…"
                aria-label="Search documentation"
              />
              <span>⌕</span>
            </label>
            <div
              className={[
                "docs-preview-list [&]:p-[8px_8px_0] [&_>_button]:flex [&_>_button]:items-center",
                "[&_>_button]:gap-3 [&_>_button]:p-[10px_0] [&_>_button]:w-full",
                "[&_>_button]:text-[10px] [&_>_button]:text-[#ccc] [&_>_button]:cursor-pointer",
                "[&_>_button]:text-left [&_button_svg:last-child]:ml-auto",
                "[&_button_svg:last-child]:w-3 [&_button:hover]:text-white",
                "max-[768px]:[&_>_button]:text-[12px]",
              ].join(" ")}
            >
              {matched.slice(0, 4).map((t) => (
                <button key={t.title} onClick={() => setSelected(t.index)}>
                  <t.icon size={15} />
                  <span>{t.title}</span>
                  <ChevronRight size={13} />
                </button>
              ))}
              {matched.length === 0 && (
                <p
                  className={
                    "docs-no-results [&]:text-[11px] [&]:text-[#999] [&]:leading-[1.6] [&]:mt-3.75"
                  }
                >
                  No guides found. Try “deployments”.
                </p>
              )}
            </div>
          </div>
          <div
            className={[
              "docs-art [&]:relative [&]:h-48.75 [&]:perspective-[700px] [&]:min-w-0",
              "max-[1200px]:[&]:hidden max-[768px]:[&]:block max-[768px]:[&]:max-w-[320px]",
              "max-[768px]:[&]:w-full max-[768px]:[&]:m-auto max-[768px]:[&]:h-47.5",
            ].join(" ")}
            aria-hidden="true"
          >
            <div
              className={[
                "docs-orbit [&]:absolute [&]:-left-7.5 [&]:-right-3.75 [&]:top-12 [&]:h-30",
                "[&]:[border:1px_solid_#ffffff19] [&]:rounded-[50%] [&]:transform-[rotate(-10deg)]",
              ].join(" ")}
            />
            <div
              className={[
                "docs-glass [&]:absolute [&]:[border:1px_solid_#ffffff4d] [&]:rounded-[8px]",
                "[&]:[background:linear-gradient(125deg,#ffffff15,#09090980_70%)]",
                "[&]:[box-shadow:inset_0_1px_2px_#ffffff24,0_15px_35px_#0005] [&]:[backdrop-filter:blur(6px)]",
                [
                  "[&]:text-[10px] [&]:text-muted-foreground [&]:transform-[rotateY(-25deg)_skewY(10deg)]",
                  "docs-glass-back",
                ].join(" "),
                "[&]:right-0 [&]:top-5 [&]:w-31.25 [&]:h-37.5 [&]:p-[35px_18px]",
                "[&]:[background:linear-gradient(125deg,#12121288,#ffffff17)]",
                "[&]:transform-[rotateY(-25deg)_skewY(-10deg)]",
              ].join(" ")}
            >
              Custom
              <br />
              Domains
            </div>
            <div
              className={[
                "docs-glass [&]:absolute [&]:[border:1px_solid_#ffffff4d] [&]:rounded-[8px]",
                "[&]:[background:linear-gradient(125deg,#ffffff15,#09090980_70%)]",
                "[&]:[box-shadow:inset_0_1px_2px_#ffffff24,0_15px_35px_#0005] [&]:[backdrop-filter:blur(6px)]",
                [
                  "[&]:text-[10px] [&]:text-muted-foreground [&]:transform-[rotateY(-25deg)_skewY(10deg)]",
                  "docs-glass-middle",
                ].join(" "),
                "[&]:left-0 [&]:top-15 [&]:w-58.75 [&]:h-32.5 [&]:p-[20px_15px]",
                "[&]:text-[#777]",
              ].join(" ")}
            >
              Environment
              <br />
              Variables
            </div>
            <div
              className={[
                "docs-glass [&]:absolute [&]:[border:1px_solid_#ffffff4d] [&]:rounded-[8px]",
                "[&]:[background:linear-gradient(125deg,#ffffff15,#09090980_70%)]",
                "[&]:[box-shadow:inset_0_1px_2px_#ffffff24,0_15px_35px_#0005] [&]:[backdrop-filter:blur(6px)]",
                [
                  "[&]:text-[10px] [&]:text-muted-foreground [&]:transform-[rotateY(-25deg)_skewY(10deg)]",
                  "docs-glass-front",
                ].join(" "),
                "[&]:left-[30%] [&]:top-1.5 [&]:w-43 [&]:h-41.5 [&]:p-[23px_15px]",
                "[&]:[background:linear-gradient(125deg,#ffffff2c,#161616bd_65%)] [&]:text-[#eee] [&_>_span]:flex",
                "[&_>_span]:items-center [&_>_span]:justify-between [&_>_span]:text-[10px] [&_>_i]:block",
                "[&_>_i]:h-2.25 [&_>_i]:[background:linear-gradient(90deg,#ffffff34,#ffffff0c)]",
                "[&_>_i]:mt-4.75 [&_>_i]:rounded-[3px] [&_>_i]:w-[85%]",
                "[&_>_i:nth-of-type(2)]:w-[90%] [&_>_i:nth-of-type(2)]:mt-3.25",
                "[&_>_i:nth-of-type(3)]:w-[60%] [&_>_i:nth-of-type(3)]:mt-3.25",
              ].join(" ")}
            >
              <span>
                Deploy your app <Box size={18} />
              </span>
              <i />
              <i />
              <i />
            </div>
            <span
              className={[
                "docs-orbit-point [&]:absolute [&]:top-24.75 [&]:-left-3.75 [&]:h-1.25 [&]:w-1.25",
                "[&]:[background:#fff] [&]:rounded-[50%] [&]:[box-shadow:0_0_15px_#fff]",
              ].join(" ")}
            />
          </div>
        </CardContent>
      </Card>
      <Card
        className={[
          "support-bottom-card [&]:[background:linear-gradient(125deg,#101010,#070707_45%,#090909)]",
          "[&]:[border:1px_solid_#272727] [&]:[box-shadow:none]",
          "[&]:p-0 [&]:gap-0 [&]:overflow-hidden",
          "[&]:[--card:#0b0b0b]",
        ].join(" ")}
      >
        <CardContent
          className={[
            "support-bottom-content [&]:grid [&]:grid-cols-[1.65fr_1fr] [&]:gap-8",
            "[&]:p-[26px_37px] max-[1200px]:[&]:grid-cols-[1fr] max-[768px]:[&]:p-6.25",
            "max-[768px]:[&]:gap-6.25",
          ].join(" ")}
        >
          <div
            className={[
              "support-channels [&_h2]:text-[22px] [&_h2]:leading-[1.2] [&_h2]:tracking-[-.6px]",
              "[&_h2]:font-medium [&_h2]:mb-2 [&_>_.support-eyebrow]:mb-3",
              "[&_>_p:not(.support-eyebrow)]:text-[#909090] [&_>_p:not(.support-eyebrow)]:text-[11px]",
              "[&_>_p:not(.support-eyebrow)]:leading-[1.7] max-[768px]:[&_h2]:text-[22px]",
              "max-[768px]:[&_>_p:not(.support-eyebrow)]:text-[11px]",
            ].join(" ")}
          >
            <p
              className={[
                "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
                "[&]:mb-3.75",
              ].join(" ")}
            >
              OTHER WAYS TO GET HELP
            </p>
            <h2>We’re always here for you</h2>
            <p>
              Find the right channel for your question.
              <br />
              We’ll help you take the next step.
            </p>
            <div
              className={[
                "support-channel-grid [&]:grid [&]:grid-cols-3 [&]:gap-3",
                "[&]:mt-4.25 max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-2.5",
              ].join(" ")}
            >
              {[
                {
                  icon: MessageCircle,
                  title: "Live Chat",
                  description: "Chat availability",
                  type: "Live Chat",
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  description: "Get help with your project",
                  type: "Email Support",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Build together",
                  type: "Community",
                },
              ].map((c) => (
                <button
                  className={[
                    "support-channel [&]:flex [&]:items-center [&]:gap-2.5 [&]:[border:1px_solid_#242424]",
                    "[&]:rounded-[8px] [&]:p-2.5 [&]:[background:linear-gradient(130deg,#111,#090909)]",
                    "[&]:cursor-pointer [&]:text-left [&]:min-w-0 [&:hover]:border-[#666] [&_strong]:block",
                    "[&_strong]:text-[9px] [&_strong]:font-medium [&_strong]:whitespace-nowrap [&_small]:block",
                    "[&_small]:text-[8px] [&_small]:leading-[1.4] [&_small]:text-[#888]",
                    "[&_small]:mt-1.25 [&_>_svg]:ml-auto [&_>_svg]:shrink-0",
                    "[&_>_svg]:text-[#888] [&_>_svg]:w-3 max-[1200px]:[&_strong]:text-[11px]",
                    "max-[1200px]:[&_small]:text-[10px] max-[1200px]:[&]:p-3.5",
                    "max-[768px]:[&]:p-2.75 max-[768px]:[&_strong]:text-[11px]",
                    "max-[768px]:[&_small]:text-[10px]",
                  ].join(" ")}
                  key={c.title}
                  onClick={() => setContact(c.type)}
                >
                  <span
                    className={[
                      "channel-icon [&]:w-8.25 [&]:h-8.25 [&]:grid [&]:place-items-center",
                      "[&]:[background:#1b1b1b] [&]:rounded-md [&]:text-[#bbb] [&]:shrink-0",
                    ].join(" ")}
                  >
                    <c.icon size={18} />
                  </span>
                  <span>
                    <strong>{c.title}</strong>
                    <small>{c.description}</small>
                  </span>
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>
          <div
            className={[
              "enterprise-support [&]:relative [&]:[border-left:1px_solid_#242424] [&]:p-[5px_0_0_30px]",
              "[&]:isolate [&]:scroll-mt-6.25 max-[1200px]:[&]:[border-left:0]",
              "max-[1200px]:[&]:[border-top:1px_solid_#242424] max-[1200px]:[&]:p-[24px_0_0]",
            ].join(" ")}
            id="pricing"
          >
            <div
              className={[
                "enterprise-copy [&]:relative [&]:z-1 [&_.hero-kicker]:text-[6px]",
                "[&_.hero-kicker]:tracking-[1.5px] [&_.hero-kicker]:p-[4px_7px] [&_.hero-kicker]:gap-1.5",
                "[&_.hero-kicker]:mb-3.25 [&_.hero-kicker_>_span]:h-0.75",
                "[&_.hero-kicker_>_span]:w-0.75 [&_h2]:text-[18px] [&_h2]:tracking-[-.4px]",
                "[&_h2]:leading-[1.3] [&_h2]:font-[450] [&_h2]:mb-2.25",
                "[&_>_p:not(.hero-kicker)]:text-[#999] [&_>_p:not(.hero-kicker)]:text-[10px]",
                "[&_>_p:not(.hero-kicker)]:leading-[1.8] max-[1200px]:[&_h2]:text-[22px]",
                "max-[768px]:[&_>_p:not(.hero-kicker)]:max-w-57.5",
              ].join(" ")}
            >
              <p
                className={[
                  "hero-kicker [&]:flex [&]:items-center [&]:gap-3 [&]:w-fit",
                  "[&]:[border:1px_solid_#ffffff16] [&]:rounded-[30px] [&]:p-[8px_13px] [&]:text-[9px]",
                  "[&]:font-medium [&]:tracking-[2px] [&]:text-[#a2a2a2] [&_>_span]:h-1.25",
                  "[&_>_span]:w-1.25 [&_>_span]:[background:#eee] [&_>_span]:[box-shadow:0_0_8px_#aaa]",
                  "[&_>_span]:rounded-[50%] [&_i]:w-px [&_i]:h-1.5 [&_i]:[background:#444]",
                  "max-[600px]:[&]:text-[8px] max-[600px]:[&]:gap-2.25 max-[600px]:[&]:tracking-[1.5px]",
                  "max-[600px]:[&]:p-[7px_11px]",
                ].join(" ")}
              >
                <span />
                ENTERPRISE SUPPORT
              </p>
              <h2>Need dedicated support?</h2>
              <p>
                Priority support, faster response times,
                <br />
                and a dedicated technical account manager.
              </p>
              <button
                className={[
                  "enterprise-button [&]:flex [&]:gap-3 [&]:items-center [&]:text-[10px]",
                  "[&]:[border:1px_solid_#333] [&]:[background:#090909bb] [&]:rounded-[10px]",
                  "[&]:p-[8px_13px] [&]:mt-4 [&]:cursor-pointer [&:hover]:[background:#222]",
                ].join(" ")}
                onClick={() => setContact("Enterprise Support")}
              >
                Contact Sales <ArrowRight size={14} />
              </button>
            </div>
            <div
              className={[
                "support-cube-art [&]:absolute [&]:-right-9.25 [&]:-bottom-6.5 [&]:w-45",
                "[&]:h-45 [&]:z-[-1]",
                "[&]:bg-[linear-gradient(90deg,#090909,transparent_45%),url('/images/cloudforge-hero.png')]",
                "[&]:bg-size-[cover,400px_auto] [&]:bg-position-[center,73%_65%] [&]:opacity-[.8]",
                "[&]:mask-[linear-gradient(90deg,transparent,#000_30%)] max-[1200px]:[&]:-right-5",
                "max-[1200px]:[&]:-bottom-5 max-[768px]:[&]:opacity-[.5]",
              ].join(" ")}
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className={[
            "support-guide-dialog [&]:max-h-[85dvh] [&]:overflow-auto [&]:[background:#0b0b0b]",
            "[&]:max-h-[85dvh] [&]:overflow-auto [&]:[background:#0c0c0c]",
          ].join(" ")}
        >
          <DialogHeader>
            <DialogTitle>
              {selected !== null ? topics[selected].title : "Documentation"}
            </DialogTitle>
            <DialogDescription>
              {selected !== null ? topics[selected].description : "Workspace guides"}
            </DialogDescription>
          </DialogHeader>
          <div
            className={[
              [
                "support-guide-list [&]:flex [&]:flex-col [&]:gap-5.5 [&]:m-[12px_0]",
                "[&_article]:[border-top:1px_solid_#292929] [&_article]:pt-4.5 [&_h3]:text-[14px]",
                "[&_h3]:font-[550] [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:text-[12px]",
                "[&_p]:leading-[1.9] [&]:flex [&]:flex-col [&]:gap-5.5 [&]:my-3",
              ].join(" "),
              "[&_article]:[border-top:1px_solid_#292929] [&_article]:pt-4.5 [&_h3]:text-[14px]",
              "[&_h3]:font-[550] [&_h3]:mb-2 [&_p]:text-[12px] [&_p]:leading-[1.9]",
              "[&_p]:text-muted-foreground",
            ].join(" ")}
          >
            {selected !== null &&
              topics[selected].articles.map((a) => (
                <article key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </article>
              ))}
          </div>
          <p
            className={[
              "support-preview-note [&]:text-[#777] [&]:text-[10px] [&]:leading-[1.7] [&]:text-[10px]",
              "[&]:text-[#777]",
            ].join(" ")}
          >
            Documentation for the current platform preview.
          </p>
        </DialogContent>
      </Dialog>
      <Dialog
        open={contact !== null}
        onOpenChange={(open) => {
          if (!open) setContact(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{contact}</DialogTitle>
            <DialogDescription>
              This support channel is not connected in the current preview.
            </DialogDescription>
          </DialogHeader>
          <div
            className={[
              [
                "support-contact-message [&_.landing-cta]:inline-flex",
                "[&_.landing-cta]:items-center",
                "[&_.landing-cta]:justify-center",
                "[&_.landing-cta]:gap-2.75",
                "[&_.landing-cta]:[background:#f5f5f5]",
                "[&_.landing-cta]:text-sidebar-border",
                "[&_.landing-cta]:[border:1px_solid_#ddd]",
                "[&_.landing-cta]:rounded-[18px]",
                "[&_.landing-cta]:text-[11px]",
                "[&_.landing-cta]:p-[11px_18px]",
                "[&_.landing-cta]:[box-shadow:0_0_22px_#ffffff15]",
                "[&_.landing-cta]:whitespace-nowrap",
                "[&_.landing-cta]:font-medium",
                "[&_.landing-cta]:cursor-pointer [&_p]:text-[12px]",
              ].join(" "),
              "[&_p]:leading-[1.9] [&_p]:text-muted-foreground [&]:flex",
              "[&]:flex-col [&]:items-start [&]:gap-5 [&]:pt-2.5",
            ].join(" ")}
          >
            <Shield size={25} />
            <p>
              You can browse the documentation for help with the demo workspace. Live chat, support
              email, community invitations, and sales contact will become available when support
              services are configured.
            </p>
            <button
              className={[
                "landing-cta [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-3",
                "[&]:[background:#f8f8f8] [&]:text-[#161616] [&]:[border:1px_solid_#dedede] [&]:rounded-[13px]",
                "[&]:text-[13px] [&]:font-[550] [&]:p-[13px_23px]",
                "[&]:[box-shadow:0_0_25px_#ffffff25,0_0_6px_#ffffff1a] [&]:[transition:box-shadow_.2s,background_.2s]",
                "[&]:whitespace-nowrap [&:hover]:[background:#dedede] [&:hover]:[box-shadow:0_0_35px_#ffffff38]",
                "max-[600px]:[&]:text-[12px] max-[600px]:[&]:p-[12px_17px] max-[600px]:[&]:gap-2.25",
                "max-[600px]:[&]:rounded-[11px]",
              ].join(" ")}
              onClick={() => {
                setContact(null);
                setSelected(0);
              }}
            >
              Browse help guides <ArrowRight size={14} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
