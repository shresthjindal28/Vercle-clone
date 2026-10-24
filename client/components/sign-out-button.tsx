"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <button className="px-2 py-1 text-xs text-muted-foreground" disabled={pending}
        onClick={async () => {
          setPending(true);
          setError("");
          try {
            const result = await authClient.signOut();
            if (result.error) throw new Error("Sign out failed");
            router.replace("/login");
            router.refresh();
          } catch {
            setError("Unable to sign out. Try again.");
            setPending(false);
          }
        }}>
        {pending ? "Signing out…" : "Sign out"}
      </button>
      {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
