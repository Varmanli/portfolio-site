export function generateUniqueId(): string {
  // Only use crypto.randomUUID() on the client side
  if (typeof window !== "undefined") {
    return crypto.randomUUID();
  }
  // For SSR, return a placeholder that will be replaced on the client
  return "placeholder-id";
}
