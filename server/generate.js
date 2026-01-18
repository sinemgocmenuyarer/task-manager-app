import openai from "./api.js";
// TODO: Refine the prompt to ensure concise and actionable plans
// TODO: Implement empty response handling for API requests
const genererateResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a concise planning assistant. Produce a short, actionable, step-by-step personal plan. Use 3-7 numbered steps, keep each step one sentence, and include only the plan.",
        },
        {
          role: "user",
          content: `Create a step-by-step personal plan for: ${prompt}`,
        },
      ],
    });
    return response.choices[0]?.message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};
export default genererateResponse;
