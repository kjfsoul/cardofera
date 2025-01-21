import express from "express";
import { HfInference } from "@huggingface/inference";
import cors from "cors";

const app = express();
const port = 3000;

const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;
let lastRequestTime = 0;
let requestCount = 0;

app.use(cors());
app.use(express.json());

app.post("/generate-image", async (req, res) => {
  try {
    // Validate API key
    const huggingFaceToken = process.env.HUGGING_FACE;
    if (!huggingFaceToken) {
      console.error("HuggingFace API key not configured");
      return res.status(500).json({
        error: "Configuration Error",
        details:
          "HuggingFace API key not configured. Please set up the HUGGING_FACE environment variable.",
      });
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime > RATE_LIMIT_WINDOW) {
      requestCount = 0;
      lastRequestTime = now;
    }

    if (requestCount >= MAX_REQUESTS) {
      return res.status(429).json({
        error: "Rate limit reached",
        details: "Please wait a minute before trying again",
        retryAfter: 60,
      });
    }

    requestCount++;

    // Validate request body
    const { prompt, num_images = 3 } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Invalid Request",
        details: "Prompt is required and must be a string",
      });
    }

    console.log("Generating", num_images, "images with prompt:", prompt);

    const hf = new HfInference(huggingFaceToken);

    // Generate multiple images with error handling
    const imagePromises = Array.from({ length: num_images }, async () => {
      try {
        const image = await hf.textToImage({
          inputs: prompt,
          model: "stabilityai/stable-diffusion-2",
        });
        const arrayBuffer = await image.arrayBuffer();
        return Buffer.from(arrayBuffer).toString("base64");
      } catch (error) {
        console.error("Error generating single image:", error);
        throw error;
      }
    });

    const imageUrls = await Promise.all(imagePromises);

    return res.json({
      success: true,
      images: imageUrls.map((base64) => `data:image/png;base64,${base64}`),
    });
  } catch (error) {
    console.error("Error generating images:", error);
    return res.status(500).json({
      error: "Generation Error",
      details: error.message || "Failed to generate images",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
