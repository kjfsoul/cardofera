import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;
let lastRequestTime = 0;
let requestCount = 0;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const huggingFaceToken = Deno.env.get('HUGGINGFACE_API_KEY');
    if (!huggingFaceToken) {
      console.error('HuggingFace API key not configured');
      throw new Error('HuggingFace API key not configured');
    }

    const now = Date.now();
    if (now - lastRequestTime > RATE_LIMIT_WINDOW) {
      requestCount = 0;
      lastRequestTime = now;
    }

    if (requestCount >= MAX_REQUESTS) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit reached',
          details: 'Please wait a minute before trying again',
          retryAfter: 60
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    requestCount++;

    const { prompt } = await req.json();
    console.log('Generating image with prompt:', prompt);

    const hf = new HfInference(huggingFaceToken);
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'stabilityai/stable-diffusion-2',
    });

    const arrayBuffer = await image.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64}` }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      }
    );

  } catch (error) {
    console.error('Error generating image:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate image',
        details: 'Failed to generate image'
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }
      }
    );
  }
});