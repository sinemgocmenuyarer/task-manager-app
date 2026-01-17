import openai from "./api.js";

const genererateResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Break into this task to make a proper, step by step personal plan ${prompt}`,
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

export default genererateResponse;
