const code4 = `
const http = require('http');
const fetch = require('node-fetch');
require('dotenv').config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const emailRequest = JSON.parse(body);

    const apiResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: \`Bearer \${RESEND_API_KEY}\`,
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
  } catch (error) {
    res.writeHead(400, { ...corsHeaders, "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
});
`;
const data4 = { code4 };