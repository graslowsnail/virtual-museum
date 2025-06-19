"use client"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

export function AuthStatus() {
    const { data: session, isPending } = useSession()
    const router = useRouter()
    
    if(isPending) {
        return(
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Loading...
            </div>
        )
    }

    if(!session?.user){
        return(
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/auth/sign-in")}
                    className="gap-2 font-mono bg-gradient-to-r from-violet-300 to-violet-500 text-black hover:from-violet-400 hover:to-violet-500 hover:ring-[3px] hover:ring-violet-500/50"
                >
                    <LogIn className="h-4 w-4" />
                    Sign In
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="text-muted-foreground">Welcome,</span>
                <span className="font-medium">
                    {session.user.name || session.user.email}
                </span>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="gap-2 bg-violet-300"
            >
                <LogOut className="h-4 w-4" />
                Sign out
            </Button>
        </div>
    )
}