import { db } from "@/server/db";
import { userFavorites, artwork } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function toggleFavorite(userId: string, artworkId: string) {
  // check if user already favorited it
  const existingFavorite = await db
    .select()
    .from(userFavorites)
    .where(
      and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.artworkId, artworkId),
      ),
    )
    .limit(1);

  if (existingFavorite.length > 0) {
    // Remove from favorites
    await db
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.artworkId, artworkId),
        ),
      );
    return { isFavorited: false };
  } else {
    // Add to favorites
    await db.insert(userFavorites).values({
      id: crypto.randomUUID(),
      userId: userId,
      artworkId: artworkId,
    });
    return { isFavorited: true };
  }
}

export async function isFavorited(
  userId: string,
  artworkId: string,
): Promise<boolean> {
  const favorite = await db
    .select()
    .from(userFavorites)
    .where(
      and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.artworkId, artworkId),
      ),
    )
    .limit(1);

  return favorite.length > 0;
}

export async function getUserFavorites(userId: string) {
  const favorites = await db
    .select({
      id: userFavorites.id,
      artworkId: userFavorites.artworkId,
      artwork: {
        id: artwork.id,
        objectID: artwork.objectID,
        title: artwork.title,
        artist: artwork.artist,
        date: artwork.date,
        medium: artwork.medium,
        primaryImage: artwork.primaryImage,
        department: artwork.department,
        culture: artwork.culture,
      },
    })
    .from(userFavorites)
    .innerJoin(artwork, eq(userFavorites.artworkId, artwork.id))
    .where(eq(userFavorites.userId, userId));

  return favorites;
}
