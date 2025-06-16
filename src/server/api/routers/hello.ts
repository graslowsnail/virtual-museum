import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const helloRouter = createTRPCRouter({
    get: publicProcedure.query(() => ({ greeting: "Hello world" })),
})