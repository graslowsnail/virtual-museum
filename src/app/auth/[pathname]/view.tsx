"use client"

import { AuthCard } from "@daveyplate/better-auth-ui"

export function AuthView({ pathname }: { pathname: string }) {
    return (
        <main style={{ paddingTop: "100px" }}>
            <AuthCard pathname={pathname}  />
        </main>
    )
}