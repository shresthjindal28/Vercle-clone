"use client";
import { useState } from "react";
import { useWorkspaceName } from "@/components/platform/workspace-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layers2, PanelLeft, Search, ChevronRight, UserRound } from "lucide-react";
import { Icon as AppIcon } from "@/components/ui/icon";
import { useKeyboardShortcut } from "@/components/platform/keyboard-shortcuts";
import { groups, hrefFor } from "@/lib/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const workspaceName = useWorkspaceName();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  useKeyboardShortcut("k", () => setSearch((value) => !value), { mod: true });
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const title = (s: string) =>
    groups.flatMap((g) => g.items).find((i) => hrefFor(i.label) === "/dashboard/" + s)?.label ??
    s.replaceAll("-", " ");
  const navigation = (
    <>
      <Link
        href="/dashboard"
        className={[
          "brand-button [&]:flex [&]:items-center [&]:w-full [&]:text-left [&]:[gap:var(--space-2)]",
          "[&]:cursor-pointer",
        ].join(" ")}
        onClick={() => setMobile(false)}
      >
        <span
          className={[
            "brand-mark [&]:w-8.5 [&]:h-8.5 [&]:shrink-0 [&]:grid [&]:place-items-center",
            "[&]:[background:var(--accent)] [&]:[border-radius:var(--radius-card)]",
          ].join(" ")}
        >
          <AppIcon icon={Layers2} size="lg" />
        </span>
        <span
          className={[
            "sidebar-label brand-copy [&]:flex [&]:flex-col [&]:[gap:var(--space-1)]",
            "[&_strong]:[font-size:var(--text-base)] [&_strong]:font-semibold",
            "[&_strong]:tracking-[-.35px] [&_>_span]:[font-size:var(--text-xs)]",
            "[&_>_span]:[color:var(--muted-foreground)] [&_>_span]:tracking-[.25px]",
          ].join(" ")}
        >
          <strong>CloudForge</strong>
          <span>Deployment Platform</span>
        </span>
      </Link>
      <button
        className={[
          "sidebar-search [&]:h-9 [&]:flex [&]:items-center [&]:[gap:var(--space-2)]",
          "[&]:p-[0_var(--space-3)] [&]:[background:var(--accent)]",
          "[&]:[border-radius:var(--radius-control)] [&]:[color:var(--muted-foreground)] [&]:w-full",
          "[&]:cursor-pointer [&]:[font-size:var(--text-xs)] [&]:mb-6 [&_>_svg]:shrink-0",
          "[&_input]:w-full [&_input]:min-w-0 [&_input]:[outline:none]",
          "[&_input]:[background:transparent] [&_input]:[font-size:var(--text-sm)]",
          "[&_input]:[color:var(--foreground)] [&_input::placeholder]:[color:var(--muted-foreground)]",
          "[&_kbd]:whitespace-nowrap [&_kbd]:font-[inherit] [&_kbd]:[font-size:var(--text-xs)]",
          "[&_kbd]:[color:var(--muted-foreground)] [&_kbd]:ml-auto",
          "focus-within:[box-shadow:0_0_0_2px_var(--ring)]",
        ].join(" ")}
        onClick={() => setSearch(true)}
        aria-label="Search workspace"
      >
        <AppIcon icon={Search} />
        <span className="sidebar-label">Search workspace</span>
        <kbd className="sidebar-label">⌘ K</kbd>
      </button>
      <nav aria-label="Main navigation">
        {groups.map((g) => (
          <section
            className={[
              "nav-group [&]:[margin-bottom:var(--space-4)] [&_h2]:[font-size:var(--text-xs)]",
              "[&_h2]:font-semibold [&_h2]:[color:var(--muted-foreground)] [&_h2]:tracking-[.25px]",
              "[&_h2]:uppercase [&_h2]:m-[0_0_var(--space-1)] [&_h2]:leading-4",
            ].join(" ")}
            key={g.title}
          >
            <h2 className="sidebar-label">{g.title}</h2>
            <div className={"nav-items [&]:flex [&]:flex-col [&]:[gap:var(--space-1)]"}>
              {g.items.map(({ label, icon: Icon }) => {
                const href = hrefFor(label);
                const active =
                  pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/"));
                return (
                  <Link
                    key={label}
                    href={href}
                    title={label}
                    aria-label={label}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobile(false)}
                    className={[
                      "nav-item [&]:flex [&]:w-full [&]:items-center [&]:[gap:var(--space-3)] [&]:h-9",
                      "[&]:p-[0_var(--space-3)] [&]:[border-radius:var(--radius-control)] [&]:text-left",
                      "[&]:leading-5 [&]:cursor-pointer [&]:[transition:background_.15s_ease]",
                      "[&]:[font-size:var(--text-sm)] [&_>_svg]:[color:var(--foreground)] [&_>_svg]:shrink-0",
                      "[&:hover]:[background:var(--surface-hover)] [&.selected]:[background:var(--accent)]",
                      "[&.selected]:font-semibold [&_.active-chevron]:ml-auto",
                      active ? " selected" : "",
                    ].join(" ")}
                  >
                    <AppIcon icon={Icon} />
                    <span className="sidebar-label">{label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
      <footer
        className={[
          "workspace-footer [&]:flex [&]:items-center [&]:[gap:var(--space-2)]",
          "[&]:[border-top:1px_solid_var(--border-subtle)] [&]:[margin-top:var(--space-7)]",
          "[&]:[padding-top:var(--space-5)] [&]:[padding-bottom:var(--space-1)] [&_>_span:last-child]:flex",
          "[&_>_span:last-child]:flex-col [&_>_span:last-child]:[gap:var(--space-1)]",
          "[&_strong]:[font-size:var(--text-sm)] [&_strong]:font-medium",
          "[&_>_span_>_span]:[font-size:var(--text-xs)] [&_>_span_>_span]:[color:var(--muted-foreground)]",
          "[&_>_span_>_span]:tracking-[.2px]",
        ].join(" ")}
      >
        <span
          className={[
            "user-avatar [&]:h-9 [&]:w-9 [&]:shrink-0 [&]:grid [&]:place-items-center",
            "[&]:rounded-pill [&]:[background:var(--accent)]",
          ].join(" ")}
        >
          <AppIcon icon={UserRound} size="lg" />
        </span>
        <span className="sidebar-label">
          <strong className="block max-w-44 truncate" title={workspaceName}>
            {workspaceName}
          </strong>
          <span>Free Plan</span>
        </span>
      </footer>
    </>
  );
  return (
    <div
      className={[
        "cloud-app [&]:[background:var(--background)] [&]:flex [&]:[color:var(--foreground)]",
        "[&]:[font-family:var(--font-geist-sans),sans-serif] [&]:h-[calc(100dvh/0.9)] [&]:min-h-0 [&]:overflow-hidden",
        collapsed
          ? [
              "sidebar-collapsed [&_.desktop-sidebar]:w-19 [&_.desktop-sidebar]:px-3.5",
              "[&_.desktop-sidebar_.sidebar-label]:hidden [&_.desktop-sidebar_.nav-item]:justify-center",
              "[&_.desktop-sidebar_.nav-item]:p-0 [&_.desktop-sidebar_.nav-group]:pb-3",
              "[&_.desktop-sidebar_.nav-group]:[border-bottom:1px_solid_var(--border-subtle)]",
              "[&_.desktop-sidebar_.workspace-footer]:justify-center",
            ].join(" ")
          : "",
      ].join(" ")}
    >
      <a
        className={[
          "skip-link [&]:fixed [&]:top-2 [&]:left-2 [&]:z-100 [&]:[padding:var(--space-3)]",
          "[&]:[border-radius:var(--radius-control)] [&]:[background:var(--primary)]",
          "[&]:[color:var(--primary-foreground)] [&]:transform-[translateY(-200%)]",
          "focus:transform-[translateY(0)]",
        ].join(" ")}
        href="#workspace-content"
      >
        Skip to content
      </a>
      <aside
        className={[
          "cloud-sidebar [&]:max-w-full [&]:shrink-0",
          "[&]:[border-right:1px_solid_var(--border-subtle)] [&]:w-68 [&]:min-h-0 [&]:top-0",
          "[&]:p-[24px_18px] [&]:[border-color:var(--border-subtle)] [&]:static [&]:h-full",
          "[&]:overflow-y-auto [&]:overscroll-y-contain",
          "[&_button:focus-visible]:[outline:2px_solid_var(--ring)]",
          "[&_button:focus-visible]:outline-offset-[3px] max-[481px]:[&]:w-full",
          "max-[481px]:[&]:[border-right:0] max-[481px]:[&]:[padding:var(--space-8)]",
          "[&_.brand-button]:mb-6 min-[768px]:max-[1024px]:[&]:w-57.5",
          "min-[768px]:max-[1024px]:[&]:px-3.5 desktop-sidebar max-[768px]:[&]:hidden",
        ].join(" ")}
      >
        {navigation}
      </aside>
      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent
          side="left"
          className={[
            "mobile-sidebar [&_.brand-button]:mb-6",
            "max-[768px]:[&]:[background:var(--card)] max-[768px]:[&]:max-w-[320px]",
            "[&]:overscroll-y-contain overflow-y-auto",
            "p-6",
          ].join(" ")}
        >
          <SheetTitle className="sr-only">Workspace navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate to projects, infrastructure, observability, and organization settings.
          </SheetDescription>
          {navigation}
        </SheetContent>
      </Sheet>
      <div
        className={
          "workspace-canvas [&]:flex-1 [&]:min-w-0 [&]:h-full [&]:flex [&]:flex-col [&]:overflow-hidden"
        }
      >
        <header
          className={[
            "workspace-topbar [&]:h-17 [&]:[border-bottom:1px_solid_var(--border-subtle)] [&]:flex",
            "[&]:items-center [&]:gap-4 [&]:p-[0_28px] [&]:top-0 [&]:[background:#000e]",
            "[&]:[backdrop-filter:blur(12px)] [&]:z-20 [&]:relative [&]:shrink-0",
            "max-[768px]:[&]:p-[12px_16px] max-[768px]:[&]:h-auto max-[768px]:[&]:min-h-16",
            "max-[768px]:[&]:gap-2.5",
          ].join(" ")}
        >
          <button
            className={[
              "icon-button [&]:grid [&]:place-items-center [&]:shrink-0 [&]:w-8.5 [&]:h-8.5",
              "[&]:[border:1px_solid_var(--border)] [&]:[border-radius:var(--radius-control)] [&]:cursor-pointer",
              "[&:hover]:[background:var(--border-subtle)] desktop-toggle max-[768px]:[&]:hidden",
            ].join(" ")}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            <AppIcon icon={PanelLeft} size="lg" />
          </button>
          <button
            className={[
              "icon-button [&]:grid [&]:place-items-center [&]:shrink-0 [&]:w-8.5 [&]:h-8.5",
              "[&]:[border:1px_solid_var(--border)] [&]:[border-radius:var(--radius-control)] [&]:cursor-pointer",
              "[&:hover]:[background:var(--border-subtle)] mobile-toggle [&]:hidden max-[768px]:[&]:grid",
            ].join(" ")}
            aria-label="Open navigation"
            onClick={() => setMobile(true)}
          >
            <AppIcon icon={PanelLeft} size="lg" />
          </button>
          <nav
            aria-label="Breadcrumb"
            className={[
              [
                "breadcrumbs [&]:flex [&]:items-center [&]:gap-2.5 [&]:[font-size:var(--text-xs)]",
                "[&]:flex-wrap",
              ].join(" "),
              "[&]:min-w-0 [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-2.5",
              "[&_>_span]:[font-size:var(--text-xs)] [&_a]:[color:var(--muted-foreground)]",
              "**:aria-[current]:capitalize max-[768px]:[&]:gap-1.25",
              "max-[768px]:[&]:[font-size:var(--text-xs)] max-[768px]:[&_>_span]:gap-1.25",
              "max-[768px]:[&_>_span]:[font-size:var(--text-xs)]",
            ].join(" ")}
          >
            <Link href="/dashboard">Workspace</Link>
            {segments.length ? (
              segments.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <AppIcon icon={ChevronRight} size="sm" />
                  {i === segments.length - 1 ? (
                    <span aria-current="page">{title(s)}</span>
                  ) : (
                    <Link href={"/dashboard/" + segments.slice(0, i + 1).join("/")}>
                      {title(s)}
                    </Link>
                  )}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center gap-2">
                <AppIcon icon={ChevronRight} size="sm" />
                <span aria-current="page">Overview</span>
              </span>
            )}
          </nav>
          <button
            className={[
              "icon-button [&]:grid [&]:place-items-center [&]:shrink-0 [&]:w-8.5 [&]:h-8.5",
              "[&]:[border:1px_solid_var(--border)] [&]:[border-radius:var(--radius-control)] [&]:cursor-pointer",
              "[&:hover]:[background:var(--border-subtle)] topbar-search [&]:ml-auto",
            ].join(" ")}
            aria-label="Open command menu"
            onClick={() => setSearch(true)}
          >
            <AppIcon icon={Search} size="lg" />
          </button>
        </header>
        <main
          id="workspace-content"
          tabIndex={-1}
          className={[
            [
              "page-container has-[.workspace-page]:max-w-[1800px]",
              "has-[.workspace-page]:p-[30px_28px] max-[768px]:has-[.workspace-page]:p-[24px_16px]",
              "[&]:w-full [&]:max-w-7xl [&]:p-[48px_40px]",
            ].join(" "),
            "[&]:mx-auto [&]:flex-1 [&]:min-h-0 [&]:overflow-y-auto",
            "[&]:overscroll-y-contain min-[768px]:max-[1024px]:[&]:p-[32px_24px]",
            "max-[768px]:[&]:p-[28px_18px] has-[.dashboard]:max-w-[1800px]",
            "has-[.dashboard]:p-[30px_28px] max-[768px]:has-[.dashboard]:p-[24px_16px]",
          ].join(" ")}
        >
          {children}
        </main>
      </div>
      <CommandDialog
        open={search}
        onOpenChange={setSearch}
        title="Search workspace"
        description="Find pages, projects and deployments."
      >
        <CommandInput placeholder="Search pages, projects, deployments…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((g) => (
            <CommandGroup heading={g.title} key={g.title}>
              {g.items.map(({ label, icon: Icon }) => (
                <CommandItem
                  key={label}
                  onSelect={() => {
                    router.push(hrefFor(label));
                    setSearch(false);
                  }}
                >
                  <AppIcon icon={Icon} />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandGroup heading="Demo project">
            <CommandItem
              onSelect={() => {
                router.push("/dashboard/projects/portfolio");
                setSearch(false);
              }}
            >
              Portfolio project
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/dashboard/projects/portfolio/deployments/a1b2c3d");
                setSearch(false);
              }}
            >
              Portfolio deployment
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
