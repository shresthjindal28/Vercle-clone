import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
export default function Login() {
  return (
    <main
      className={[
        "login-page [&]:min-h-dvh [&]:flex [&]:flex-col [&]:items-center [&]:p-[70px_20px]",
        "[&]:[background:radial-gradient(ellipse_at_50%_30%,#151515,#000_65%)]",
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
        <Box size={28} />
        CloudForge
      </Link>
      <div
        className={[
          "login-card [&]:w-[min(100%,440px)] [&]:mt-25 [&]:[border:1px_solid_#292929]",
          "[&]:rounded-[18px] [&]:p-8.75 [&]:flex [&]:flex-col [&]:gap-5",
          "[&_h1]:text-[27px] [&_h1]:tracking-[-1px] [&_h1]:leading-[1.2] [&_p]:text-muted-foreground",
          "[&_p]:text-[14px] [&_small]:text-[11px] [&_small]:leading-[1.8] [&_small]:text-[#777]",
          "max-[600px]:[&]:p-6.5 max-[600px]:[&_.landing-cta]:whitespace-normal",
        ].join(" ")}
      >
        <h1>Your next idea starts here.</h1>
        <p>Explore your CloudForge workspace.</p>
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
          Continue to demo workspace <ArrowRight size={16} />
        </Link>
        <small>This is a local preview. Account authentication is not connected yet.</small>
        <Link href="/" className={"login-back [&]:text-[12px] [&]:text-muted-foreground"}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
