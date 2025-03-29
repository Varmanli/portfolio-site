export function generateUniqueId(): string {
  // Only use crypto.randomUUID() on the client side
  if (typeof window !== 'undefined') {
    return crypto.randomUUID();
  }
  // Fallback for SSR - using timestamp + random number
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
} 