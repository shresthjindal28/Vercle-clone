"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthForm() {
  const router = useRouter();
  const [signup, setSignup] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const credentials = { email: String(data.get("email")), password: String(data.get("password")) };
    try {
      const result = signup
        ? await authClient.signUp.email({ ...credentials, name: String(data.get("name")) })
        : await authClient.signIn.email(credentials);
      if (result.error) {
        setError(result.error.message ?? "Unable to authenticate. Please try again.");
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const inputClass = "mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm";
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {signup && (
        <label className="text-sm">
          Name
          <input className={inputClass} name="name" autoComplete="name" required maxLength={100} />
        </label>
      )}
      <label className="text-sm">
        Email
        <input className={inputClass} name="email" type="email" autoComplete="email" required />
      </label>
      <label className="text-sm">
        Password
        <input className={inputClass} name="password" type="password" required
          autoComplete={signup ? "new-password" : "current-password"}
          minLength={signup ? 12 : 1} maxLength={128} />
      </label>
      {signup && <p>Use at least 12 characters.</p>}
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={pending}
        className="rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background disabled:opacity-50">
        {pending ? "Please wait…" : signup ? "Create account" : "Sign in"}
      </button>
      <button type="button" disabled={pending} className="text-sm text-muted-foreground"
        onClick={() => { setSignup(!signup); setError(""); }}>
        {signup ? "Already have an account? Sign in" : "New here? Create an account"}
      </button>
    </form>
  );
}
