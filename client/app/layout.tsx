import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "CloudForge — Deployment Platform",
  description: "Your CloudForge workspace navigation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={[
        GeistSans.variable,
        GeistMono.variable,
        "dark h-full antialiased font-sans scheme-dark [&_body]:[font-size:var(--text-sm)]",
        "[&_body]:[line-height:var(--text-sm--line-height)]",
        "[&_:where(button,input,select,textarea,a):focus-visible]:[outline:2px_solid_var(--ring)]",
        "[&_:where(button,input,select,textarea,a):focus-visible]:outline-offset-[3px]",
        "**:[::selection]:[background:var(--primary)] **:[::selection]:[color:var(--primary-foreground)]",
        "motion-reduce:**:animation-duration-[0.01ms]! motion-reduce:**:shimmer-once!",
        "motion-reduce:**:duration-[0.01ms]! motion-reduce:**:[transition:none]!",
        "motion-reduce:**:scroll-auto! motion-reduce:[&_*::before]:animation-duration-[0.01ms]!",
        "motion-reduce:[&_*::before]:shimmer-once! motion-reduce:[&_*::before]:duration-[0.01ms]!",
        "motion-reduce:[&_*::before]:[transition:none]! motion-reduce:[&_*::before]:scroll-auto!",
        "motion-reduce:[&_*::after]:animation-duration-[0.01ms]! motion-reduce:[&_*::after]:shimmer-once!",
        "motion-reduce:[&_*::after]:duration-[0.01ms]! motion-reduce:[&_*::after]:[transition:none]!",
        "motion-reduce:[&_*::after]:scroll-auto! [&_table]:w-full [&_table]:text-left",
        "[&_table]:[font-size:var(--text-sm)] [&_table]:whitespace-nowrap [&_th]:p-[16px_24px]",
        "[&_th]:[border-top:1px_solid_var(--border-subtle)] [&_th]:[color:var(--muted-foreground)]",
        "[&_th]:font-normal [&_th]:[background:var(--muted)] [&_td]:p-[16px_24px]",
        "[&_td]:[border-top:1px_solid_var(--border-subtle)]",
        "[&_a:focus-visible]:[outline:2px_solid_var(--ring)] [&_a:focus-visible]:outline-offset-[3px]",
        "[&_button:focus-visible]:[outline:2px_solid_var(--ring)]",
        "[&_button:focus-visible]:outline-offset-[3px]",
        "[&_input:focus-visible]:[outline:2px_solid_var(--ring)]",
        "[&_input:focus-visible]:outline-offset-[3px]",
      ].join(" ")}
    >
      <body
        className={
          "min-h-full flex flex-col bg-background text-foreground **:border-border **:outline-ring/50 has-[.cloud-app]:zoom-[0.9]"
        }
      >
        {children}
        <Toaster theme="dark" closeButton />
      </body>
    </html>
  );
}
