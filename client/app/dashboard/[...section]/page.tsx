import { Suspense } from "react";
import { LoadingWorkspace } from "@/components/platform/workspace-ui";
import { notFound } from "next/navigation";
import { groups, hrefFor } from "@/lib/navigation";
import { sectionConfigs } from "@/lib/workspace-data";
import { ResourcePage } from "@/components/platform/resource-page";
import { ResourceDetail } from "@/components/platform/resource-detail";
import { ObservabilityPage } from "@/components/platform/observability-page";
import { OrganizationPage } from "@/components/platform/organization-page";
export default function WorkspacePage({ params }: { params: Promise<{ section: string[] }> }) {
  return (
    <Suspense fallback={<LoadingWorkspace />}>
      <WorkspaceContent params={params} />
    </Suspense>
  );
}

async function WorkspaceContent({ params }: { params: Promise<{ section: string[] }> }) {
  const { section } = await params;
  const key = section[0];
  if (
    !groups
      .flatMap((group) => group.items)
      .some((item) => hrefFor(item.label) === `/dashboard/${key}`)
  )
    notFound();
  if (section.length > 1) {
    if (
      (key === "projects" &&
        (section.length === 2 || (section.length === 4 && section[2] === "deployments"))) ||
      (key === "deployments" && section.length === 2)
    )
      return <ResourceDetail segments={section} />;
    notFound();
  }
  if (sectionConfigs[key]) return <ResourcePage key={key} section={key} />;
  if (["settings", "security", "usage-billing"].includes(key))
    return <OrganizationPage key={key} section={key} />;
  return <ObservabilityPage key={key} section={key} />;
}
