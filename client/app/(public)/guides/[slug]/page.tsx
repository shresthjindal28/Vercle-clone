import { GuideCover } from "@/components/guide-cover";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { guides, issues } from "@/lib/support-content";
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const issue = issues.find((i) => i.id === guide.issue)!;
  return (
    <article
      className={[
        [
          "full-support-guide [&_.support-eyebrow]:text-[#888]",
          "[&_.support-eyebrow]:text-[9px]",
          "[&_.support-eyebrow]:tracking-[2px]",
          "[&_.support-eyebrow]:font-medium [&]:max-w-205",
          "[&]:m-[65px_auto_80px] [&]:p-[0_30px]",
        ].join(" "),
        "[&]:text-[#ddd] [&_>_.support-eyebrow]:mt-11.25 [&_>_h1]:text-[45px]",
        "[&_>_h1]:font-medium [&_>_h1]:tracking-[-1.5px] [&_>_h1]:leading-[1.12]",
        "[&_>_h1]:m-[15px_0_20px] [&_>_.guide-cover]:h-62.5",
        "[&_>_.guide-cover]:mb-8.75 [&_>_.guide-cover_.guide-shape]:scale-[2]",
        "[&_>_section]:m-[35px_0] [&_h2]:text-[23px] [&_h2]:tracking-[-0.5px]",
        "[&_h2]:mb-3.25 [&_section_p]:text-muted-foreground [&_section_p]:text-[14px]",
        "[&_section_p]:leading-[1.9] [&_section_li]:text-muted-foreground",
        "[&_section_li]:text-[14px]",
        "[&_section_li]:leading-[1.9] [&_section_ul]:[list-style:disc]",
        "[&_section_ul]:pl-5 [&_pre]:[background:#0b0b0b] [&_pre]:[border:1px_solid_#292929]",
        "[&_pre]:p-5.5 [&_pre]:rounded-[10px] [&_pre]:overflow-auto [&_pre]:mt-6.25",
        "[&_pre]:[font:11px/2_var(--font-geist-mono)] [&_pre]:text-[#999] max-[768px]:[&]:mt-8.75",
        "max-[768px]:[&]:px-6 max-[768px]:[&_>_h1]:text-[34px]",
        "max-[768px]:[&_>_.guide-cover]:h-42.5 max-[768px]:[&_h2]:text-[21px]",
        "max-[768px]:[&_section_p]:text-[13px]",
        "max-[768px]:[&_section_li]:text-[13px] max-[768px]:[&_pre]:text-[9px]",
        "max-[768px]:[&_pre]:p-3.75",
      ].join(" ")}
    >
      <Link
        className={[
          "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
          "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
        ].join(" ")}
        href="/guides"
      >
        <ArrowLeft size={14} />
        All guides
      </Link>
      <p
        className={[
          "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
          "[&]:mb-3.75",
        ].join(" ")}
      >
        {guide.category}
      </p>
      <h1>{guide.title}</h1>
      <p
        className={
          "guide-intro [&]:text-[#999] [&]:text-[15px] [&]:leading-[1.9] max-[768px]:[&]:text-[13px]"
        }
      >
        {guide.description}
      </p>
      <span
        className={[
          "guide-read-time [&]:flex [&]:items-center [&]:gap-2 [&]:text-[#777] [&]:text-[11px]",
          "[&]:m-[20px_0_30px]",
        ].join(" ")}
      >
        <Clock3 size={13} />
        {guide.minutes} min read · CloudForge guides
      </span>
      <GuideCover art={guide.art} large />
      <p
        className={
          "guide-intro [&]:text-[#999] [&]:text-[15px] [&]:leading-[1.9] max-[768px]:[&]:text-[13px]"
        }
      >
        {issue.intro} Work through the checks below in order, starting with the earliest error
        rather than the last message in the log.
      </p>
      {issue.steps.map((s, i) => (
        <section key={s.title}>
          <h2>
            {i + 1}. {s.title}
          </h2>
          <p>{s.text}</p>
          {i === 0 && (
            <pre>
              <code>{issue.logs.join("\n")}</code>
            </pre>
          )}
        </section>
      ))}
      <section>
        <h2>Common causes to keep in mind</h2>
        <ul>
          {issue.causes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <div
        className={[
          "guide-next-step [&_p]:text-muted-foreground [&_p]:text-[14px]",
          "[&_p]:leading-[1.9] [&]:[border:1px_solid_#292929] [&]:rounded-[12px]",
          "[&]:p-6.75 [&]:mt-11.25 [&_>_a]:mt-5",
          "max-[768px]:[&_p]:text-[13px]",
        ].join(" ")}
      >
        <h2>Still working through it?</h2>
        <p>
          Return to the interactive troubleshooter or prepare a support request with the context
          you’ve collected.
        </p>
        <Link
          href="/support#troubleshooting"
          className={[
            "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
            "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
          ].join(" ")}
        >
          Open troubleshooting <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
