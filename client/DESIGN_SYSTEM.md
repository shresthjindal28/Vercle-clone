# CloudForge UI standards

Review all patterns at `/dashboard/design-system`. The full workspace starts at `/dashboard`. Examples use local, simulated data and do not deploy projects or connect to live telemetry.

## Foundations

`app/globals.css` defines the shared foundations and maps semantic tokens into Tailwind. Workspace screens use the existing shadcn components and the overview's monochrome surfaces.

- Spacing: 4px base; prefer 8px multiples for layout. Use `gap-2`, `p-4`, `p-6`, `p-8` or `--space-1` through `--space-16`.
- Radii: 8px controls (`rounded-lg`), 12px cards (`rounded-xl`), 16px dialogs (`rounded-2xl`); pills use `rounded-full`.
- Borders: `border-border` for containers, `--border-subtle` for dividers, `--border-strong` for emphasis. Width is 1px.
- Elevation: `shadow-sm` for cards, `shadow-md` for raised panels, `shadow-lg` for menus/drawers, `shadow-xl` for dialogs.
- Type: Geist Sans and Geist Mono. Headings 32/40, 24/32, 20/28; body 16/24; interface 14/20; caption 12/16. Use semantic heading elements.
- Icons: `Icon` in `components/ui/icon.tsx`, using Lucide at 14/16/20/24px with a 1.75px stroke. Decorative icons are hidden from assistive technology. Give icon-only buttons accessible names.

## Component standards

Reuse the existing `components/ui` primitives: Button, Input, Dialog, Sheet, Skeleton, Progress and Toaster. Buttons provide default, secondary, outline, ghost, destructive and link variants, plus xs/sm/default/lg sizes. Inputs require visible labels, helper/error text connected with `aria-describedby`, and `aria-invalid` when invalid. Disabled controls retain their native semantics.

Reusable patterns in `components/platform`:

- `DataTable<T>`: sortable columns with numeric/string comparisons, text filtering, clamped pagination, optional per-row actions, semantic headers and no-results state. Supply stable row keys and a table caption. All rows are client-side; server pagination is a separate integration.
- `ConfirmationDialog`: controlled confirmation with pending state, async error handling and disabled dismissal while running. The underlying Base UI dialog manages focus and Escape. `Sheet` provides drawers using the same accessible dialog primitive.
- `StatusIndicator`: building, ready, failed, queued; every status includes readable text and a visual indicator.
- `EmptyState`, `LoadingCard`, `Spinner`: actionable guidance, skeleton placeholders and accessible loading labels. Use `Progress` for determinate progress.
- Sonner: a single root Toaster. Call `toast.success`, `toast.error`, or `toast.warning`; explain recovery in error descriptions.
- `LogViewer`: monospace timestamped output, level labels, copy, follow/pause scrolling. Supply entries from your data source. The demo's optional timer simulates a stream and retains 100 entries; production must set its own retention policy. Pausing follow pauses scrolling, not collection.
- `MetricCard`: responsive trend chart with a textual SVG description and supplied value/context. Pass finite numeric points. Production aggregation is the caller's responsibility.
- `DeploymentTimeline`: explicit complete/active/pending/failed stages with name and detail; no status communicated by color alone.
- `EnvironmentSelector`: controlled production/preview/development selector. Changing environment must change the displayed data; it does not itself configure backend environments.
- `useKeyboardShortcut`: supports modifier keys, ignores repeats and editable targets for plain-key shortcuts. Global Cmd/Ctrl+K opens workspace navigation; review-page `/` focuses search and `D` demonstrates a common action. Escape closes overlays.

## Accessibility

Preserve visible focus rings, keyboard-operable controls, skip links, semantic landmarks, labeled fields and text equivalents for charts/status colors. Honor reduced-motion preferences. Avoid announcing every incoming log line. Base UI handles modal focus containment and restoration. Verify contrast and screen-reader behavior when adding new color combinations or interaction patterns; the review page is not an accessibility certification.

## Dashboard screens and state

All 20 navigation destinations are implemented, including the overview. Collection screens use `ResourcePage`, with typed field definitions and initial content in `lib/workspace-data.ts`. Logs, history, analytics, and monitoring use `ObservabilityPage`; security, billing, and settings use `OrganizationPage`. `ResourceDetail` provides project/deployment drilldowns, settings, build output, and release timelines.

`WorkspaceProvider` shares projects and resources across navigation and the overview. Changes are stored under `cloudforge-resources-v1` in browser localStorage. Project renames update related resource associations; removal also removes related preview resources. Settings/security/billing preferences are stored under `cloudforge-preferences-v1`. Settings includes a confirmed reset of resource data. These stores are versioned UI fixtures, not a backend or secure credential vault.

Supported flows include create/edit/remove, table search/sort/pagination, environment filtering, domain verification preview, variable reveal/mask, storage metadata selection, service/job activation, function test responses, alert rules, member invitations, plan comparison, sample statement download, log filtering/export/follow, and opt-in simulated log streaming. No invitations, real deployments, protection rules, or payments are executed.
