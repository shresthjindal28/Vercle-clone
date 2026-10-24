"use client";
import { useEffect, type RefObject } from "react";
/** Ignores editable fields; modifier shortcuts can be used while typing. */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { mod?: boolean; enabled?: boolean } = {},
) {
  const { mod = false, enabled = true } = options;
  useEffect(() => {
    if (!enabled) return;
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.shiftKey ||
        event.key.toLowerCase() !== key.toLowerCase()
      )
        return;
      if (mod !== (event.metaKey || event.ctrlKey)) return;
      if (
        !mod &&
        (target?.closest("input, textarea, select, [contenteditable='true']") ||
          target?.isContentEditable)
      )
        return;
      event.preventDefault();
      callback();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, callback, mod, enabled]);
}
export function useSearchShortcut(input: RefObject<HTMLInputElement | null>) {
  useKeyboardShortcut("k", () => input.current?.focus(), { mod: true });
}
