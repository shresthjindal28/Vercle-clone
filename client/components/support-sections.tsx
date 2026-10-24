"use client";

import { useState } from "react";
import { GuideCover } from "@/components/guide-cover";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Search, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { issues, guides, services } from "@/lib/support-content";

type Section = "all" | "troubleshooting" | "status" | "guides" | "contact";
export function SupportSections({ section = "all" }: { section?: Section }) {
  const [issueId, setIssueId] = useState("deployment");
  const [guideOpen, setGuideOpen] = useState(false);
  const [assistant, setAssistant] = useState(false);
  const [problem, setProblem] = useState("");
  const [question, setQuestion] = useState("");
  const issue = issues.find((i) => i.id === issueId)!;
  const matches = issues.filter((i) =>
    `${i.title} ${i.description} ${i.causes.join(" ")}`
      .toLowerCase()
      .includes(question.toLowerCase()),
  );
  return (
    <div
      className={[
        [
          "support-continuation [&_.support-eyebrow]:text-[#888] [&_.support-eyebrow]:text-[9px]",
          "[&_.support-eyebrow]:tracking-[2px] [&_.support-eyebrow]:font-medium",
          "[&_.landing-cta]:inline-flex [&_.landing-cta]:items-center [&_.landing-cta]:justify-center",
          [
            "[&_.landing-cta]:gap-2.75 [&_.landing-cta]:[background:#f5f5f5]",
            "[&_.landing-cta]:text-sidebar-border",
          ].join(" "),
          "[&_.landing-cta]:[border:1px_solid_#ddd] [&_.landing-cta]:rounded-[18px]",
          "[&_.landing-cta]:text-[11px] [&_.landing-cta]:p-[11px_18px]",
          "[&_.landing-cta]:[box-shadow:0_0_22px_#ffffff15] [&_.landing-cta]:whitespace-nowrap",
          "[&_.landing-cta]:font-medium [&_.landing-cta]:cursor-pointer",
          "[&_.landing-cta:hover]:[background:#ddd] max-[768px]:[&_.landing-cta]:p-[10px_15px]",
          "max-[768px]:[&_.landing-cta]:text-[10px] [&]:max-w-344 [&]:m-[0_auto]",
          "[&]:p-[0_40px] [&]:text-[#eee]",
        ].join(" "),
        "[&_>_section]:[border-top:1px_solid_#202020] [&_>_section]:p-[45px_0]",
        "[&_>_section]:scroll-mt-6.25 [&_>_.still-need-help]:min-h-82.5",
        "[&_>_.still-need-help]:relative [&_>_.still-need-help]:isolate [&_>_.still-need-help]:overflow-hidden",
        "[&_>_.still-need-help]:p-[55px_0_50px] min-[1500px]:[&]:max-w-364",
        "max-[1200px]:[&]:px-7.5 max-[768px]:[&]:px-5",
        "max-[768px]:[&_>_section]:py-8 max-[768px]:[&_>_.still-need-help]:min-h-107.5",
        "max-[768px]:[&_>_.still-need-help]:p-[32px_0_160px]",
      ].join(" ")}
    >
      {(section === "all" || section === "troubleshooting") && (
        <section
          className="troubleshooting-section"
          id="troubleshooting"
          aria-labelledby="troubleshooting-title"
        >
          <div
            className={[
              "support-section-heading [&]:flex [&]:items-center [&]:justify-between [&]:gap-6.25",
              "[&]:mb-6.25 [&_.support-eyebrow]:mb-3.25",
              "[&_.support-eyebrow]:text-[9px] [&_h2]:text-[30px] [&_h2]:font-medium",
              "[&_h2]:tracking-[-1px] [&_h2]:leading-tight [&_h2]:mb-2.25",
              "[&_>_div_>_p:last-child]:text-[#939393] [&_>_div_>_p:last-child]:text-[12px]",
              "[&_>_div_>_p:last-child]:leading-[1.8] max-[768px]:[&]:items-start max-[768px]:[&]:flex-col",
              "max-[768px]:[&]:gap-3.75 max-[768px]:[&]:mb-5 max-[768px]:[&_h2]:text-[27px]",
              "max-[768px]:[&_>_div_>_p:last-child]:text-[11px]",
              "max-[768px]:[&_.support-eyebrow]:text-[8px]",
            ].join(" ")}
          >
            <div>
              <p
                className={[
                  "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
                  "[&]:mb-3.75",
                ].join(" ")}
              >
                TROUBLESHOOTING
              </p>
              <h2 id="troubleshooting-title">Stuck on something? Let’s fix it.</h2>
              <p>
                Select an issue to get step-by-step solutions, or describe your problem with AI.
              </p>
            </div>
            <Button
              className={[
                "landing-cta [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-3",
                "[&]:[background:#f8f8f8] [&]:text-[#161616] [&]:[border:1px_solid_#dedede] [&]:rounded-[13px]",
                "[&]:text-[13px] [&]:font-[550] [&]:p-[13px_23px]",
                "[&]:[box-shadow:0_0_25px_#ffffff25,0_0_6px_#ffffff1a] [&]:[transition:box-shadow_.2s,background_.2s]",
                "[&]:whitespace-nowrap [&:hover]:[background:#dedede] [&:hover]:[box-shadow:0_0_35px_#ffffff38]",
                "max-[600px]:[&]:text-[12px] max-[600px]:[&]:p-[12px_17px] max-[600px]:[&]:gap-2.25",
                [
                  "max-[600px]:[&]:rounded-[11px] support-ai-button [&]:h-9.5 [&]:rounded-[18px]!",
                  "[&]:text-[11px] [&]:px-4.5 [&]:[box-shadow:0_0_22px_#ffffff18]",
                  "[&]:shrink-0",
                ].join(" "),
              ].join(" ")}
              onClick={() => setAssistant(true)}
            >
              Try AI Support <ArrowRight size={14} />
            </Button>
          </div>
          <div
            className={[
              "troubleshooting-layout [&]:grid [&]:grid-cols-[275px_minmax(0,1fr)] [&]:gap-5",
              "min-[1500px]:[&]:grid-cols-[300px_minmax(0,1fr)]",
              "max-[1200px]:[&]:grid-cols-[230px_minmax(0,1fr)] max-[1200px]:[&]:gap-4",
              "max-[768px]:[&]:grid-cols-[1fr]",
            ].join(" ")}
          >
            <div
              className={[
                "issue-navigation [&]:flex [&]:flex-col [&]:justify-between [&]:gap-2.25",
                "max-[1200px]:[&]:justify-start max-[768px]:[&]:grid",
                "max-[768px]:[&]:grid-cols-2 max-[768px]:[&]:gap-2",
              ].join(" ")}
              aria-label="Troubleshooting issues"
            >
              {issues.map((i) => (
                <button
                  key={i.id}
                  className={[
                    "issue-button [&]:flex [&]:items-center [&]:gap-2.75 [&]:p-[15px_13px]",
                    "[&]:[border:1px_solid_transparent] [&]:rounded-[9px] [&]:text-left [&]:w-full [&]:cursor-pointer",
                    "[&]:min-w-0 [&:hover]:[background:#111]",
                    "[&.issue-active]:[background:linear-gradient(120deg,#1b1b1b,#090909)]",
                    "[&.issue-active]:border-[#666]",
                    "[&.issue-active]:[box-shadow:0_0_15px_#ffffff10,inset_0_1px_5px_#ffffff09]",
                    "[&_strong]:text-[11px] [&_strong]:font-medium [&_strong]:block [&_strong]:mb-1",
                    "[&_small]:block [&_small]:text-[9px] [&_small]:text-[#888] [&_small]:leading-[1.6]",
                    "[&_>_svg]:ml-auto [&_>_svg]:shrink-0 [&_>_svg]:text-[#bbb] min-[1500px]:[&_strong]:text-[12px]",
                    "min-[1500px]:[&_small]:text-[10px] max-[768px]:[&]:p-[10px_8px] max-[768px]:[&]:gap-2",
                    "max-[768px]:[&]:items-start max-[768px]:[&_strong]:text-[10px]",
                    "max-[768px]:[&_strong]:leading-normal max-[768px]:[&_small]:text-[8px]",
                    "max-[768px]:[&_>_svg]:hidden",
                    issueId === i.id
                      ? [
                          "issue-active [&_.issue-icon]:[box-shadow:inset_0_0_10px_#ffffff10]",
                          "[&_.issue-icon]:[border:1px_solid_#ffffff15] [&_.issue-icon]:text-[#eee]",
                        ].join(" ")
                      : "",
                  ].join(" ")}
                  aria-pressed={issueId === i.id}
                  onClick={() => setIssueId(i.id)}
                >
                  <span
                    className={[
                      "issue-icon [&]:w-9.25 [&]:h-9.5 [&]:grid [&]:place-items-center",
                      "[&]:[background:linear-gradient(140deg,#202020,#0d0d0d)] [&]:rounded-[7px]",
                      "[&]:shrink-0 [&]:text-[#ccc] max-[768px]:[&]:w-7.25 max-[768px]:[&]:h-7.75",
                      "max-[768px]:[&_svg]:w-4.5",
                    ].join(" ")}
                  >
                    <i.icon size={22} />
                  </span>
                  <span>
                    <strong>{i.title}</strong>
                    <small>{i.description}</small>
                  </span>
                  {issueId === i.id && <ArrowUpRight size={15} />}
                </button>
              ))}
            </div>
            <Card
              className={[
                "troubleshooting-card [&]:[background:linear-gradient(120deg,#0c0c0c,#080808)]",
                "[&]:[border:1px_solid_#242424] [&]:rounded-[12px] [&]:[box-shadow:none] [&]:p-0",
              ].join(" ")}
            >
              <CardContent
                className={[
                  "troubleshooting-content [&]:grid [&]:grid-cols-[1fr_1fr] [&]:gap-6",
                  "[&]:p-6.75 min-[1500px]:[&]:p-8 min-[1500px]:[&]:gap-8",
                  "max-[1200px]:[&]:grid-cols-[1fr] max-[1200px]:[&]:gap-6.25",
                  "max-[1200px]:[&]:p-6 max-[768px]:[&]:p-5",
                ].join(" ")}
              >
                <div
                  className={[
                    "issue-solution [&_h3]:text-[16px] [&_h3]:font-medium [&_h3]:tracking-[-0.25px]",
                    "[&_h3]:mb-2.25 [&_>_p]:text-[10px] [&_>_p]:text-[#888] [&_>_p]:leading-[1.8]",
                    "max-[768px]:[&_h3]:text-[17px]",
                  ].join(" ")}
                  aria-live="polite"
                >
                  <h3>{issue.heading}</h3>
                  <p>{issue.intro}</p>
                  <ol
                    className={[
                      "solution-steps [&]:m-[30px_0_26px] [&]:[list-style:none] [&]:p-0 [&_li]:flex",
                      "[&_li]:items-start [&_li]:gap-4 [&_li]:relative [&_li]:pb-6.25",
                      '[&_li:last-child]:pb-0 [&_li:not(:last-child)::after]:[content:""]',
                      "[&_li:not(:last-child)::after]:absolute [&_li:not(:last-child)::after]:left-2.25",
                      "[&_li:not(:last-child)::after]:top-5.25 [&_li:not(:last-child)::after]:bottom-0",
                      "[&_li:not(:last-child)::after]:w-px [&_li:not(:last-child)::after]:[background:#383838]",
                      "[&_li_>_span]:w-5 [&_li_>_span]:h-5 [&_li_>_span]:[background:#eee]",
                      "[&_li_>_span]:text-[#171717] [&_li_>_span]:text-[10px] [&_li_>_span]:grid",
                      "[&_li_>_span]:place-items-center [&_li_>_span]:rounded-[50%] [&_li_>_span]:shrink-0",
                      "[&_li_>_span]:relative [&_li_>_span]:z-1 [&_li_>_span]:[border:1px_solid_#999]",
                      "[&_li_>_span]:[box-shadow:0_0_12px_#ffffff10] [&_li_>_.step-muted]:[background:#222]",
                      "[&_li_>_.step-muted]:text-[#ddd] [&_li_>_.step-muted]:border-[#444] [&_h4]:text-[11px]",
                      "[&_h4]:font-medium [&_h4]:mb-1.25 [&_h4]:leading-[1.4] [&_p]:text-[#898989]",
                      "[&_p]:text-[10px] [&_p]:leading-[1.7] [&_p]:max-w-75",
                      "min-[1500px]:[&_p]:text-[11px] min-[1500px]:[&_h4]:text-[12px]",
                      "max-[1200px]:[&_p]:max-w-none max-[768px]:[&_p]:text-[11px]",
                      "max-[768px]:[&_h4]:text-[12px] max-[768px]:[&]:mt-6",
                    ].join(" ")}
                  >
                    {issue.steps.map((s, i) => (
                      <li key={s.title}>
                        <span className={i === 1 ? "step-muted" : ""}>{i + 1}</span>
                        <div>
                          <h4>{s.title}</h4>
                          <p>{s.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <Button
                    className={[
                      "landing-cta [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-3",
                      "[&]:[background:#f8f8f8] [&]:text-[#161616] [&]:[border:1px_solid_#dedede] [&]:rounded-[13px]",
                      "[&]:text-[13px] [&]:font-[550] [&]:p-[13px_23px]",
                      "[&]:[box-shadow:0_0_25px_#ffffff25,0_0_6px_#ffffff1a] [&]:[transition:box-shadow_.2s,background_.2s]",
                      "[&]:whitespace-nowrap [&:hover]:[background:#dedede] [&:hover]:[box-shadow:0_0_35px_#ffffff38]",
                      "max-[600px]:[&]:text-[12px] max-[600px]:[&]:p-[12px_17px] max-[600px]:[&]:gap-2.25",
                      [
                        "max-[600px]:[&]:rounded-[11px] detailed-guide-button [&]:text-[10px] [&]:h-8.75",
                        "[&]:p-[0_17px] [&]:rounded-[18px]!",
                      ].join(" "),
                    ].join(" ")}
                    onClick={() => setGuideOpen(true)}
                  >
                    View detailed guide <ArrowRight size={14} />
                  </Button>
                </div>
                <div
                  className={[
                    "issue-preview [&]:[background:#050505] [&]:[border:1px_solid_#202020] [&]:rounded-[10px]",
                    "[&]:p-3.5 [&]:min-w-0 [&]:flex [&]:flex-col max-[768px]:[&]:p-3",
                  ].join(" ")}
                >
                  <Tabs
                    defaultValue="logs"
                    className={"issue-tabs [&]:min-h-58.75 max-[1200px]:[&]:min-h-50"}
                  >
                    <div
                      className={[
                        "issue-tab-header [&]:flex [&]:items-center [&]:justify-between [&]:gap-1.75 [&]:mb-2.5",
                        '**:data-[slot="tabs-list"]:[background:transparent] **:data-[slot="tabs-list"]:p-0',
                        '**:data-[slot="tabs-list"]:gap-px **:data-[slot="tabs-list"]:h-6.75',
                        '**:data-[slot="tabs-trigger"]:text-[8px] **:data-[slot="tabs-trigger"]:rounded-sm',
                        '**:data-[slot="tabs-trigger"]:p-[5px_7px] **:data-[slot="tabs-trigger"]:h-6.25',
                        [
                          '**:data-[slot="tabs-trigger"]:text-[#777]',
                          '[&_[data-slot="tabs-trigger"][data-active]]:text-[#eee]',
                        ].join(" "),
                        '[&_[data-slot="tabs-trigger"][data-active]]:[background:#252525]',
                        'min-[1500px]:**:data-[slot="tabs-trigger"]:text-[9px]',
                        'max-[768px]:**:data-[slot="tabs-trigger"]:text-[7px]',
                        'max-[768px]:**:data-[slot="tabs-trigger"]:px-1.25',
                      ].join(" ")}
                    >
                      <TabsList>
                        <TabsTrigger value="logs">Build Logs</TabsTrigger>
                        <TabsTrigger value="environment">Environment</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      <span
                        className={[
                          "preview-log-badge [&]:inline-block [&]:[border:1px_solid_#555] [&]:[background:#252525]",
                          "[&]:text-[8px] [&]:p-[3px_6px] [&]:rounded-[5px] [&]:whitespace-nowrap",
                          "[&]:text-[#ccc]",
                        ].join(" ")}
                      >
                        • Preview
                      </span>
                    </div>
                    <TabsContent value="logs">
                      <div
                        className={[
                          [
                            "issue-code [&]:[font:9px/2_var(--font-geist-mono),monospace] [&]:text-[#858585]",
                            "[&]:overflow-auto",
                          ].join(" "),
                          "[&]:min-h-51.25 [&_>_div]:flex [&_>_div]:gap-3 [&_>_div]:whitespace-pre",
                          "[&_time]:text-[#454545] [&_time]:shrink-0 [&_code]:[font:inherit]",
                          "[&_.log-emphasis]:text-[#eee] [&_.log-emphasis]:font-medium min-[1500px]:[&]:text-[10px]",
                          "max-[768px]:[&]:text-[8px]",
                        ].join(" ")}
                        aria-label="Example diagnostic logs"
                      >
                        {issue.logs.map((line, i) => (
                          <div
                            className={/Error|×|Warning/.test(line) ? "log-emphasis" : ""}
                            key={i}
                          >
                            <time>12:03:{String(12 + i).padStart(2, "0")}</time>
                            <code>{line}</code>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="environment">
                      <div
                        className={[
                          "environment-preview [&]:p-[6px_1px] [&]:text-[10px] [&_>_p]:text-muted-foreground",
                          "[&_>_p]:mb-5 [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:gap-2",
                          "[&_>_div]:p-[14px_0] [&_>_div]:[border-bottom:1px_solid_#242424] [&_>_div]:text-muted-foreground",
                          "[&_code]:[font:9px_var(--font-geist-mono)] [&_small]:block [&_small]:text-[#666]",
                          "[&_small]:text-[9px] [&_small]:leading-[1.8] [&_small]:mt-5",
                        ].join(" ")}
                      >
                        <p>Preview environment</p>
                        {["NODE_ENV", "DATABASE_URL", "API_SECRET"].map((v, i) => (
                          <div key={v}>
                            <code>{v}</code>
                            <span>{i === 0 ? "production" : "••••••••••••"}</span>
                          </div>
                        ))}
                        <small>Illustrative values. Secrets are never displayed.</small>
                      </div>
                    </TabsContent>
                    <TabsContent value="settings">
                      <div
                        className={[
                          "environment-preview [&]:p-[6px_1px] [&]:text-[10px] [&_>_p]:text-muted-foreground",
                          "[&_>_p]:mb-5 [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:gap-2",
                          "[&_>_div]:p-[14px_0] [&_>_div]:[border-bottom:1px_solid_#242424] [&_>_div]:text-muted-foreground",
                          "[&_code]:[font:9px_var(--font-geist-mono)] [&_small]:block [&_small]:text-[#666]",
                          "[&_small]:text-[9px] [&_small]:leading-[1.8] [&_small]:mt-5",
                        ].join(" ")}
                      >
                        <p>Build configuration</p>
                        {[
                          { name: "Framework", value: "Next.js" },
                          { name: "Build command", value: "npm run build" },
                          { name: "Output", value: "Framework default" },
                        ].map((v) => (
                          <div key={v.name}>
                            <span>{v.name}</span>
                            <code>{v.value}</code>
                          </div>
                        ))}
                        <small>Sample configuration for this diagnostic preview.</small>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div
                    className={[
                      "common-causes [&]:[border-top:1px_solid_#202020] [&]:mt-3.5 [&]:p-[18px_6px_0]",
                      "[&_h4]:text-[11px] [&_h4]:font-medium [&_h4]:mb-2.5 [&_ul]:[list-style:disc]",
                      "[&_ul]:pl-3.5 [&_ul]:text-[#888] [&_ul]:text-[10px] [&_ul]:leading-loose",
                      "max-[1200px]:[&_ul]:columns-2 max-[768px]:[&_ul]:columns-1",
                    ].join(" ")}
                  >
                    <h4>Common causes</h4>
                    <ul>
                      {issue.causes.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
      {(section === "all" || section === "status") && (
        <section
          className={[
            "platform-status-section [&_.support-section-heading]:mb-2.25",
            "[&_.support-section-heading_h2]:text-[25px]",
          ].join(" ")}
          id="platform-status"
          aria-labelledby="platform-status-title"
        >
          <div
            className={[
              "support-section-heading [&]:flex [&]:items-center [&]:justify-between [&]:gap-6.25",
              "[&]:mb-6.25 [&_.support-eyebrow]:mb-3.25",
              "[&_.support-eyebrow]:text-[9px] [&_h2]:text-[30px] [&_h2]:font-medium",
              "[&_h2]:tracking-[-1px] [&_h2]:leading-tight [&_h2]:mb-2.25",
              "[&_>_div_>_p:last-child]:text-[#939393] [&_>_div_>_p:last-child]:text-[12px]",
              "[&_>_div_>_p:last-child]:leading-[1.8] max-[768px]:[&]:items-start max-[768px]:[&]:flex-col",
              "max-[768px]:[&]:gap-3.75 max-[768px]:[&]:mb-5 max-[768px]:[&_h2]:text-[27px]",
              "max-[768px]:[&_>_div_>_p:last-child]:text-[11px]",
              "max-[768px]:[&_.support-eyebrow]:text-[8px]",
            ].join(" ")}
          >
            <div>
              <p
                className={[
                  "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
                  "[&]:mb-3.75",
                ].join(" ")}
              >
                PLATFORM STATUS
              </p>
              <h2
                id="platform-status-title"
                className={[
                  "status-heading [&]:flex [&]:items-center [&]:gap-2.5 [&_.operational-dot]:w-2.25",
                  "[&_.operational-dot]:h-2.25 [&_.operational-dot]:[box-shadow:0_0_14px_#ffffff70]",
                ].join(" ")}
              >
                <span
                  className={[
                    "operational-dot [&]:inline-block [&]:w-1.5 [&]:h-1.5 [&]:[background:#ddd]",
                    "[&]:rounded-[50%] [&]:[box-shadow:0_0_10px_#ffffff24] [&]:shrink-0",
                  ].join(" ")}
                />
                All systems operational
              </h2>
              <p>Our platform is running smoothly. We’ll post updates here if anything changes.</p>
            </div>
            <Link
              href="/status"
              className={[
                "support-outline-button [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-2.5",
                "[&]:p-[10px_16px] [&]:[border:1px_solid_#303030] [&]:rounded-[20px]",
                "[&]:[background:#090909b3] [&]:text-[#ddd] [&]:text-[10px] [&]:whitespace-nowrap",
                "[&]:cursor-pointer [&]:h-auto [&:hover]:border-[#888] [&:hover]:[background:#181818]",
              ].join(" ")}
            >
              View status page <ArrowRight size={13} />
            </Link>
          </div>
          <p
            className={[
              "status-demo-label [&]:text-[#666] [&]:text-[7px] [&]:tracking-[1.4px]",
              "[&]:m-[14px_0_18px] max-[768px]:[&]:leading-[1.7] max-[768px]:[&]:tracking-[1px]",
            ].join(" ")}
          >
            STATUS PREVIEW · SAMPLE DATA, NOT LIVE MONITORING
          </p>
          <div
            className={[
              "service-status-grid [&]:grid [&]:grid-cols-6 [&]:gap-4.25",
              "max-[1200px]:[&]:grid-cols-3",
              "max-[768px]:[&]:grid-cols-2 max-[768px]:[&]:gap-3",
            ].join(" ")}
          >
            {services.map((s, i) => (
              <Card
                className={[
                  "service-status-card [&]:[background:linear-gradient(140deg,#101010,#080808)]",
                  "[&]:[border:1px_solid_#242424] [&]:rounded-[9px] [&]:[box-shadow:none] [&]:p-[18px_0]",
                  '[&]:gap-0 **:data-[slot="card-content"]:p-[0_17px] [&_h3]:flex [&_h3]:items-center',
                  "[&_h3]:gap-1.75 [&_h3]:text-[10px] [&_h3]:font-medium [&_h3]:mb-3",
                  "[&_p]:flex [&_p]:items-center [&_p]:gap-1.75 [&_p]:text-[9px] [&_p]:text-[#bbb]",
                  "[&_p]:mb-2.25 [&_p_.operational-dot]:w-1.25 [&_p_.operational-dot]:h-1.25",
                  "[&_small]:text-[9px] [&_small]:text-[#777]",
                  'max-[768px]:**:data-[slot="card-content"]:px-3.75',
                ].join(" ")}
                key={s}
              >
                <CardContent>
                  <h3>
                    <span
                      className={[
                        "operational-dot [&]:inline-block [&]:w-1.5 [&]:h-1.5 [&]:[background:#ddd]",
                        "[&]:rounded-[50%] [&]:[box-shadow:0_0_10px_#ffffff24] [&]:shrink-0",
                      ].join(" ")}
                    />
                    {s}
                  </h3>
                  <p>
                    <span
                      className={[
                        "operational-dot [&]:inline-block [&]:w-1.5 [&]:h-1.5 [&]:[background:#ddd]",
                        "[&]:rounded-[50%] [&]:[box-shadow:0_0_10px_#ffffff24] [&]:shrink-0",
                      ].join(" ")}
                    />
                    Operational
                  </p>
                  <small>{i === 0 || i === 4 ? "99.99" : "99.98"}% uptime</small>
                  <div
                    className={[
                      "uptime-bars [&]:mt-3.75 [&]:h-4 [&]:flex [&]:gap-0.75 [&]:flex-1",
                      "[&]:max-w-90 [&]:ml-auto [&_>_span]:[background:linear-gradient(#ccc,#777)]",
                      "[&_>_span]:flex-1 [&_>_span]:min-w-px [&_>_span]:rounded-[1px]",
                      "[&_>_span:nth-child(4n)]:opacity-[0.65] [&_>_span:hover]:[background:#fff]",
                      "[&_>_span:hover]:opacity-[1] [&_i]:h-6 [&_i]:flex-1 [&_i]:rounded-xs",
                      "[&_i]:[background:#aaa] max-[1200px]:[&]:min-w-25",
                    ].join(" ")}
                    role="img"
                    aria-label={`Illustrative ${s} uptime history`}
                  >
                    {Array.from({ length: 28 }, (_, j) => (
                      <span key={j} title="Sample operational interval" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {section === "status" && (
            <div
              className={[
                "status-history [&]:mt-8.75 [&]:p-6.25 [&]:[border:1px_solid_#292929]",
                "[&]:rounded-[10px] [&_h3]:text-[18px] [&_h3]:mb-3 [&_p]:text-[12px]",
                "[&_p]:text-[#999] [&_p]:leading-[1.8]",
              ].join(" ")}
            >
              <h3>Past incidents</h3>
              <p>
                A live incident history has not been connected. These status cards are a visual
                preview.
              </p>
            </div>
          )}
        </section>
      )}
      {(section === "all" || section === "guides") && (
        <section
          className={[
            "popular-guides-section [&_.support-section-heading_h2]:text-[26px]",
            "max-[768px]:[&_.support-section-heading_h2]:text-[25px]",
          ].join(" ")}
          id="popular-guides"
          aria-labelledby="popular-guides-title"
        >
          <div
            className={[
              "support-section-heading [&]:flex [&]:items-center [&]:justify-between [&]:gap-6.25",
              "[&]:mb-6.25 [&_.support-eyebrow]:mb-3.25",
              "[&_.support-eyebrow]:text-[9px] [&_h2]:text-[30px] [&_h2]:font-medium",
              "[&_h2]:tracking-[-1px] [&_h2]:leading-tight [&_h2]:mb-2.25",
              "[&_>_div_>_p:last-child]:text-[#939393] [&_>_div_>_p:last-child]:text-[12px]",
              "[&_>_div_>_p:last-child]:leading-[1.8] max-[768px]:[&]:items-start max-[768px]:[&]:flex-col",
              "max-[768px]:[&]:gap-3.75 max-[768px]:[&]:mb-5 max-[768px]:[&_h2]:text-[27px]",
              "max-[768px]:[&_>_div_>_p:last-child]:text-[11px]",
              "max-[768px]:[&_.support-eyebrow]:text-[8px]",
            ].join(" ")}
          >
            <div>
              <p
                className={[
                  "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
                  "[&]:mb-3.75",
                ].join(" ")}
              >
                POPULAR GUIDES
              </p>
              <h2 id="popular-guides-title">Helpful resources from the community.</h2>
              <p>Step-by-step guides and in-depth articles to help you build and scale.</p>
            </div>
            <Link
              href="/guides"
              className={[
                "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
                "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
              ].join(" ")}
            >
              View all guides <ArrowRight size={13} />
            </Link>
          </div>
          <div
            className={[
              "popular-guides-grid [&]:grid [&]:grid-cols-4 [&]:gap-5",
              "max-[1200px]:[&]:gap-3.5 max-[768px]:[&]:grid-cols-2",
              "max-[768px]:[&]:gap-3",
            ].join(" ")}
          >
            {guides.map((g) => (
              <Link
                href={`/guides/${g.slug}`}
                key={g.slug}
                className={[
                  "popular-guide-card [&]:[background:linear-gradient(135deg,#0c0c0c,#070707)]",
                  "[&]:[border:1px_solid_#242424] [&]:rounded-[10px] [&]:p-2.25 [&]:flex [&]:flex-col",
                  "[&]:overflow-hidden [&]:[transition:border-color_0.2s,transform_0.2s] [&:hover]:border-[#777]",
                  "[&:hover]:transform-[translateY(-3px)] [&:hover_small_svg]:opacity-[1]",
                ].join(" ")}
              >
                <GuideCover art={g.art} />
                <div
                  className={[
                    "guide-card-copy [&]:p-[13px_9px_7px] [&]:flex [&]:flex-col [&]:flex-1",
                    "[&_.support-eyebrow]:text-[7px] [&_.support-eyebrow]:tracking-[1px]",
                    "[&_.support-eyebrow]:text-[#777] [&_.support-eyebrow]:mb-2.75 [&_h3]:text-[15px]",
                    "[&_h3]:font-[450] [&_h3]:tracking-[-0.2px] [&_h3]:leading-[1.45]",
                    "[&_h3]:mb-2.25 [&_>_p:not(.support-eyebrow)]:text-[#929292]",
                    "[&_>_p:not(.support-eyebrow)]:text-[11px] [&_>_p:not(.support-eyebrow)]:leading-[1.7]",
                    "[&_>_p:not(.support-eyebrow)]:mb-4 [&_small]:flex [&_small]:items-center",
                    "[&_small]:justify-between [&_small]:text-[10px] [&_small]:text-[#777]",
                    "[&_small]:mt-auto [&_small_svg]:opacity-[0] [&_small_svg]:[transition:opacity_0.2s]",
                    "max-[1200px]:[&_h3]:text-[13px] max-[1200px]:[&_>_p:not(.support-eyebrow)]:text-[10px]",
                    "max-[768px]:[&]:p-[12px_5px_5px] max-[768px]:[&_.support-eyebrow]:text-[6px]",
                    "max-[768px]:[&_.support-eyebrow]:leading-[1.6]",
                    "max-[768px]:[&_.support-eyebrow]:tracking-[0.6px] max-[768px]:[&_h3]:text-[12px]",
                    "max-[768px]:[&_>_p:not(.support-eyebrow)]:text-[10px] max-[768px]:[&_small]:text-[9px]",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
                      "[&]:mb-3.75",
                    ].join(" ")}
                  >
                    {g.category}
                  </p>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                  <small>
                    {g.minutes} min read <ArrowUpRight size={12} />
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {(section === "all" || section === "contact") && (
        <section
          className="still-need-help"
          id="contact-support"
          aria-labelledby="still-help-title"
        >
          <div
            className={[
              "contact-portal-art [&]:absolute [&]:inset-[0_-20px_0_25%]",
              '[&]:bg-[url("/images/support-portal.png")] [&]:bg-cover',
              "[&]:bg-center [&]:z-[-1]",
              "[&]:mask-[linear-gradient(90deg,transparent,#000_20%)]",
              "max-[768px]:[&]:inset-[150px_-20px_-20px_0] max-[768px]:[&]:bg-cover",
              "max-[768px]:[&]:bg-position-[65%_center]",
              "max-[768px]:[&]:mask-[linear-gradient(180deg,transparent,#000_30%)]",
            ].join(" ")}
            aria-hidden="true"
          />
          <div
            className={[
              "still-help-copy [&]:relative [&]:z-1 [&_h2]:text-[42px] [&_h2]:tracking-[-1.3px]",
              "[&_h2]:font-medium [&_h2]:leading-[1.15] [&_h3]:text-[23px]",
              "[&_h3]:tracking-[-0.5px] [&_h3]:font-[450] [&_h3]:m-[3px_0_17px]",
              "[&_>_p]:text-[12px] [&_>_p]:leading-[1.9] [&_>_p]:text-[#999] [&_>_div]:flex",
              "[&_>_div]:items-center [&_>_div]:gap-3.25 [&_>_div]:mt-6.25",
              "[&_.landing-cta]:text-[11px] [&_.landing-cta]:p-[10px_19px]",
              "[&_.landing-cta]:rounded-[20px] max-[768px]:[&_h2]:text-[36px]",
              "max-[768px]:[&_h3]:text-[20px] max-[768px]:[&_h3]:mt-1.75",
              "max-[768px]:[&_>_p]:text-[11px] max-[768px]:[&_>_p]:max-w-77.5",
              "max-[768px]:[&_>_div]:gap-2.5 max-[768px]:[&_.landing-cta]:text-[10px]",
              "max-[768px]:[&_.landing-cta]:p-[10px_15px]",
              "max-[768px]:[&_.support-outline-button]:text-[10px]",
              "max-[768px]:[&_.support-outline-button]:px-3.25",
            ].join(" ")}
          >
            <h2 id="still-help-title">Still need help?</h2>
            <h3>Our team is here for you.</h3>
            <p>
              Can’t find what you’re looking for? Reach out to our support team
              <br className={"desktop-break max-[768px]:[&]:hidden"} /> and we’ll get back to you as
              soon as possible.
            </p>
            <div>
              <Link
                href="/support/contact"
                className={[
                  "landing-cta [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-3",
                  "[&]:[background:#f8f8f8] [&]:text-[#161616] [&]:[border:1px_solid_#dedede] [&]:rounded-[13px]",
                  "[&]:text-[13px] [&]:font-[550] [&]:p-[13px_23px]",
                  "[&]:[box-shadow:0_0_25px_#ffffff25,0_0_6px_#ffffff1a] [&]:[transition:box-shadow_.2s,background_.2s]",
                  "[&]:whitespace-nowrap [&:hover]:[background:#dedede] [&:hover]:[box-shadow:0_0_35px_#ffffff38]",
                  "max-[600px]:[&]:text-[12px] max-[600px]:[&]:p-[12px_17px] max-[600px]:[&]:gap-2.25",
                  "max-[600px]:[&]:rounded-[11px]",
                ].join(" ")}
              >
                Contact Support <ArrowRight size={14} />
              </Link>
              <Button
                variant="outline"
                className={[
                  "support-outline-button [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-2.5",
                  "[&]:p-[10px_16px] [&]:[border:1px_solid_#303030] [&]:rounded-[20px]",
                  "[&]:[background:#090909b3] [&]:text-[#ddd] [&]:text-[10px] [&]:whitespace-nowrap",
                  "[&]:cursor-pointer [&]:h-auto [&:hover]:border-[#888] [&:hover]:[background:#181818]",
                ].join(" ")}
                onClick={() => setAssistant(true)}
              >
                <MessageCircle size={14} />
                Chat with AI
              </Button>
            </div>
          </div>
        </section>
      )}
      <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
        <DialogContent
          className={[
            "support-guide-dialog [&]:max-h-[85dvh] [&]:overflow-auto [&]:[background:#0b0b0b]",
            "[&]:max-h-[85dvh] [&]:overflow-auto [&]:[background:#0c0c0c]",
          ].join(" ")}
        >
          <DialogHeader>
            <DialogTitle>{issue.heading}</DialogTitle>
            <DialogDescription>{issue.intro}</DialogDescription>
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
            {issue.steps.map((s, i) => (
              <article key={s.title}>
                <h3>
                  {i + 1}. {s.title}
                </h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <Link
            className={[
              "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
              "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
            ].join(" ")}
            href={`/guides/${guides.find((g) => g.issue === issue.id)?.slug ?? "fix-build-errors"}`}
          >
            Open full guide <ArrowRight size={14} />
          </Link>
        </DialogContent>
      </Dialog>
      <Dialog open={assistant} onOpenChange={setAssistant}>
        <DialogContent
          className={[
            "support-assistant-dialog [&_.support-preview-note]:flex [&_.support-preview-note]:items-center",
            "[&_.support-preview-note]:gap-1.5",
          ].join(" ")}
        >
          <DialogHeader>
            <DialogTitle>
              <span className={"assistant-title [&]:flex [&]:items-center [&]:gap-2.25"}>
                <Sparkles size={18} />
                Let’s find a solution.
              </span>
            </DialogTitle>
            <DialogDescription>
              Describe your issue to find matching troubleshooting guides. AI chat is not connected
              yet.
            </DialogDescription>
          </DialogHeader>
          <form
            className={[
              "support-assistant-form [&]:flex [&]:gap-2.5 [&]:my-3.75 [&_input]:min-w-0",
              "[&_button]:whitespace-nowrap max-[768px]:[&]:flex-col max-[768px]:[&_button]:self-start",
            ].join(" ")}
            onSubmit={(e) => {
              e.preventDefault();
              setQuestion(problem.trim());
            }}
          >
            <Input
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Try ‘deployment’, ‘DNS’, or ‘database’"
              aria-label="Describe your issue"
              required
            />
            <Button type="submit" variant="secondary">
              <Search size={14} />
              Find help
            </Button>
          </form>
          {question && (
            <div
              className={[
                "assistant-results [&_>_p]:text-[#999] [&_>_p]:text-[12px] [&_>_p]:mb-3.75",
                "[&_button]:flex [&_button]:items-center [&_button]:gap-2.5 [&_button]:w-full",
                "[&_button]:p-[14px_10px] [&_button]:[border-top:1px_solid_#292929] [&_button]:text-left",
                "[&_button]:text-[13px] [&_button]:cursor-pointer [&_button_svg:last-child]:ml-auto",
                "[&_button:hover]:[background:#171717]",
              ].join(" ")}
              aria-live="polite"
            >
              <p>
                {matches.length
                  ? "Here are the closest guides:"
                  : "No exact match. Start with one of these common issues:"}
              </p>
              {(matches.length ? matches : issues.slice(0, 3)).map((i) => (
                <button
                  key={i.id}
                  onClick={() => {
                    setIssueId(i.id);
                    setAssistant(false);
                    setGuideOpen(true);
                  }}
                >
                  <i.icon size={16} />
                  {i.title}
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          )}
          <p
            className={[
              "support-preview-note [&]:text-[#777] [&]:text-[10px] [&]:leading-[1.7] [&]:text-[10px]",
              "[&]:text-[#777]",
            ].join(" ")}
          >
            <Check size={11} />
            Search runs locally. Your text is not sent anywhere.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
