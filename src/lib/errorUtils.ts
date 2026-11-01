/**
 * Centralized API Error Extraction Utility
 * Handles RTK Query errors, Backend ApiError format, and network errors
 */
export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "An unexpected error occurred. Please try again."
): string {
  if (!error) return fallbackMessage;

  // 1. RTK Query FetchBaseQueryError with backend response data
  if (typeof error === "object" && error !== null) {
    const err = error as Record<string, any>;

    // Case A: err.data.message (standard backend ApiError)
    if (err.data && typeof err.data === "object" && err.data.message) {
      return String(err.data.message);
    }

    // Case B: err.data is a string (e.g. raw HTML or plain text)
    if (typeof err.data === "string") {
      return err.data;
    }

    // Case C: err.message
    if (typeof err.message === "string") {
      return err.message;
    }

    // Case D: RTK Query network status string (e.g. 'FETCH_ERROR')
    if (err.status === "FETCH_ERROR") {
      return "Unable to connect to the server. Please check your internet connection or verify the backend is running.";
    }

    if (err.status === "PARSING_ERROR") {
      return "Server returned an unexpected response format.";
    }

    if (err.status === 401) {
      return "Your session has expired. Please log in again.";
    }

    if (err.status === 403) {
      return "You do not have permission to perform this action.";
    }

    if (err.status === 404) {
      return "The requested resource could not be found.";
    }

    if (err.status === 500) {
      return "Internal server error. Our team has been notified.";
    }

    // Case E: err.error string
    if (typeof err.error === "string") {
      return err.error;
    }
  }

  // Fallback for native Error instances
  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

