import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '@/env'
import { db } from '@/server/db'

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
        google: { 
            clientId: env.GOOGLE_CLIENT_ID, 
            clientSecret: env.GOOGLE_CLIENT_SECRET, 
        },
    }
})