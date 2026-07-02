import bcrypt from "bcryptjs";
import { db } from "./index";
import { content, users } from "./schema";
import { sql } from "drizzle-orm";

const DEFAULT_CONTENT_KEYS = [
  "home_title",
  "home_desc",
  "home_image",
  "contact_desc",
  "contact_phone",
  "contact_email",
  "contact_city",
];

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "Skipping admin user seed: ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Upsert on the unique `email` constraint: creates the admin on first run,
  // and re-syncs password/role on later runs (e.g. after ADMIN_PASSWORD changes).
  await db
    .insert(users)
    .values({
      email,
      passwordHash,
      name: "Admin",
      role: "admin",
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        passwordHash,
        role: "admin",
        updatedAt: sql`now()`,
      },
    });

  console.log(`Upserted admin user: ${email}`);
}

async function seedDefaultContent() {
  // Upsert on the unique `key` constraint, but do nothing on conflict — this
  // only fills in missing content rows and must never clobber content an
  // admin has already edited through the admin panel.
  for (const key of DEFAULT_CONTENT_KEYS) {
    await db
      .insert(content)
      .values({ key, value: "" })
      .onConflictDoNothing({ target: content.key });
  }
  console.log(`Ensured default content keys exist: ${DEFAULT_CONTENT_KEYS.join(", ")}`);
}

async function main() {
  await seedAdminUser();
  await seedDefaultContent();
  console.log("Seed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
