"use client"

import { signIn } from "@/lib/auth-client"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { AuthCard } from "@daveyplate/better-auth-ui"
import { Github } from "lucide-react"

export function AuthView({ pathname }: { pathname: string }) {
    const isSignIn = pathname === "sign-in"
    const isSignUp = pathname === "sign-up"

    return (
        <main className="flex min-h-screen items-center justify-center pt-20">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-mono">
                        <span>{isSignIn ? "🔓" : "🏛️"}</span>{" "}
                        <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
                            {isSignIn ? "Unlock Your Vault" : "Join the Museum"}
                        </span>
                    </CardTitle>
                    <CardDescription className="font-mono">
                        {isSignIn 
                            ? "Sign in to access your collection of ancient artifacts"
                            : "Create an account to start your journey as a curator"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* GitHub Sign In */}
                    <Button
                        onClick={() => signIn.social({ provider: "github" })}
                        className="w-full gap-2 bg-black text-white hover:bg-gray-800 font-mono"
                        size="lg"
                    >
                        <Github className="h-5 w-5" />
                        Continue with GitHub
                    </Button>

                    {/* Google Sign In */}
                    <Button
                        onClick={() => signIn.social({ provider: "google" })}
                        className="w-full gap-2 bg-white text-black border border-gray-300 hover:bg-gray-50 font-mono"
                        size="lg"
                    >
                        <svg 
                            className="h-5 w-5" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 48 48"
                        >
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                        Continue with Google
                    </Button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-gradient-to-r from-violet-300 via-violet-400 to-violet-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-violet-400 rounded px-2 text-zinc-900 font-mono">Or</span>
                        </div>
                    </div>

                    {/* Email/Password Option using AuthCard */}
                    <div className="mt-4">
                        <AuthCard pathname={pathname} />
                    </div>

                </CardContent>
            </Card>
        </main>
    )
}