import openai from "./api.js";
import { TASK_BREAKDOWN_SYSTEM_PROMPT } from "./prompt.js";

const genererateResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: TASK_BREAKDOWN_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Create a step-by-step personal plan for: ${prompt}`,
        },
      ],
    });
    return response.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};
export default genererateResponse;
