import express from 'express';
import { HfInference } from '@huggingface/inference';
import cors from 'cors';

const app = express();
const port = 3000;

const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;
let lastRequestTime = 0;
let requestCount = 0;

app.use(cors());
app.use(express.json());

app.post('/generate-image', async (req, res) => {
  try {
    const huggingFaceToken = process.env.HUGGING_FACE;
    if (!huggingFaceToken) {
      console.error('HuggingFace API key not configured');
      return res.status(500).json({
        error: 'Configuration Error',
        details: 'HuggingFace API key not configured. Please set up the HUGGING_FACE environment variable.'
      });
    }

    const now = Date.now();
    if (now - lastRequestTime > RATE_LIMIT_WINDOW) {
      requestCount = 0;
      lastRequestTime = now;
    }

    if (requestCount >= MAX_REQUESTS) {
      return res.status(429).json({
        error: 'Rate limit reached',
        details: 'Please wait a minute before trying again',
        retryAfter: 60
      });
    }

    requestCount++;

    const { prompt } = req.body;
    console.log('Generating image with prompt:', prompt);

    const hf = new HfInference(huggingFaceToken);
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'stabilityai/stable-diffusion-2',
    });

    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    return res.json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate image',
      details: 'An error occurred while generating the image. Please try again.'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});