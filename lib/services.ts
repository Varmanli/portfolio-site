import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";

export interface ServiceDto {
  id: number;
  title: string;
}

export async function listServices(): Promise<ServiceDto[]> {
  return db
    .select({ id: services.id, title: services.title })
    .from(services)
    .orderBy(asc(services.id));
}

export async function createService(title: string): Promise<ServiceDto> {
  const [row] = await db
    .insert(services)
    .values({ title })
    .returning({ id: services.id, title: services.title });

  return row;
}

export async function updateService(
  id: number,
  title: string
): Promise<ServiceDto | null> {
  const [row] = await db
    .update(services)
    .set({ title, updatedAt: new Date() })
    .where(eq(services.id, id))
    .returning({ id: services.id, title: services.title });

  return row ?? null;
}

export async function deleteService(id: number): Promise<boolean> {
  const [row] = await db
    .delete(services)
    .where(eq(services.id, id))
    .returning({ id: services.id });

  return Boolean(row);
}
