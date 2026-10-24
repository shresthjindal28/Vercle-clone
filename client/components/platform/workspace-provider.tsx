"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { sectionConfigs, type Resource } from "@/lib/workspace-data";
import { toast } from "sonner";
type Workspace = {
  resources: Record<string, Resource[]>;
  save: (section: string, rows: Resource[]) => void;
  ready: boolean;
};
const initial = Object.fromEntries(
  Object.entries(sectionConfigs).map(([key, config]) => [key, config.rows]),
);
const Context = createContext<Workspace | null>(null);
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cloudforge-resources-v1") || "null");
      if (stored && typeof stored === "object")
        setResources((previous) =>
          Object.fromEntries(
            Object.entries(previous).map(([key, rows]) => [
              key,
              Array.isArray(stored[key]) &&
              stored[key].every(
                (row: Resource) =>
                  row &&
                  typeof row.id === "string" &&
                  typeof row.name === "string" &&
                  typeof row.project === "string" &&
                  typeof row.detail === "string" &&
                  typeof row.environment === "string" &&
                  typeof row.status === "string",
              )
                ? stored[key]
                : rows,
            ]),
          ),
        );
    } catch {
      /* Invalid stored data falls back to seed content. */
    }
    setReady(true);
  }, []);
  function save(section: string, rows: Resource[]) {
    setResources((previous) => {
      const next = { ...previous, [section]: rows };
      try {
        localStorage.setItem("cloudforge-resources-v1", JSON.stringify(next));
      } catch {
        toast.warning(
          "Changes are available for this session only. Browser storage is unavailable.",
        );
      }
      return next;
    });
  }
  return <Context.Provider value={{ resources, save, ready }}>{children}</Context.Provider>;
}
export function useWorkspace() {
  const value = useContext(Context);
  if (!value) throw new Error("WorkspaceProvider is required");
  return value;
}

function subscribeName(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cloudforge-preferences", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cloudforge-preferences", callback);
  };
}
function readWorkspaceName() {
  try {
    const preferences = JSON.parse(localStorage.getItem("cloudforge-preferences-v1") || "null");
    return typeof preferences?.name === "string" && preferences.name.trim()
      ? preferences.name
      : "Personal Workspace";
  } catch {
    return "Personal Workspace";
  }
}
export function useWorkspaceName() {
  return useSyncExternalStore(subscribeName, readWorkspaceName, () => "Personal Workspace");
}
