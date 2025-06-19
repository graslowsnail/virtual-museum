import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

import { TRPCReactProvider } from "@/trpc/react";
import { AuthStatus } from "./components/auth-status";
import { Providers } from "./providers";



export const metadata: Metadata = {
  title: "Artefact AI",
  description: "An AI Museum curator.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body>
        <TRPCReactProvider>
          {/* Auth Status Bar at the top */}
          <div className="h-screen max-h-screen ">
              <div className="absolute top-0 left-0 right-0 border-b border-zinc-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center justify-between px-4">
                  <div className="flex items-center gap-8">
                    <Link href="/">
                      <h1 className="text-2xl font-mono bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent mb-1 hover:from-violet-400 hover:to-violet-600 transition-all cursor-pointer">
                        Artefact AI
                      </h1>
                    </Link>
                    <Link href="/favorites/me" className="text-lg font-mono">
                      <span>🏛️</span>{" "}
                      <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent hover:from-violet-400 hover:to-violet-600 transition-all">
                        Vault
                      </span>
                    </Link>
                  </div>
                  <AuthStatus />
                </div>
              </div>

              {/* Main Content */}
              <Providers>
                {children}
              </Providers>
            </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
