"use client";

import { useState } from "react";
import { SupportSections } from "@/components/support-sections";
import { LandingSupport } from "@/components/landing-support";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronDown,
  Database,
  Globe2,
  LoaderCircle,
  Menu,
  Play,
  Shield,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const features = [
  { icon: Globe2, title: "Global Edge Network", description: "Blazing fast deployments worldwide" },
  { icon: Zap, title: "Automatic CI/CD", description: "Deploy on every push" },
  { icon: Database, title: "Scales to Zero", description: "Only pay for what you use" },
  { icon: Shield, title: "Secure by Default", description: "Built-in security and SSL" },
  { icon: Terminal, title: "Developer First", description: "Built for modern teams" },
];
export function Landing() {
  const [video, setVideo] = useState(false);
  const [mobile, setMobile] = useState(false);
  return (
    <div
      className={[
        "landing [&]:[background:#000] [&]:text-[#f5f5f5] [&]:min-h-dvh",
        "[&]:[font-family:var(--font-geist-sans),sans-serif]",
      ].join(" ")}
    >
      <header
        className={[
          "landing-header [&]:h-22 [&]:max-w-360 [&]:m-auto [&]:p-[0_64px]",
          "[&]:flex [&]:items-center [&]:justify-between [&]:[border-bottom:1px_solid_#ffffff0b] [&]:relative",
          "[&]:z-10 [&]:gap-6 max-[1200px]:[&]:px-8.75 max-[600px]:[&]:h-19",
          "max-[600px]:[&]:px-5.5 max-[600px]:[&]:gap-3.75",
        ].join(" ")}
      >
        <Link
          href="/"
          className={[
            "landing-brand [&]:inline-flex [&]:items-center [&]:gap-2.75 [&]:text-[20px]",
            "[&]:font-[650] [&]:tracking-[-.7px] [&]:whitespace-nowrap",
            "max-[600px]:[&]:text-[18px] max-[600px]:[&]:gap-2 max-[600px]:[&_svg]:w-6.25",
          ].join(" ")}
        >
          <Box size={29} strokeWidth={2.6} />
          <span>CloudForge</span>
        </Link>
        <nav
          className={
            mobile
              ? [
                  [
                    "landing-nav [&]:flex [&]:gap-8 [&]:items-center [&_a]:flex [&_a]:items-center",
                    "[&_a]:gap-1.25",
                  ].join(" "),
                  "[&_a]:text-[12px] [&_a]:text-[#bcbcbc] [&_a]:[transition:color_.2s] [&_a:hover]:text-white",
                  "max-[1200px]:[&]:gap-5 max-[900px]:[&]:hidden max-[900px]:[&.nav-open]:flex",
                  "max-[900px]:[&.nav-open]:absolute max-[900px]:[&.nav-open]:top-18.75",
                  "max-[900px]:[&.nav-open]:left-5 max-[900px]:[&.nav-open]:right-5",
                  "max-[900px]:[&.nav-open]:flex-col max-[900px]:[&.nav-open]:items-stretch",
                  "max-[900px]:[&.nav-open]:[background:#111] max-[900px]:[&.nav-open]:[border:1px_solid_#333]",
                  "max-[900px]:[&.nav-open]:rounded-[12px] max-[900px]:[&.nav-open]:p-6",
                  "max-[900px]:[&.nav-open]:gap-6 nav-open",
                ].join(" ")
              : [
                  [
                    "landing-nav [&]:flex [&]:gap-8 [&]:items-center [&_a]:flex [&_a]:items-center",
                    "[&_a]:gap-1.25",
                  ].join(" "),
                  "[&_a]:text-[12px] [&_a]:text-[#bcbcbc] [&_a]:[transition:color_.2s] [&_a:hover]:text-white",
                  "max-[1200px]:[&]:gap-5 max-[900px]:[&]:hidden max-[900px]:[&.nav-open]:flex",
                  "max-[900px]:[&.nav-open]:absolute max-[900px]:[&.nav-open]:top-18.75",
                  "max-[900px]:[&.nav-open]:left-5 max-[900px]:[&.nav-open]:right-5",
                  "max-[900px]:[&.nav-open]:flex-col max-[900px]:[&.nav-open]:items-stretch",
                  "max-[900px]:[&.nav-open]:[background:#111] max-[900px]:[&.nav-open]:[border:1px_solid_#333]",
                  "max-[900px]:[&.nav-open]:rounded-[12px] max-[900px]:[&.nav-open]:p-6",
                  "max-[900px]:[&.nav-open]:gap-6",
                ].join(" ")
          }
          aria-label="Website navigation"
        >
          <a href="#platform" onClick={() => setMobile(false)}>
            Product <ChevronDown size={12} />
          </a>
          <a href="#solutions" onClick={() => setMobile(false)}>
            Solutions <ChevronDown size={12} />
          </a>
          <a href="#pricing" onClick={() => setMobile(false)}>
            Pricing
          </a>
          <a href="#docs" onClick={() => setMobile(false)}>
            Docs
          </a>
          <a href="#solutions">Enterprise</a>
        </nav>
        <div
          className={
            "landing-account [&]:flex [&]:gap-6.25 [&]:items-center max-[600px]:[&]:gap-3.75"
          }
        >
          <Link
            href="/login"
            className={[
              "sign-in [&:hover]:text-white [&]:text-[12px] [&]:text-muted-foreground [&]:whitespace-nowrap",
              "max-[600px]:[&]:text-[12px]",
            ].join(" ")}
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className={[
              "landing-cta [&]:inline-flex [&]:items-center [&]:justify-center [&]:gap-3",
              "[&]:[background:#f8f8f8] [&]:text-[#161616] [&]:[border:1px_solid_#dedede] [&]:rounded-[13px]",
              "[&]:text-[13px] [&]:font-[550] [&]:p-[13px_23px]",
              "[&]:[box-shadow:0_0_25px_#ffffff25,0_0_6px_#ffffff1a] [&]:[transition:box-shadow_.2s,background_.2s]",
              "[&]:whitespace-nowrap [&:hover]:[background:#dedede] [&:hover]:[box-shadow:0_0_35px_#ffffff38]",
              "max-[600px]:[&]:text-[12px] max-[600px]:[&]:p-[12px_17px] max-[600px]:[&]:gap-2.25",
              "max-[600px]:[&]:rounded-[11px] nav-cta [&]:text-[12px] [&]:rounded-[18px]",
              "[&]:p-[11px_17px] [&]:gap-2.25 max-[600px]:[&]:hidden",
            ].join(" ")}
          >
            Start for free <ArrowRight size={14} />
          </Link>
          <button
            className={
              "landing-menu [&]:hidden max-[900px]:[&]:grid max-[900px]:[&]:place-items-center"
            }
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main>
        <section
          className={[
            "landing-hero [&]:max-w-[1600px] [&]:m-auto [&]:relative [&]:min-h-182.5",
            "[&]:h-[min(790px,calc(100svh-120px))] [&]:isolate max-[900px]:[&]:h-auto",
            "max-[900px]:[&]:min-h-260 max-[600px]:[&]:min-h-242.5",
          ].join(" ")}
          aria-labelledby="hero-title"
        >
          <div
            className={[
              "hero-art [&]:absolute [&]:inset-[-35px_0_-5px] [&]:z-[-2]",
              "[&]:bg-[url('/images/cloudforge-hero.png')] [&]:bg-position-[center_bottom]",
              '[&]:bg-cover [&::after]:[content:""] [&::after]:absolute [&::after]:inset-0',
              [
                [
                  "[&::after]:[background:linear-gradient(90deg,#0009_0%,#0004_34%,transparent_65%),linear-gradient(0deg,#000_0%,transparent_19%,transparent_85%,#0008_100%)]",
                ].join(" "),
              ].join(" "),
              "max-[900px]:[&]:top-62.5 max-[900px]:[&]:bg-position-[70%_bottom]",
              "max-[900px]:[&]:bg-size-[auto_790px]",
              "max-[900px]:[&::after]:[background:linear-gradient(180deg,#000_0,transparent_30%,transparent_80%,#000_100%)]",
              "max-[600px]:[&]:top-97.5 max-[600px]:[&]:bottom-0 max-[600px]:[&]:bg-size-[auto_550px]",
              "max-[600px]:[&]:bg-position-[65%_bottom]",
            ].join(" ")}
            aria-hidden="true"
          />
          <div
            className={[
              "hero-copy [&]:relative [&]:z-2 [&]:pt-26.25",
              "[&]:ml-[max(64px,calc((100%-1312px)/2))] [&]:max-w-141.25",
              "[&_h1]:text-[clamp(44px,4.25vw,66px)] [&_h1]:font-[550] [&_h1]:leading-[1.075]",
              "[&_h1]:tracking-[-3px] [&_h1]:m-[25px_0_25px] [&_h1_>_span]:text-[#a4a4a4]",
              "[&_>_p]:text-[#969696] [&_>_p]:text-[15px] [&_>_p]:leading-[1.8] [&_>_p]:max-w-110",
              "min-[1600px]:[&]:ml-36 max-[1200px]:[&]:ml-11.25",
              "max-[1200px]:[&]:max-w-117.5 max-[1200px]:[&_h1]:text-[53px]",
              "max-[1200px]:[&_>_p]:max-w-95 max-[1200px]:[&_>_p]:text-[14px]",
              "max-[900px]:[&]:pt-16.25 max-[900px]:[&]:mx-8.75",
              "max-[900px]:[&]:max-w-150 max-[900px]:[&_h1]:text-[60px]",
              "max-[900px]:[&_>_p]:max-w-110 max-[600px]:[&]:pt-13",
              "max-[600px]:[&]:mx-6 max-[600px]:[&_h1]:text-[clamp(37px,9.4vw,55px)]",
              "max-[600px]:[&_h1]:tracking-[-2px] max-[600px]:[&_h1]:my-6",
              "max-[600px]:[&_>_p]:text-[13px] max-[600px]:[&_>_p]:leading-[1.8]",
              "max-[600px]:[&_>_p]:max-w-87.5",
            ].join(" ")}
          >
            <div
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
              DEPLOY <i /> SCALE <i /> BUILD FASTER
            </div>
            <h1 id="hero-title">
              Your ideas.
              <br />
              Live on the internet.
              <br />
              <span>In seconds.</span>
              <b
                className={[
                  "typing-cursor [&]:inline-block [&]:w-0.5 [&]:h-[.85em] [&]:ml-1.25",
                  "[&]:[background:#aaa] [&]:align-[-.04em] [&]:animate-[pulse_1.5s_step-end_infinite]",
                  "motion-reduce:[&]:animate-none",
                ].join(" ")}
              />
            </h1>
            <p>
              Deploy, scale, and manage your applications with zero infrastructure complexity. From
              prototype to production, CloudForge handles the hard parts.
            </p>
            <div
              className={[
                "hero-buttons [&]:flex [&]:items-center [&]:gap-3.75 [&]:mt-7.25",
                "max-[600px]:[&]:gap-3 max-[600px]:[&]:mt-6.5",
              ].join(" ")}
            >
              <Link
                href="/login"
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
                Start Deploying <ArrowRight size={16} />
              </Link>
              <Button
                variant="outline"
                onClick={() => setVideo(true)}
                className={[
                  "watch-button [&]:h-11.5 [&]:p-[0_22px] [&]:rounded-[12px]",
                  "[&]:[background:#0a0a0ab3]! [&]:[border:1px_solid_#ffffff20] [&]:[box-shadow:none]",
                  "[&]:text-[#e1e1e1] [&]:text-[12px] [&]:gap-2.25 max-[600px]:[&]:px-4",
                  "max-[600px]:[&]:h-10.75 max-[600px]:[&]:text-[11px]",
                ].join(" ")}
              >
                <Play size={13} fill="currentColor" />
                Watch Demo
              </Button>
            </div>
            <div
              className={[
                "hero-trust [&]:flex [&]:items-center [&]:gap-3.25 [&]:mt-8 [&_>_span]:text-[10px]",
                "[&_>_span]:text-[#888] max-[600px]:[&]:gap-2.5 max-[600px]:[&]:mt-6.75",
                "max-[600px]:[&_>_span]:text-[9px] max-[600px]:[&_>_span]:max-w-47.5",
                "max-[600px]:[&_>_span]:leading-normal",
              ].join(" ")}
            >
              <div
                className={[
                  "developer-avatars [&]:flex [&]:pl-0 [&_>_span]:grid [&_>_span]:place-items-center",
                  "[&_>_span]:[border:2px_solid_#111] [&_>_span]:-ml-1.25 [&_>_span]:w-7.25",
                  "[&_>_span]:h-7.25 [&_>_span]:rounded-[50%] [&_>_span]:text-[8px]",
                  "[&_>_span]:font-[650] [&_>_span]:[background:linear-gradient(135deg,#d2d2d2,#4b4b4b)]",
                  "[&_>_span]:text-[#171717] [&_>_span:first-child]:ml-0",
                  "[&_>_span:nth-child(2)]:[background:linear-gradient(135deg,#888,#e6e6e6)]",
                  "max-[600px]:[&_>_span]:w-6.25 max-[600px]:[&_>_span]:h-6.25",
                  "max-[600px]:[&_>_span]:text-[7px]",
                ].join(" ")}
                aria-hidden="true"
              >
                {["SJ", "AK", "ML", "JD"].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <span>Built for developers. Ready for your next idea.</span>
            </div>
          </div>
          <div
            className={[
              "hero-panels [&]:absolute [&]:inset-0 [&]:pointer-events-none [&]:perspective-distant",
              "max-[900px]:[&]:top-122.5 max-[600px]:[&]:top-121.25",
            ].join(" ")}
            aria-label="Deployment platform preview"
          >
            <div
              className={[
                "glass-panel [&]:absolute [&]:[background:linear-gradient(130deg,#131313b0,#070707b8)]",
                "[&]:[border:1px_solid_#ffffff3a] [&]:rounded-[8px]",
                "[&]:[box-shadow:inset_0_1px_0_#ffffff18,0_18px_50px_#0005] [&]:[backdrop-filter:blur(7px)]",
                "[&]:p-4.5 [&]:text-muted-foreground max-[600px]:[&]:p-3.25",
                "max-[600px]:[&]:[backdrop-filter:blur(4px)] deploy-panel [&]:w-70.75 [&]:top-16.25",
                "[&]:left-[53%] [&]:transform-[rotateY(-16deg)_rotateZ(-5deg)] max-[1200px]:[&]:left-[55%]",
                "max-[1200px]:[&]:w-60 max-[1200px]:[&]:top-13.75 max-[900px]:[&]:top-13.75",
                "max-[900px]:[&]:left-[9%] max-[600px]:[&]:left-[5%] max-[600px]:[&]:top-5",
                "max-[600px]:[&]:w-46.25",
              ].join(" ")}
            >
              <div
                className={[
                  "panel-top [&]:flex [&]:items-center [&]:justify-between [&]:gap-2.5 [&]:mb-3.25",
                  "[&]:text-[#e6e6e6] [&_strong]:text-[12px] [&_strong]:font-medium [&_small]:text-[#888]",
                  "[&_small]:text-[9px] max-[600px]:[&_strong]:text-[10px]",
                ].join(" ")}
              >
                <strong>Deploying…</strong>
                <LoaderCircle
                  size={12}
                  className={
                    "deploy-spinner [&]:animate-[spin_8s_linear_infinite] motion-reduce:[&]:animate-none"
                  }
                />
              </div>
              {[
                { label: "Cloning repository", time: "12s", done: true },
                { label: "Installing dependencies", time: "24s", done: true },
                { label: "Building application", time: "—", done: false },
                { label: "Optimizing assets", time: "—", done: false },
                { label: "Deploying to edge", time: "", done: false },
              ].map((s, i) => (
                <div
                  className={[
                    "deploy-step [&]:flex [&]:items-center [&]:gap-2.25 [&]:m-[11px_0] [&]:text-[10px]",
                    "[&_>_svg]:text-[#ddd] [&_time]:ml-auto [&_time]:text-[9px] max-[600px]:[&]:text-[8px]",
                    "max-[600px]:[&]:gap-1.5 max-[600px]:[&_time]:text-[7px]",
                    i > 2 ? "step-pending [&]:opacity-[.5]" : "",
                  ].join(" ")}
                  key={s.label}
                >
                  {s.done ? (
                    <CheckCircle2 size={13} />
                  ) : i === 2 ? (
                    <LoaderCircle
                      size={13}
                      className={
                        "deploy-spinner [&]:animate-[spin_8s_linear_infinite] motion-reduce:[&]:animate-none"
                      }
                    />
                  ) : (
                    <span
                      className={
                        "step-circle [&]:w-3 [&]:h-3 [&]:[border:1px_solid_#777] [&]:rounded-[50%]"
                      }
                    />
                  )}
                  <span>{s.label}</span>
                  <time>{s.time}</time>
                </div>
              ))}
            </div>
            <div
              className={[
                "glass-panel [&]:absolute [&]:[background:linear-gradient(130deg,#131313b0,#070707b8)]",
                "[&]:[border:1px_solid_#ffffff3a] [&]:rounded-[8px]",
                "[&]:[box-shadow:inset_0_1px_0_#ffffff18,0_18px_50px_#0005] [&]:[backdrop-filter:blur(7px)]",
                "[&]:p-4.5 [&]:text-muted-foreground max-[600px]:[&]:p-3.25",
                "max-[600px]:[&]:[backdrop-filter:blur(4px)] production-panel [&]:w-54 [&]:top-39.25",
                "[&]:right-[4%] [&]:transform-[rotateY(-15deg)_rotateZ(8deg)] [&_.panel-top_strong]:text-[17px]",
                "[&_>_svg:not(:first-child)]:mt-1.25 [&_svg[viewBox]]:w-full",
                "[&_svg[viewBox]]:h-12 [&_svg[viewBox]]:my-2.5",
                "[&_p]:[border-top:1px_solid_#ffffff12] [&_p]:pt-3 [&_p]:text-[9px]",
                "[&_p]:text-[#bbb] max-[1200px]:[&]:right-[2%] max-[1200px]:[&]:w-46.25",
                "max-[1200px]:[&]:top-68.75 max-[900px]:[&]:top-26.25 max-[900px]:[&]:right-[5%]",
                "max-[600px]:[&]:right-[4%] max-[600px]:[&]:top-31.25 max-[600px]:[&]:w-37.5",
                "max-[600px]:[&_.panel-top_strong]:text-[13px] max-[600px]:[&_.panel-top_small]:text-[7px]",
                "max-[600px]:[&_p]:text-[7px]",
              ].join(" ")}
            >
              <div
                className={[
                  "panel-top [&]:flex [&]:items-center [&]:justify-between [&]:gap-2.5 [&]:mb-3.25",
                  "[&]:text-[#e6e6e6] [&_strong]:text-[12px] [&_strong]:font-medium [&_small]:text-[#888]",
                  "[&_small]:text-[9px] max-[600px]:[&_strong]:text-[10px]",
                ].join(" ")}
              >
                <strong>Production</strong>
                <small>2m ago</small>
              </div>
              <Globe2 size={22} />
              <svg viewBox="0 0 200 45" aria-label="Production traffic trend" role="img">
                <path
                  d="M0 31 Q10 18 20 28 T40 27 T60 20 T80 23 T100 18 T120 28 T140 21 T160 26 T180 15 T200 15"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="1.3"
                />
              </svg>
              <p>https://my-app.cloudforge.dev</p>
            </div>
            <div
              className={[
                "glass-panel [&]:absolute [&]:[background:linear-gradient(130deg,#131313b0,#070707b8)]",
                "[&]:[border:1px_solid_#ffffff3a] [&]:rounded-[8px]",
                "[&]:[box-shadow:inset_0_1px_0_#ffffff18,0_18px_50px_#0005] [&]:[backdrop-filter:blur(7px)]",
                "[&]:p-4.5 [&]:text-muted-foreground max-[600px]:[&]:p-3.25",
                "max-[600px]:[&]:[backdrop-filter:blur(4px)] logs-panel [&]:w-60 [&]:left-[46%]",
                "[&]:top-92.5 [&]:transform-[rotateY(17deg)_rotateZ(-7deg)] [&_.panel-top]:pb-2.5",
                "[&_.panel-top]:[border-bottom:1px_solid_#ffffff12] max-[1200px]:[&]:left-[52%]",
                "max-[1200px]:[&]:top-108.75 max-[1200px]:[&]:w-50 max-[900px]:[&]:top-75",
                "max-[900px]:[&]:left-[10%] max-[600px]:[&]:left-[4%] max-[600px]:[&]:top-61.25",
                "max-[600px]:[&]:w-43.75",
              ].join(" ")}
            >
              <div
                className={[
                  "panel-top [&]:flex [&]:items-center [&]:justify-between [&]:gap-2.5 [&]:mb-3.25",
                  "[&]:text-[#e6e6e6] [&_strong]:text-[12px] [&_strong]:font-medium [&_small]:text-[#888]",
                  "[&_small]:text-[9px] max-[600px]:[&_strong]:text-[10px]",
                ].join(" ")}
              >
                <strong>Build Logs</strong>
                <span
                  className={
                    "live-badge [&]:[background:#fff1] [&]:p-[4px_6px] [&]:rounded-sm [&]:text-[8px]"
                  }
                >
                  • Live
                </span>
              </div>
              <div
                className={[
                  [
                    "code-lines [&]:flex [&]:flex-col [&]:gap-2",
                    "[&]:[font:9px/1.4_var(--font-geist-mono),monospace]",
                  ].join(" "),
                  [
                    "[&_span:nth-child(n+3)]:text-muted-foreground [&_span:last-child]:text-[#eee]",
                    "max-[600px]:[&]:text-[7px]",
                  ].join(" "),
                  "max-[600px]:[&]:gap-1.5",
                ].join(" ")}
              >
                <span>› npm run build</span>
                <span>› next build</span>
                <span>✓ Compiled successfully</span>
                <span>✓ Optimizing…</span>
                <span>✓ Generating static pages (24/24)</span>
                <span>✓ Finalizing build…</span>
                <span>Ready in 12.4s</span>
              </div>
            </div>
            <div
              className={[
                "glass-panel [&]:absolute [&]:[background:linear-gradient(130deg,#131313b0,#070707b8)]",
                "[&]:[border:1px_solid_#ffffff3a] [&]:rounded-[8px]",
                "[&]:[box-shadow:inset_0_1px_0_#ffffff18,0_18px_50px_#0005] [&]:[backdrop-filter:blur(7px)]",
                "[&]:p-4.5 [&]:text-muted-foreground max-[600px]:[&]:p-3.25",
                "max-[600px]:[&]:[backdrop-filter:blur(4px)] performance-panel [&]:w-67.5 [&]:right-[2.5%]",
                "[&]:top-107.5 [&]:transform-[rotateY(-12deg)_rotateZ(7deg)] [&_.panel-top]:pb-2.5",
                "[&_.panel-top]:[border-bottom:1px_solid_#ffffff12] max-[1200px]:[&]:hidden max-[900px]:[&]:block",
                "max-[900px]:[&]:top-87.5 max-[900px]:[&]:right-[4%] max-[900px]:[&]:w-57.5",
                "max-[600px]:[&]:right-[3%] max-[600px]:[&]:top-82.5 max-[600px]:[&]:w-46.25",
              ].join(" ")}
            >
              <div
                className={[
                  "panel-top [&]:flex [&]:items-center [&]:justify-between [&]:gap-2.5 [&]:mb-3.25",
                  "[&]:text-[#e6e6e6] [&_strong]:text-[12px] [&_strong]:font-medium [&_small]:text-[#888]",
                  "[&_small]:text-[9px] max-[600px]:[&_strong]:text-[10px]",
                ].join(" ")}
              >
                <strong>Performance</strong>
                <small>Last 24h</small>
              </div>
              <div
                className={[
                  "performance-stats [&]:grid [&]:grid-cols-[repeat(3,1fr)] [&]:gap-3",
                  "[&_>_div]:[border-right:1px_solid_#ffffff12] [&_>_div:last-child]:[border:0] [&_strong]:block",
                  "[&_strong]:text-[20px] [&_strong]:font-[450] [&_strong]:text-[#eee]",
                  "[&_strong]:tracking-[-.7px] [&_span]:block [&_span]:text-[8px] [&_span]:m-[3px_0_9px]",
                  "[&_svg]:w-[90%] [&_svg]:h-5.5 max-[600px]:[&]:gap-1.5",
                  "max-[600px]:[&_strong]:text-[14px] max-[600px]:[&_span]:text-[6px]",
                ].join(" ")}
              >
                {[
                  { value: "1.2M", label: "Requests" },
                  { value: "98.3%", label: "Success Rate" },
                  { value: "48ms", label: "Avg. Latency" },
                ].map((m, i) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                    <svg viewBox="0 0 60 20" aria-hidden="true">
                      <path
                        d={
                          i === 0
                            ? "M0 1 V18 M5 6 V18 M10 12 V18 M15 9 V18 M20 14 V18 M25 13 V18 M30 16 V18 M35 15 V18 M40 17 V18 M45 16 V18 M50 18 V19 M55 17 V19"
                            : "M0 10 L5 14 L10 12 L15 15 L20 13 L25 14 L30 12 L35 13 L40 10 L45 12 L50 11 L60 12"
                        }
                        fill="none"
                        stroke="#aaa"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className={[
            "landing-features [&]:max-w-360 [&]:m-[0_auto] [&]:grid",
            "[&]:grid-cols-5 [&]:p-[28px_64px_45px] [&]:gap-5.75",
            "[&]:relative [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-3.25 [&_>_div]:relative",
            '[&_>_div:not(:last-child)::after]:[content:""] [&_>_div:not(:last-child)::after]:absolute',
            "[&_>_div:not(:last-child)::after]:w-px [&_>_div:not(:last-child)::after]:h-7.5",
            [
              "[&_>_div:not(:last-child)::after]:[background:#181818]",
              "[&_>_div:not(:last-child)::after]:-right-2",
            ].join(" "),
            "[&_h2]:text-[11px] [&_h2]:font-medium [&_h2]:mb-1.75 [&_h2]:whitespace-nowrap",
            "[&_p]:text-[9px] [&_p]:text-[#828282] [&_p]:leading-normal",
            "max-[1200px]:[&]:px-8.75 max-[1200px]:[&]:gap-4.5 max-[1200px]:[&_>_div]:gap-2",
            "max-[1200px]:[&_h2]:text-[10px] max-[1200px]:[&_p]:text-[9px]",
            "max-[900px]:[&]:grid-cols-3 max-[900px]:[&]:gap-7",
            "max-[900px]:[&_>_div::after]:hidden max-[600px]:[&]:grid-cols-[1fr_1fr]",
            "max-[600px]:[&]:gap-[25px_15px] max-[600px]:[&]:p-[12px_24px_35px]",
            "max-[600px]:[&_h2]:text-[10px] max-[600px]:[&_h2]:whitespace-normal",
            "max-[600px]:[&_p]:text-[9px] max-[600px]:[&_>_div:last-child]:col-span-full",
          ].join(" ")}
          id="platform"
          aria-label="Platform features"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <span
                className={[
                  "feature-icon [&]:w-9.75 [&]:h-9.75 [&]:grid [&]:place-items-center [&]:shrink-0",
                  "[&]:rounded-[50%] [&]:[background:#0c0c0c] [&]:text-[#b8b8b8] max-[1200px]:[&]:w-7.5",
                ].join(" ")}
              >
                <Icon size={24} />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </section>
        <LandingSupport />
        <SupportSections />
      </main>
      <footer
        className={[
          "landing-footer [&]:max-w-328 [&]:m-auto [&]:[border-top:1px_solid_#202020]",
          "[&]:p-[30px_40px] [&]:flex [&]:items-center [&]:justify-between [&]:gap-5",
          "[&_.landing-brand]:text-[15px] [&_>_span]:text-[11px] [&_>_span]:text-[#777]",
          "[&_>_a:last-child]:flex [&_>_a:last-child]:items-center [&_>_a:last-child]:gap-2",
          "[&_>_a:last-child]:text-[11px] [&_>_a:last-child]:text-[#bbb]",
          "max-[600px]:[&]:p-[25px_24px] max-[600px]:[&]:flex-wrap max-[600px]:[&_>_span]:hidden",
        ].join(" ")}
      >
        <Link
          href="/"
          className={[
            "landing-brand [&]:inline-flex [&]:items-center [&]:gap-2.75 [&]:text-[20px]",
            "[&]:font-[650] [&]:tracking-[-.7px] [&]:whitespace-nowrap",
            "max-[600px]:[&]:text-[18px] max-[600px]:[&]:gap-2 max-[600px]:[&_svg]:w-6.25",
          ].join(" ")}
        >
          <Box size={20} />
          CloudForge
        </Link>
        <span>Built for what’s next.</span>
        <Link href="/login">
          Go to workspace <ArrowRight size={13} />
        </Link>
      </footer>
      <Dialog open={video} onOpenChange={setVideo}>
        <DialogContent className={"product-tour [&]:[background:#0b0b0b]"}>
          <DialogHeader>
            <DialogTitle>From idea to production.</DialogTitle>
            <DialogDescription>A quick look at the CloudForge workflow.</DialogDescription>
          </DialogHeader>
          <div
            className={[
              "tour-steps [&]:flex [&]:flex-col [&]:gap-6.25 [&]:my-5 [&_h3]:text-[15px]",
              "[&_h3]:mb-2 [&_p]:text-[12px] [&_p]:text-[#999] [&_p]:leading-[1.7]",
            ].join(" ")}
          >
            {[
              {
                title: "01 · Connect your project",
                text: "Bring your Git repository and choose a framework.",
              },
              {
                title: "02 · Configure and deploy",
                text: "Set your environment variables and start your build.",
              },
              {
                title: "03 · Make yourself at home",
                text: "Monitor deployments, traffic, resources, and logs from your workspace.",
              },
            ].map((s) => (
              <div key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <p className={"tour-note [&]:text-[12px] [&]:text-[#999] [&]:leading-[1.7]"}>
            Interactive product preview. A video is coming soon.
          </p>
          <Link
            href="/dashboard"
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
            Explore demo workspace <ArrowRight size={15} />
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
