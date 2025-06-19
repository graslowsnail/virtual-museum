import { db } from "@/server/db";
import { artwork } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { MuseumArtwork } from "@/app/api/museum/route";

export async function saveArtwork(art: MuseumArtwork) {
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
