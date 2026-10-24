"use client";
import { useEffect, useRef, useState } from "react";
export function WorkspaceSettings() {
  const [saved, setSaved] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cloudforge-settings");
      if (stored) {
        const values = JSON.parse(stored);
        for (const name of ["name", "slug"]) {
          const input = form.current?.elements.namedItem(name);
          if (input instanceof HTMLInputElement && typeof values[name] === "string")
            input.value = values[name];
        }
      }
    } catch {}
  }, []);
  return (
    <form
      ref={form}
      className={[
        "surface [&_p]:[color:var(--muted-foreground)] [&_p]:[font-size:var(--text-sm)]",
        "[&_p]:leading-[1.7] [&]:[border:1px_solid_var(--border)] [&]:[background:var(--card)]",
        "[&]:[border-radius:var(--radius-card)] [&]:p-6 [&]:mb-6",
        "[&_>_span]:[font-size:var(--text-xs)] [&_>_span]:[color:var(--muted-foreground)]",
        "[&_h2]:[font-size:var(--text-base)] [&_h2]:font-medium settings-form [&]:max-w-160",
        "[&]:flex [&]:flex-col [&]:items-stretch [&]:gap-3.5 [&_label]:[font-size:var(--text-sm)]",
        "[&_label]:mt-3 [&_input]:[border:1px_solid_var(--input)]",
        "[&_input]:[border-radius:var(--radius-control)] [&_input]:[background:var(--background)]",
        "[&_input]:p-3 [&_input]:[font-size:var(--text-sm)] [&_input]:w-full",
        "[&_.action-button]:mt-3",
      ].join(" ")}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        localStorage.setItem("cloudforge-settings", JSON.stringify(Object.fromEntries(data)));
        setSaved(true);
      }}
    >
      <h2>General settings</h2>
      <p>Customize this workspace on your device.</p>
      <label htmlFor="workspace-name">Workspace name</label>
      <input
        id="workspace-name"
        name="name"
        required
        defaultValue="Personal Workspace"
        onChange={() => setSaved(false)}
        autoComplete="organization"
      />
      <label htmlFor="workspace-slug">Workspace slug</label>
      <input
        id="workspace-slug"
        name="slug"
        required
        pattern="[a-z0-9-]+"
        defaultValue="personal-workspace"
        onChange={() => setSaved(false)}
      />
      <button
        className={[
          "action-button [&:hover]:[background:var(--border-subtle)] [&]:inline-flex",
          "[&]:items-center [&]:justify-center [&]:[border:1px_solid_var(--border-strong)]",
          "[&]:[border-radius:var(--radius-control)] [&]:p-[10px_16px] [&]:[font-size:var(--text-sm)]",
          "[&]:[background:var(--secondary)] [&]:[color:var(--foreground)] [&]:cursor-pointer",
          "[&]:w-fit",
        ].join(" ")}
        type="submit"
      >
        Save changes
      </button>
      <p role="status">{saved ? "Settings saved on this device." : ""}</p>
    </form>
  );
}
