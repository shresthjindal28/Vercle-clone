import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
export function PublicFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        "landing [&]:[background:#000] [&]:text-[#f5f5f5] [&]:min-h-dvh",
        [
          [
            "[&]:[font-family:var(--font-geist-sans),sans-serif] public-support-page [&]:[background:#000]",
            "[&]:text-[#eee] [&]:min-h-dvh [&]:[font-family:var(--font-geist-sans),sans-serif]",
            "[&_.landing-header]:min-h-22 [&_.landing-header]:max-w-360",
            "[&_.landing-header]:p-[20px_64px] [&_.landing-header]:m-auto [&_.landing-header]:flex",
            [
              "[&_.landing-header]:items-center [&_.landing-header]:justify-between",
              "[&_.landing-header]:gap-6",
            ].join(" "),
            "[&_.landing-header]:[border-bottom:1px_solid_#202020] [&_.landing-brand]:inline-flex",
            "[&_.landing-brand]:items-center [&_.landing-brand]:gap-2.5 [&_.landing-brand]:text-[19px]",
            "[&_.landing-brand]:font-semibold [&_.landing-brand]:tracking-[-.6px]",
            "[&_.landing-brand]:whitespace-nowrap [&_.landing-footer]:max-w-328",
            "[&_.landing-footer]:m-auto [&_.landing-footer]:p-[30px_40px]",
            "[&_.landing-footer]:[border-top:1px_solid_#242424] [&_.landing-footer]:flex",
            [
              "[&_.landing-footer]:items-center [&_.landing-footer]:justify-between",
              "[&_.landing-footer]:gap-5",
            ].join(" "),
            "[&_.landing-footer_>_span]:text-[#777] [&_.landing-footer_>_span]:text-[11px]",
            "[&_.landing-footer_>_a:last-child]:flex [&_.landing-footer_>_a:last-child]:items-center",
            [
              "[&_.landing-footer_>_a:last-child]:gap-2",
              "[&_.landing-footer_>_a:last-child]:text-muted-foreground",
            ].join(" "),
            "[&_.landing-footer_>_a:last-child]:text-[11px] [&_.landing-cta]:inline-flex",
            "[&_.landing-cta]:items-center [&_.landing-cta]:justify-center",
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
            "[&_.landing-cta]:cursor-pointer",
            "[&_.landing-cta:hover]:[background:#ddd]",
            "max-[768px]:[&_.landing-header]:p-[20px_22px] max-[768px]:[&_.landing-header]:gap-4",
            "max-[768px]:[&_.landing-brand]:text-[17px]",
            "max-[768px]:[&_.landing-header_.nav-cta]:p-[9px_12px]",
            "max-[768px]:[&_.landing-header_.nav-cta]:text-[10px]",
            "max-[768px]:[&_.landing-footer]:p-[25px_22px] max-[768px]:[&_.landing-footer_>_span]:hidden",
            "[&_>_main]:min-h-[65dvh]",
          ].join(" "),
          "[&_.support-section]:mt-0 [&_.support-section]:[border:0]",
          "[&_>_main_>_.support-continuation]:pt-6.25",
          "[&_>_main_>_.support-continuation_>_section:first-child]:[border:0]",
          "max-[768px]:[&_.landing-header]:flex-wrap max-[768px]:[&_.landing-header]:h-auto",
          "max-[768px]:[&_.landing-header]:min-h-25",
          "max-[768px]:[&_.landing-header]:py-5 max-[768px]:[&_.landing-header]:gap-y-4",
          "max-[768px]:[&_.nav-cta]:inline-flex max-[768px]:[&_.nav-cta]:p-[9px_12px]",
          "max-[768px]:[&_.nav-cta]:text-[10px] max-[768px]:[&_.support-section]:pt-8.75",
        ].join(" "),
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
          <Box size={27} />
          <span>CloudForge</span>
        </Link>
        <nav
          aria-label="Support navigation"
          className={[
            [
              "public-support-nav [&]:flex [&]:gap-7.5 [&]:items-center [&]:text-[12px]",
              "[&]:text-muted-foreground",
            ].join(" "),
            "[&_a:hover]:text-white max-[768px]:[&]:gap-5.25 max-[768px]:[&]:text-[11px]",
            "max-[768px]:[&]:order-2 max-[768px]:[&]:w-full",
          ].join(" ")}
        >
          <Link href="/support">Support</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/status">Status</Link>
          <Link href="/support/contact">Contact</Link>
        </nav>
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
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
