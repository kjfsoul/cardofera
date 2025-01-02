import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { quizState } = await req.json();

    // Here you would integrate with external APIs like Amazon or Etsy
    // For now, we'll return mock recommendations
    const mockRecommendations = [
      {
        name: "Customized Photo Album",
        price: 29.99,
        description: "Beautiful photo album with personalized cover",
        source: "Amazon"
      },
      {
        name: "Handcrafted Jewelry Box",
        price: 45.00,
        description: "Elegant wooden jewelry box with custom engraving",
        source: "Etsy"
      }
    ];

    return new Response(
      JSON.stringify({ recommendations: mockRecommendations }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});