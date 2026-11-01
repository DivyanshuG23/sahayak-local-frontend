/**
 * Centralized Form Validation Engine for Sahayak-Local
 */

// RFC 5322 Standard Email Regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Indian Mobile Number Standard (10 digits starting with 6, 7, 8, or 9, optional +91 or 0)
const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

// Generic International Phone (8 to 15 digits)
const GENERIC_PHONE_REGEX = /^\+?[0-9\s-]{8,15}$/;

/**
 * Validates Full Name (must be at least 2 characters, letters and basic spaces only)
 */
export function validateFullName(name: string): string | null {
  const clean = name.trim();
  if (!clean) {
    return "Full name is required";
  }
  if (clean.length < 2) {
    return "Name must be at least 2 characters long";
  }
  if (clean.length > 60) {
    return "Name cannot exceed 60 characters";
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(clean)) {
    return "Name can only contain letters, spaces, hyphens and dots";
  }
  return null;
}

/**
 * Validates Email Address
 */
export function validateEmail(email: string): string | null {
  const clean = email.trim();
  if (!clean) {
    return "Email address is required";
  }
  if (!EMAIL_REGEX.test(clean)) {
    return "Please enter a valid email address (e.g. name@example.com)";
  }
  return null;
}

/**
 * Validates Phone Number
 */
export function validatePhone(phone: string): string | null {
  const clean = phone.trim();
  if (!clean) {
    return "Phone number is required";
  }
  const digitsOnly = clean.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return "Phone number must have at least 10 digits";
  }
  if (!INDIAN_PHONE_REGEX.test(clean) && !GENERIC_PHONE_REGEX.test(clean)) {
    return "Please enter a valid 10-digit mobile number (e.g. 9876543210)";
  }
  return null;
}

/**
 * Validates Login Identifier (Can be either Email OR Phone)
 */
export function validateLoginIdentifier(identifier: string): string | null {
  const clean = identifier.trim();
  if (!clean) {
    return "Email address or phone number is required";
  }

  const isEmail = clean.includes("@");
  if (isEmail) {
    return validateEmail(clean);
  }

  // Otherwise check as phone number
  const digitsOnly = clean.replace(/\D/g, "");
  if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
    return null;
  }

  return "Please enter a valid email address or 10-digit phone number";
}

/**
 * Validates Password
 */
export function validatePassword(password: string, minLength = 6): string | null {
  if (!password) {
    return "Password is required";
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  return null;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: "Weak" | "Fair" | "Good" | "Strong";
  color: string;
  barColor: string;
  width: string;
}

/**
 * Evaluates password strength dynamically
 */
export function evaluatePasswordStrength(password: string): PasswordStrength | null {
  if (!password) return null;

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 1) {
    return {
      score: 1,
      label: "Weak",
      color: "text-rose-600",
      barColor: "bg-rose-500",
      width: "w-1/4",
    };
  }
  if (score === 2) {
    return {
      score: 2,
      label: "Fair",
      color: "text-amber-600",
      barColor: "bg-amber-500",
      width: "w-2/4",
    };
  }
  if (score === 3 || score === 4) {
    return {
      score: 3,
      label: "Good",
      color: "text-blue-600",
      barColor: "bg-blue-500",
      width: "w-3/4",
    };
  }
  return {
    score: 4,
    label: "Strong",
    color: "text-emerald-600",
    barColor: "bg-emerald-500",
    width: "w-full",
  };
}

