/**
 * Optional Gemini API key for client-side features.
 * Returns undefined when unset so callers can fail closed without crashing the app.
 */
export function getGeminiApiKey(): string | undefined {
  const key = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  return key || undefined;
}

export function isGeminiConfigured(): boolean {
  return getGeminiApiKey() !== undefined;
}
