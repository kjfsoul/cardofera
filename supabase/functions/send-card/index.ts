import http from 'http';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CardDeliveryRequest {
  recipientEmail: string;
  cardImage: string;
  message: string;
  scheduledDate?: string;
  userId: string;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const { recipientEmail, cardImage, message, scheduledDate, userId }: CardDeliveryRequest = JSON.parse(body);

    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: deliveryRecord, error: deliveryError } = await supabaseAdmin
      .from('card_deliveries')
      .insert({
        recipient_email: recipientEmail,
        card_image: cardImage,
        message,
        scheduled_date: scheduledDate,
        user_id: userId,
        status: scheduledDate ? 'scheduled' : 'sent',
      })
      .select()
      .single();

    if (deliveryError) throw deliveryError;

    if (!scheduledDate) {
      console.log('Sending email to:', recipientEmail);
      // Here you would integrate with an email service to send the email
    }

    res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, delivery: deliveryRecord }));
  } catch (error: any) {
    console.error('Error:', error);
    res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message || "An error occurred" }));
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});