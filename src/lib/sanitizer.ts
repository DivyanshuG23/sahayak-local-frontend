/**
 * Production-Grade Input Sanitization Suite
 * Prevents XSS, Script Injection, and formats user input cleanly
 */

/**
 * Strips HTML tags, script tags, null bytes, and trims extra whitespace.
 */
export function sanitizeText(value: string | null | undefined): string {
  if (!value) return "";

  return String(value)
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove script and style tags with content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    // Strip all remaining HTML tags
    .replace(/<[^>]+>/g, "")
    // Normalize consecutive spaces/tabs to a single space
    .replace(/\s+/g, " ")
    // Trim outer whitespace
    .trim();
}

/**
 * Sanitizes and normalizes email address (lowercased, trimmed, spaces removed).
 */
export function sanitizeEmail(email: string | null | undefined): string {
  if (!email) return "";
  return String(email)
    .replace(/\0/g, "")
    .replace(/\s+/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Sanitizes and cleans phone number (retains only digits and optional leading +).
 */
export function sanitizePhone(phone: string | null | undefined): string {
  if (!phone) return "";

  const trimmed = String(phone).trim();
  const hasPlus = trimmed.startsWith("+");
  // Keep only numbers
  const digitsOnly = trimmed.replace(/\D/g, "");

  return hasPlus ? `+${digitsOnly}` : digitsOnly;
}

/**
 * Sanitizes password without modifying special characters (only trims outer whitespace).
 */
export function sanitizePassword(password: string | null | undefined): string {
  if (!password) return "";
  // Strip null bytes
  return String(password).replace(/\0/g, "").trim();
}

/**
 * Recursively sanitizes all string properties in a form object before sending to Redux or API.
 */
export function sanitizeFormPayload<T extends Record<string, any>>(payload: T): T {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      if (key.toLowerCase().includes("email")) {
        result[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes("phone") || key.toLowerCase().includes("mobile")) {
        result[key] = sanitizePhone(value);
      } else if (key.toLowerCase().includes("password")) {
        result[key] = sanitizePassword(value);
      } else {
        result[key] = sanitizeText(value);
      }
    } else if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = sanitizeFormPayload(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

