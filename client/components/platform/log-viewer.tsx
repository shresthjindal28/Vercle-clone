"use client";
import { useEffect, useRef, useState } from "react";
import { Copy, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
export type LogEntry = {
  id: string;
  timestamp: string;
  level: "info" | "error" | "warning";
  message: string;
};
export function LogViewer({
  entries,
  streaming = false,
}: {
  entries: LogEntry[];
  streaming?: boolean;
}) {
  const [follow, setFollow] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (follow && viewport.current) viewport.current.scrollTop = viewport.current.scrollHeight;
  }, [entries, follow]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        entries.map((entry) => `${entry.timestamp} [${entry.level}] ${entry.message}`).join("\n"),
      );
      toast.success("Logs copied");
    } catch {
      toast.error("Could not copy logs");
    }
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <h3 className="text-sm font-medium">
          Runtime logs{" "}
          <span className="ml-2 text-xs text-muted-foreground">
            {streaming ? "Live" : "Snapshot"}
          </span>
        </h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-pressed={follow}
            onClick={() => setFollow(!follow)}
          >
            <Icon icon={follow ? Pause : Play} />
            {follow ? "Pause follow" : "Follow logs"}
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Copy logs" onClick={copy}>
            <Icon icon={Copy} />
          </Button>
        </div>
      </div>
      <div
        ref={viewport}
        role="region"
        aria-label="Log output"
        tabIndex={0}
        className="max-h-64 overflow-auto p-4 font-mono text-xs leading-6"
      >
        {entries.length ? (
          entries.map((entry) => (
            <div key={entry.id} className="flex min-w-max gap-4">
              <time className="text-muted-foreground">{entry.timestamp}</time>
              <span
                className={
                  entry.level === "error"
                    ? "text-(--danger)"
                    : entry.level === "warning"
                      ? "text-(--warning)"
                      : "text-(--info)"
                }
              >
                {entry.level.toUpperCase().padEnd(7, " ")}
              </span>
              <span className="whitespace-pre">{entry.message}</span>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">Waiting for log output…</p>
        )}
      </div>
    </div>
  );
}
