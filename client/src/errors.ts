type ErrorPayload = {
  error?: string;
  message?: string;
};

const ERROR_MESSAGES = {
  invalid_api_key:
    "Server configuration issue. Please contact support or try again later.",
  BadModelOutput: "The AI returned an unexpected format. Please try again.",
  InvalidRequest: "Please enter a valid task prompt.",
} as const;

export const getUserErrorMessage = (
  status: number,
  payload?: ErrorPayload,
): string => {
  if (payload?.error && payload.error in ERROR_MESSAGES) {
    return ERROR_MESSAGES[payload.error as keyof typeof ERROR_MESSAGES];
  }

  if (status >= 500) {
    return "The service is temporarily unavailable. Please try again.";
  }

  if (status === 429) {
    return "Too many requests. Please try again in a moment.";
  }

  if (status === 400) {
    return payload?.message ?? "Please check your input and try again.";
  }

  return payload?.message ?? "Please try again.";
};
