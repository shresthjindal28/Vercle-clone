import { betterAuth } from "better-auth";
import { Pool } from "pg";

const globalAuth = globalThis as unknown as { authPool?: Pool };
export const authPool =
  globalAuth.authPool ?? new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });
if (process.env.NODE_ENV !== "production") globalAuth.authPool = authPool;
authPool.on("error", (error) => console.error("Auth database connection failed:", error.message));

export const auth = betterAuth({
  appName: "CloudForge",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: authPool,
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
  },
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
  rateLimit: { enabled: true, storage: "database" },
});
