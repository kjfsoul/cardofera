import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from "https://esm.sh/@huggingface/inference@2.3.2"

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
    if (!prompt) {
      throw new Error('Prompt is required')
    }

    const hf = new HfInference(Deno.env.get('HUGGING_FACE'))
    console.log("Generating images with prompt:", prompt)

    // Generate exactly 3 images
    const imagePromises = Array(3).fill(null).map(async () => {
      try {
        const image = await hf.textToImage({
          inputs: prompt,
          model: "stabilityai/stable-diffusion-2",
        })
        const arrayBuffer = await image.arrayBuffer()
        return Buffer.from(arrayBuffer).toString('base64')
      } catch (error) {
        console.error("Error generating single image:", error)
        return null
      }
    })

    const results = await Promise.all(imagePromises)
    const validImages = results.filter(Boolean).map(base64 => 
      `data:image/png;base64,${base64}`
    )

    // Pad with placeholders if needed
    const finalImages = [
      ...validImages,
      ...Array(3 - validImages.length).fill('/placeholder.svg')
    ].slice(0, 3)

    console.log(`Generated ${validImages.length} valid images`)
    return new Response(
      JSON.stringify({ images: finalImages }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error("Error in generate-image function:", error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: 500,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})