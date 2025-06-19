import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NODE_ENV === "production" ? "https://virtual-museum-ten.vercel.app" : "http://localhost:3000"
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession
} = authClient
