import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  // TODO: Handle the error appropriately in your application
  // throw new Error("OPENAI_API_KEY is not defined in environment variables");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export default openai;
