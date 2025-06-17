'use client'
import { api } from "@/trpc/react";  // Change this line
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import ArtworkCarousel from "./ArtworkCarousel";

export default function MuseumSearch() {
    const [userQuery, setUserQuery] = useState("")
    
    const museumSearch = api.museum.search.useMutation();

    // Test call (you can put this in a button click)
    function onSubmit () {
      museumSearch.mutate({ query: userQuery });
    }

  return (
      <div>
      <div className="flex w-full max-w-sm items-center gap-2 ">
        <Input 
          className="border-violet-400 focus-visible:border-violet-500 focus-visible:ring-violet-500/50" 
          placeholder="Discover art from any time period" 
          type="text" 
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <Button type="submit" variant="purple" onClick={onSubmit}>
            Find art
        </Button>

        {/* Show loading state */}
        {museumSearch.isPending && (
            <p className="text-sm text-gray-500">Searching the Met Museum...</p>
        )}
        
        {/* Show error state */}
        {museumSearch.isError && (
            <p className="text-sm text-red-500">Something went wrong!</p>
        )}
        
        {/* Show success - you'll probably move this to a separate component */}
        {museumSearch.isSuccess && (
            <p className="text-sm text-green-500">Found {museumSearch.data?.total} artworks!</p>
        )}

      </div>
      <div>
        {/* Artwork Carousel - NEW! */}
        {museumSearch.isSuccess && museumSearch.data?.artworks && (
            <ArtworkCarousel artworks={museumSearch.data.artworks} />
        )}

      </div>
      </div>
  );
}
