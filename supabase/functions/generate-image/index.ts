import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS = 3; // Hugging Face free tier limit

const requestLog = new Map<string, { count: number; lastRequest: number }>();

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientRequests = requestLog.get(clientId) || { count: 0, lastRequest: now };

  if (now - clientRequests.lastRequest > RATE_LIMIT_WINDOW) {
    clientRequests.count = 0;
    clientRequests.lastRequest = now;
  }

  if (clientRequests.count >= MAX_REQUESTS) {
    return false;
  }

  clientRequests.count++;
  requestLog.set(clientId, clientRequests);
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    const clientId = req.headers.get('x-client-info') || 'anonymous'

    if (!checkRateLimit(clientId)) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          message: 'Please wait a minute before generating another image'
        }),
        { 
          status: 429,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      )
    }

    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'black-forest-labs/FLUX.1-schnell',
    })

    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image',
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})