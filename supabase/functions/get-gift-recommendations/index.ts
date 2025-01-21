import http from "http";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Recommendation {
  name: string;
  price: number;
  description: string;
  source: string;
}

interface QuizState {
  // Define the structure of quizState if needed
  // For now, we'll assume it's an empty object
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  try {
    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }

    // Parse the request body
    const { quizState }: { quizState: QuizState } = JSON.parse(body);

    // Here you would integrate with external APIs like Amazon or Etsy
    // For now, we'll return mock recommendations
    const mockRecommendations: Recommendation[] = [
      {
        name: "Customized Photo Album",
        price: 29.99,
        description: "Beautiful photo album with personalized cover",
        source: "Amazon",
      },
      {
        name: "Handcrafted Jewelry Box",
        price: 45.0,
        description: "Elegant wooden jewelry box with custom engraving",
        source: "Etsy",
      },
    ];

    res.writeHead(200, { ...corsHeaders, "Content-Type": "application/json" });
    res.end(JSON.stringify({ recommendations: mockRecommendations }));
  } catch (error: any) {
    res.writeHead(400, { ...corsHeaders, "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message || "An error occurred" }));
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
