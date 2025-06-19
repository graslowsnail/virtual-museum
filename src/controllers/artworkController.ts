import { db } from "@/server/db";
import { artwork } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { MuseumArtwork } from "@/app/api/museum/route";

export async function saveArtwork(art: MuseumArtwork) {
  console.log("🔍 Saving artwork:", {
    objectID: art.objectID,
    title: art.title,
    type: typeof art.objectID
  });
  
  // Validate objectID before insert
  if (!art.objectID || typeof art.objectID !== 'number') {
    console.error("❌ Invalid objectID:", art.objectID, "for artwork:", art);
    return; // Skip this artwork
  }

  // try to insert or update if it already exist
  await db
    .insert(artwork)
    .values({
      id: String(art.objectID), // use objectID as string for id
      objectID: art.objectID,
      title: art.title,
      artist: art.artist,
      date: art.date,
      medium: art.medium,
      primaryImage: art.primaryImage,
      department: art.department,
      culture: art.culture,
    })
    .onConflictDoUpdate({
      target: artwork.objectID,
      set: {
        title: art.title,
        artist: art.artist,
        date: art.date,
        medium: art.medium,
        primaryImage: art.primaryImage,
        department: art.department,
        culture: art.culture,
      },
    });
}

// Save (upsert) multiple artworks at once
export async function saveArtworks(artworks: MuseumArtwork[]) {
    for (const art of artworks) {
      await saveArtwork(art);
    }
  }
