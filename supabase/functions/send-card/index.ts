import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CardDeliveryRequest {
  recipientEmail: string;
  cardImage: string;
  message: string;
  scheduledDate?: string;
  userId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { recipientEmail, cardImage, message, scheduledDate, userId } = await req.json() as CardDeliveryRequest

    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Store delivery record
    const { data: deliveryRecord, error: deliveryError } = await supabaseAdmin
      .from('card_deliveries')
      .insert({
        recipient_email: recipientEmail,
        card_image: cardImage,
        message,
        scheduled_date: scheduledDate,
        user_id: userId,
        status: scheduledDate ? 'scheduled' : 'sent'
      })
      .select()
      .single()

    if (deliveryError) throw deliveryError

    // If no scheduled date, send immediately
    if (!scheduledDate) {
      // TODO: Implement email sending logic with your preferred email service
      console.log('Sending email to:', recipientEmail)
    }

    return new Response(
      JSON.stringify({ success: true, delivery: deliveryRecord }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})