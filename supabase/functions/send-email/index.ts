import http from 'http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in the environment variables.');
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  cardImage: string;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const emailRequest: EmailRequest = JSON.parse(body);

    const apiResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BirthdayGen <birthday@resend.dev>",
        to: emailRequest.to,
        subject: emailRequest.subject,
        html: emailRequest.html,
        attachments: [{
          filename: "birthday-card.png",
          content: emailRequest.cardImage.split(",")[1],
          content_type: "image/png",
        }],
      }),
    });

    if (!apiResponse.ok) {
      const error = await apiResponse.text();
      throw new Error(error);
    }

    const data = await apiResponse.json();
    res.writeHead(200, { ...corsHeaders, "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error: any) {
    res.writeHead(400, { ...corsHeaders, "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message || "An error occurred" }));
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});