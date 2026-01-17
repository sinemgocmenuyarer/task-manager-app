import express from "express";
import cors from "cors";
import genererateResponse from "./generate.js";

const app = express();
app.use(express.json());
app.use(cors());

//GET request handler
app.get("/", (req, res) => {
  res.send("Hello from the server!❤️");
});

// POST request handler for generating responses
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await genererateResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Port configuration
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
