import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";

export interface MessageDto {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export async function listMessages(): Promise<MessageDto[]> {
  return db.select().from(messages).orderBy(desc(messages.createdAt));
}

export async function createMessage(
  input: MessageInput
): Promise<MessageDto> {
  const [row] = await db.insert(messages).values(input).returning();
  return row;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const [row] = await db
    .delete(messages)
    .where(eq(messages.id, id))
    .returning({ id: messages.id });

  return Boolean(row);
}

export async function countMessages(): Promise<number> {
  const rows = await db.select({ id: messages.id }).from(messages);
  return rows.length;
}
