import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error("Error: OPENAI_API_KEY is not set in environment variables.");
  process.exit(1);
}
const openai = new OpenAI({
  apiKey: openaiApiKey,
});
export default openai;
