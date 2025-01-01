// Follow Deno conventions for imports
import { delay } from "@std/async";
import { deepMerge } from "@std/collections";

const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;
let lastRequestTime = 0;
let requestCount = 0;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
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
    const huggingFaceToken = Deno.env.get('HUGGINGFACE_API_KEY');

    if (!huggingFaceToken) {
      throw new Error('HuggingFace API key not configured');
    }

    console.log('Generating image with prompt:', prompt);

    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      {
        headers: { 
          Authorization: `Bearer ${huggingFaceToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ inputs: prompt })
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
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
        error: error.message,
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