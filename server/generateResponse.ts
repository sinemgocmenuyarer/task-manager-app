import openai from "./api.js";
import { TASK_BREAKDOWN_SYSTEM_PROMPT } from "./prompt.js";
import { ApiError } from "./error.js";

type OpenAIErrorLike = {
  status?: number;
  code?: string;
  response?: {
    status?: number;
  };
};

const isOpenAIErrorLike = (error: unknown): error is OpenAIErrorLike =>
  typeof error === "object" && error !== null;

const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      instructions: TASK_BREAKDOWN_SYSTEM_PROMPT,
      input: `Create a step-by-step personal plan for: ${prompt}`,
    });

    return response.output_text ?? "";
  } catch (error: unknown) {
    const status = isOpenAIErrorLike(error)
      ? (error.status ?? error.response?.status)
      : undefined;
    const code = isOpenAIErrorLike(error) ? error.code : undefined;

    if (status === 401)
      throw new ApiError(
        "Server configuration issue (invalid API key).",
        500,
        code,
      );
    if (status === 429)
      throw new ApiError(
        "Too many requests. Please try again in a moment.",
        429,
        code,
      );
    if (status !== undefined && status >= 500)
      throw new ApiError(
        "AI service is having issues. Try again shortly.",
        502,
        code,
      );

    throw new ApiError("Failed to generate a response.", status || 500, code);
  }
};

export default generateResponse;
