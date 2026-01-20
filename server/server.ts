import express from "express";
import cors from "cors";
import generateResponse from "./generateResponse.js";
import { ApiError } from "./error.js";

const isError = (error: unknown): error is Error =>
  error instanceof Error;

const app = express();
app.use(express.json());
app.use(cors());

//GET request handler
app.get("/", (req, res) => {
  res.send("Hello from the server!❤️");
});

//POST request handler for generating responses
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "InvalidRequest",
        message: "Prompt must be a non-empty string.",
      });
    }

    const content = await generateResponse(prompt);

    // If your model returns JSON, parse carefully:
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      return res.status(502).json({
        error: "BadModelOutput",
        message: "The AI returned an unexpected format. Please try again.",
      });
    }

    return res.status(200).json(parsed);
  } catch (error: unknown) {
    const status = error instanceof ApiError ? error.status : 500;

    return res.status(status).json({
      error:
        error instanceof ApiError
          ? error.code || error.name
          : isError(error)
            ? error.name
            : "ServerError",
      message: isError(error) ? error.message : "Something went wrong.",
    });
  }
});

// Port configuration
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
