import { loadEnvConfig } from "@next/env";

async function main() {
  loadEnvConfig(process.cwd());
  const { getMigrations } = await import("better-auth/db");
  const { auth, authPool } = await import("../lib/auth");
  try {
    const { runMigrations } = await getMigrations(auth.options);
    await runMigrations();
    console.log("Better Auth schema is up to date.");
  } finally {
    await authPool.end();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
