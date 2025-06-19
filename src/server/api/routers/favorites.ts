import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  toggleFavorite,
  isFavorited,
  getUserFavorites,
} from "@/controllers/favoriteController";
import { TRPCError } from "@trpc/server";

export const favoritesRouter = createTRPCRouter({
  // Toggle favorite on/off
  toggle: publicProcedure
    .input(
      z.object({
        artworkId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Add auth check
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await toggleFavorite(ctx.user.id, input.artworkId);
    }),

  // Check if artwork is favorited
  isFavorited: publicProcedure
    .input(
      z.object({
        artworkId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await isFavorited(ctx.user.id, input.artworkId);
    }),

  // Get all users favorites
  getUserFavorites: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return await getUserFavorites(ctx.user.id);
  }),
});
