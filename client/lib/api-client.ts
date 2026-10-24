"use client";

export async function apiFetch(path: string, init: RequestInit = {}) {
  if (!path.startsWith("/api/")) throw new Error("API paths must start with /api/");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}${path}`, {
    ...init,
    credentials: "include",
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json();
}
