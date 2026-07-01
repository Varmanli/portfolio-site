import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Reuse the connection across hot-reloads in dev to avoid exhausting
// the Postgres connection pool.
const globalForDb = globalThis as unknown as {
  queryClient?: postgres.Sql;
  db?: PostgresJsDatabase<typeof schema>;
};

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const queryClient =
    globalForDb.queryClient ?? postgres(process.env.DATABASE_URL);

  if (process.env.NODE_ENV !== "production") {
    globalForDb.queryClient = queryClient;
  }

  return drizzle(queryClient, { schema });
}

// Lazily initialized so importing this module doesn't require
// DATABASE_URL to be set (e.g. during `next build`'s page-data
// collection, which evaluates route modules without DATABASE_URL set).
// The connection is only created on first actual query.
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop, receiver) {
    const instance = (globalForDb.db ??= createDb());
    return Reflect.get(instance, prop, receiver);
  },
});
