"use client"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import type { ReactNode } from "react"

export function Providers ({ children }: {children: ReactNode}) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh() }
            Link={Link}
        >
            {children}
        </AuthUIProvider>
    )
}