import express from "express";
import cors from "cors";

const app = express();

// TODO: Use CORS middleware to decide
// TODO Add Nodemon to make it easy to restart the server on changes
app.use(cors());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello from the server!❤️🎶❤️🎶");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
