import { defineConfig } from "drizzle-kit";

// drizzle-kit's CLI only auto-loads `.env` by default; also load
// `.env.local` (the file Next.js itself prefers) if present.
try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local is optional
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env or .env.local before running drizzle-kit commands."
  );
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
