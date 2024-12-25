import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    const enhancedPrompt = `A beautiful, high quality greeting card image of ${prompt}`

    console.log('Starting image generation with prompt:', enhancedPrompt)
    
    const hf = new HfInference(Deno.env.get('HuggingFace'))
    
    const image = await hf.textToImage({
      inputs: enhancedPrompt,
      model: 'stabilityai/stable-diffusion-2-1',
      parameters: {
        negative_prompt: "blurry, bad quality, distorted, ugly",
        num_inference_steps: 25,
        guidance_scale: 7.0,
      }
    })

    console.log('Image generated successfully')

    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate image', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})