"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export function SupportContact() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  return (
    <div
      className={[
        [
          "support-contact-page [&_.support-eyebrow]:text-[#888]",
          "[&_.support-eyebrow]:text-[9px]",
          "[&_.support-eyebrow]:tracking-[2px]",
          "[&_.support-eyebrow]:font-medium [&]:max-w-287.5",
          "[&]:m-[60px_auto_90px] [&]:p-[0_35px]",
        ].join(" "),
        "max-[768px]:[&]:mt-8.75 max-[768px]:[&]:px-5.5",
      ].join(" ")}
    >
      <Link
        href="/support"
        className={[
          "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
          "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
        ].join(" ")}
      >
        <ArrowLeft size={14} />
        Support center
      </Link>
      <div
        className={[
          "contact-page-heading [&]:m-[40px_0] [&_h1]:text-[44px] [&_h1]:tracking-[-1.4px]",
          "[&_h1]:mb-3.5 [&_>_p:last-child]:text-[#999] [&_>_p:last-child]:text-[14px]",
          "[&_>_p:last-child]:leading-[1.8] max-[768px]:[&]:my-7.5",
          "max-[768px]:[&_h1]:text-[35px] max-[768px]:[&_>_p:last-child]:text-[12px]",
        ].join(" ")}
      >
        <p
          className={[
            "support-eyebrow [&]:text-[8px] [&]:tracking-[2px] [&]:font-[550] [&]:text-[#888]",
            "[&]:mb-3.75",
          ].join(" ")}
        >
          LET’S GET YOU UNSTUCK
        </p>
        <h1>How can we help?</h1>
        <p>Tell us what you’re working on and where you’re getting stuck.</p>
      </div>
      <div
        className={[
          "contact-page-layout [&]:grid [&]:grid-cols-[1.6fr_1fr] [&]:gap-12.5",
          "[&_>_aside]:pt-3.75 [&_>_aside_>_h2]:text-[22px] [&_>_aside_>_h2]:leading-[1.4]",
          "[&_>_aside_>_h2]:m-[20px_0_12px] [&_>_aside_>_h2]:tracking-[-0.5px]",
          "[&_>_aside_p]:text-[#888] [&_>_aside_p]:text-[12px] [&_>_aside_p]:leading-[1.9]",
          "[&_>_aside_>_div]:pt-6.25 [&_>_aside_>_div]:mt-6.25",
          "[&_>_aside_>_div]:[border-top:1px_solid_#292929] [&_>_aside_h3]:text-[14px]",
          "[&_>_aside_h3]:mb-2.5 [&_>_aside_a]:mt-3.75",
          "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-7.5",
        ].join(" ")}
      >
        <Card
          className={[
            "contact-form-card [&]:[background:#0a0a0a] [&]:[border:1px_solid_#292929] [&]:[box-shadow:none]",
            '[&]:p-[28px_0] **:data-[slot="card-content"]:p-[0_28px] [&_form]:flex [&_form]:flex-col',
            "[&_form]:gap-5.5 [&_label]:text-[12px] [&_label]:flex [&_label]:flex-col [&_label]:gap-2.5",
            "[&_label]:text-[#ccc] [&_input]:[background:#111]! [&_input]:[border:1px_solid_#333]",
            "[&_input]:text-[12px] [&_input]:min-h-9.75",
            "[&_textarea]:[background:#111]!",
            "[&_textarea]:[border:1px_solid_#333] [&_textarea]:text-[12px]",
            "[&_textarea]:min-h-9.75 [&_select]:[background:#111]!",
            "[&_select]:[border:1px_solid_#333] [&_select]:text-[12px]",
            "[&_select]:min-h-9.75 [&_select]:rounded-[8px]",
            "[&_select]:p-2.5 [&_.support-preview-note]:flex [&_.support-preview-note]:gap-2",
            "[&_.support-preview-note]:items-center [&_.support-preview-note]:text-[#888]",
            '[&_.support-preview-note]:leading-[1.8] [&_button[type="submit"]]:self-start',
            '[&_button[type="submit"]]:text-[12px]',
            'max-[768px]:**:data-[slot="card-content"]:px-5',
          ].join(" ")}
        >
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                try {
                  const data = Object.fromEntries(new FormData(e.currentTarget));
                  localStorage.setItem("cloudforge-support-draft", JSON.stringify(data));
                  setSaved(true);
                  setError("");
                } catch {
                  setError(
                    "Your browser could not save the draft. Please allow local storage and try again.",
                  );
                }
              }}
              onChange={() => setSaved(false)}
            >
              <div
                className={[
                  "contact-form-row [&]:grid [&]:grid-cols-[1fr_1fr] [&]:gap-4",
                  "max-[768px]:[&]:grid-cols-[1fr] max-[768px]:[&]:gap-5",
                ].join(" ")}
              >
                <label>
                  Your name
                  <Input name="name" autoComplete="name" required placeholder="Your name" />
                </label>
                <label>
                  Email address
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label>
                What can we help with?
                <select name="category" defaultValue="deployment">
                  <option value="deployment">Deployment issue</option>
                  <option value="domains">Domains & routing</option>
                  <option value="environment">Environment variables</option>
                  <option value="database">Database issue</option>
                  <option value="billing">Billing & usage</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label>
                Subject
                <Input name="subject" required placeholder="A short description of the issue" />
              </label>
              <label>
                Tell us more
                <Textarea
                  name="message"
                  required
                  minLength={10}
                  placeholder="What happened? What did you expect? Include relevant error messages, but leave out secrets and passwords."
                  rows={6}
                />
              </label>
              <p
                className={[
                  "support-preview-note [&]:text-[#777] [&]:text-[10px] [&]:leading-[1.7] [&]:text-[10px]",
                  "[&]:text-[#777]",
                ].join(" ")}
              >
                <ShieldCheck size={13} />
                This preview saves a draft on your device. No request is sent.
              </p>
              <Button type="submit" variant="secondary">
                Save support request draft <ArrowRight size={14} />
              </Button>
              <div role="status" aria-live="polite">
                {saved && (
                  <p
                    className={[
                      "contact-saved [&]:flex [&]:items-center [&]:gap-2 [&]:text-[12px] [&]:text-[#ddd]",
                      "[&]:leading-[1.8]",
                    ].join(" ")}
                  >
                    <CheckCircle2 size={15} />
                    Your request draft is saved on this device.
                  </p>
                )}
                {error && (
                  <p
                    className={
                      "contact-save-error [&]:text-[12px] [&]:text-[#ccc] [&]:leading-[1.8]"
                    }
                  >
                    {error}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        <aside>
          <Mail size={24} />
          <h2>A little context goes a long way.</h2>
          <p>
            Include your project name, deployment environment, and the first relevant error in your
            logs.
          </p>
          <div>
            <h3>Need an answer sooner?</h3>
            <p>Explore step-by-step solutions for common issues.</p>
            <Link
              href="/support#troubleshooting"
              className={[
                "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
                "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
              ].join(" ")}
            >
              Open troubleshooting <ArrowRight size={13} />
            </Link>
          </div>
          <div>
            <h3>Check platform health</h3>
            <p>See the platform status preview.</p>
            <Link
              href="/status"
              className={[
                "support-text-link [&]:inline-flex [&]:items-center [&]:gap-2 [&]:text-[11px]",
                "[&]:text-[#ccc] [&]:whitespace-nowrap [&:hover]:text-white",
              ].join(" ")}
            >
              View status <ArrowRight size={13} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
