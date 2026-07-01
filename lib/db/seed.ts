import bcrypt from "bcryptjs";
import { db } from "./index";
import { content, users } from "./schema";
import { eq } from "drizzle-orm";

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

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log(`Admin user already exists for ${email}, skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    email,
    passwordHash,
    name: "Admin",
    role: "admin",
  });

  console.log(`Created admin user: ${email}`);
}

async function seedDefaultContent() {
  for (const key of DEFAULT_CONTENT_KEYS) {
    const existing = await db
      .select({ id: content.id })
      .from(content)
      .where(eq(content.key, key))
      .limit(1);

    if (existing.length > 0) continue;

    await db.insert(content).values({ key, value: "" });
    console.log(`Created default content key: ${key}`);
  }
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
