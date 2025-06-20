"use client";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { HeartCrack, Search } from "lucide-react";
import ArtworkCarousel from "./ArtworkCarousel";

export default function MuseumSearch() {
  const [userQuery, setUserQuery] = useState("");

  const museumSearch = api.museum.search.useMutation();

  // Test call (you can put this in a button click)
  function onSubmit() {
    // Create the messages array that the AI expects
    const messages = [
      { role: "user" as const, content: userQuery }
    ];
    
    museumSearch.mutate({ messages });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 pr-25 pl-25 sm:flex-row">
        <div className="relative flex-1 pb-5">
          <Input
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Explore the dungeons to discover artifacts, describe what you want to find..."
            className="h-12 rounded-xl border-2 border-violet-400 pr-12 font-mono text-lg focus-visible:border-violet-500 focus-visible:ring-violet-500/50"
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={museumSearch.isPending || userQuery === ""}
          className="h-12 rounded-xl bg-gradient-to-r from-violet-300 to-violet-500 px-8 font-mono font-semibold text-black hover:from-violet-400 hover:to-violet-500 hover:ring-[3px] hover:ring-violet-500/50"
        >
          {museumSearch.isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Exploring
            </div>
          ) : (
            "Discover"
          )}
        </Button>
      </div>
      {/* Show initial state when no search has been made */}
      {!museumSearch.isPending &&
        !museumSearch.isSuccess &&
        !museumSearch.isError && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 to-violet-500">
              <Search size={48} color="#18181b" strokeWidth={1.75} />
            </div>
            <h3 className="mb-2 font-mono text-xl font-semibold text-gray-500">
              🧙 Agent standing by...
            </h3>
            <p className="mx-auto max-w-md font-mono text-gray-400">
              Ready to explore the dungeons and bring you ancient artifacts!
            </p>
          </div>
        )}

      {/* Show loading state */}
      {museumSearch.isPending && (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-l from-violet-300 to-violet-500 px-6 py-3 shadow-lg backdrop-blur-sm">
            <div className="h-6 w-6 animate-spin rounded-full border-3 border-violet-300 border-t-transparent" />
            <span className="font-mono font-medium text-zinc-900">
              Searching the dungeons for artifacts...
            </span>
          </div>
        </div>
      )}

      {/* Show error state */}
      {museumSearch.isError && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 to-violet-500">
            <HeartCrack size={48} color="#18181b" strokeWidth={1.75} />
          </div>
          <h3 className="mb-2 font-mono text-xl font-semibold text-gray-500">
            🪦 You'r agent died while exploring the dungeon:(
          </h3>
          <p className="mx-auto max-w-md font-mono text-gray-400">
            Search again to for him to respawn:)
          </p>
        </div>
      )}

      {museumSearch.isSuccess && museumSearch.data?.artworks && (
        <ArtworkCarousel artworks={museumSearch.data.artworks} />
      )}
    </div>
  );
}
