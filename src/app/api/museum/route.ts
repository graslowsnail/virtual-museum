import { openai } from "@ai-sdk/openai";
import { generateText, type CoreMessage } from "ai";
import { tool } from "ai";
import { z } from "zod";

interface MuseumArtwork {
  objectID: number;
  title: string;
  artist: string;
  date: string;
  medium: string;
  primaryImage: string;
  department: string;
  culture?: string;
}

async function searchMET(query: string ) {
  console.log("🔍 Searching MET for:", query );

  const baseUrl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search";
  const searchParams = new URLSearchParams();

  searchParams.append("q", query);
  searchParams.append("hasImages", "true");

  console.log("FETCHING ARTWORK FROM", `${baseUrl}?${searchParams}`);

  const response = await fetch(`${baseUrl}?${searchParams}`);
  const data = await response.json();

  console.log("📊 Found", data.total, "artworks");

  // Get first 8 object IDs
  const objectIds = data.objectIDs?.slice(0, 50) || [];

  // Fetch detailed info for each object
  const artworks = await Promise.all(
    objectIds.map(async (id: number) => {
      try {
        const objResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
        );
        const objData = await objResponse.json();

        return {
          objectID: objData.objectID,
          title: objData.title || "Untitled",
          artist: objData.artistDisplayName || objData.culture || "Unknown",
          date: objData.objectDate || "Date unknown",
          medium: objData.medium || "Medium unknown",
          primaryImage: objData.primaryImage,
          department: objData.department,
          culture: objData.culture,
        };
      } catch (error) {
        console.error(`❌ Error fetching object ${id}:`, error);
        return null;
      }
    }),
  );

  const filteredArtworks = artworks.filter(Boolean) as MuseumArtwork[];

  return {
    total: data.total,
    artworks: filteredArtworks,
  };
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as { messages: CoreMessage[] };
  const { messages } = body;

  const result = await generateText({
    model: openai("gpt-4"),
    system: `
    You are a virtual museum curator.
    When you call the museumSearch tool:
    • Boil the user request down to compact keywords.
    • Drop polite filler ("please", "show me"), articles, and punctuation.
    • Keep culturally or temporally significant words (e.g., "japan", "19th century").
    •If the request is a single broad culture / nationality / era
        (e.g. "Mexican", "Baroque", "Roman"), enrich the query
        by adding 2-4 art-specific words such as "art", "painting",
        "sculpture", "folk", "mural", "ceramic", etc THAT RELATES TO THAT CULTURE THE MOST.
    `,
    messages,
    tools: {
      museumSearch: tool({
        description:
          "Search the Metropolitan Museum of Art collection for artworks",
        parameters: z
          .object({
            query: z
              .string()
              .describe(
                [
                  "A concise keyword string to send to the Met Museum search API.",
                  '• Use nouns and adjective modifiers only (omit filler words like "show me").',
                  "• Include synonyms or related terms if they improve recall.",
                  "• If the user mentions a time period, medium, or culture, add those words.",
                  "• If the user gives a vauge culture/place/era, append extra art keywords THAT RELATES MOST TO THAT culture/place/era to broaden coverage.",
                  "• Separate multiple concepts with spaces, not punctuation.",
                  "Examples:",
                  '  User: "I want to see Japanese samurai armor from the Edo period"',
                  '  query -> "samurai armor japan edo"',
                  '  User: "Paintings of sunflowers by Van Gogh"',
                  '  query -> "van gogh sunflower painting"',
                  '  User: "I want to see somthing mexican"',
                  '  query -> "mexican art mural folk painting"',
                  '  User: "I want to see somthing egyptian"',
                  '  query -> "egyptian art sculpture hieroglyph papyrus"',
                ].join("\n"),
              ),
          })
          .strict(),

        execute: async ({ query }) => {
          console.log(query);
          const searchResult = await searchMET(query);
          return searchResult;
        },
      }),
    },
  });

  // Return both the AI response and the artwork data
  const toolResults = result.toolResults?.[0]?.result;

  return Response.json({
    aiResponse: result.text,
    artworks: toolResults?.artworks || [],
    total: toolResults?.total || 0,
  });
}
