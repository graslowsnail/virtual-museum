import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env"
import { z } from "zod";


export const museumRouter =  createTRPCRouter({
    search: publicProcedure
    .input(z.object({
        query: z.string()
    }))
    .mutation(async ({ input }) => {
        // Format the message
        const messages = [
            {role: "user", content: input.query}
        ];

        // Internal fetch to existing API
        const response = await fetch(`${env.NEXTJS_URL}/api/museum`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ messages })
        });

        return response.json()
    })
});