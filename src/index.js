import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import Routes from "./routes/index.js";
import cors from "cors";
import logger from "./middlewares/logger.js";
import path from "path";
import fs from "fs";
import { marked } from "marked";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use(logger);

const readmePath = path.join(__dirname, "Docs.md");

// Route to serve README.md content as HTML
app.get("/", (req, res) => {
  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading README.md:", err);
      res.status(500).send("Error reading README.md");
      return;
    }
    // Convert Markdown to HTML
    const htmlContent = marked(data);
    res.setHeader("Content-Type", "text/html");
    res.send(htmlContent);
  });
});

app.use("/api", Routes);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
