import Link from "next/link";
import { Box } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
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
        <p>Sign in or create your CloudForge account.</p>
        <AuthForm />
        <Link href="/" className={"login-back [&]:text-[12px] [&]:text-muted-foreground"}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
