"use client";
import { useSession } from "@/lib/auth-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { HeartCrack } from "lucide-react";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";

interface Artwork {
  objectID: number;
  title: string;
  artist: string;
  date: string;
  primaryImage: string;
  department: string;
}

interface ArtworkCarouselProps {
  artworks: Artwork[];
}

export default function ArtworkCarousel({ artworks }: ArtworkCarouselProps) {
  const [imageLoaded, setImageLoaded] = useState(true);
  const { data: session, isPending } = useSession();

  // finter out artwork with no imgage
  const validArtworks = artworks.filter(
    (artwork) => artwork.primaryImage && artwork.primaryImage.trim() !== "",
  );

  if (validArtworks.length === 0) {
    return (
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
    );
  }

  return (
    <Carousel className="mx-auto w-full max-w-4xl">
      <CarouselContent>
        {validArtworks.map((artwork, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
            <div className="p-1">
              <div className="flex h-[600px] cursor-pointer flex-col overflow-hidden rounded-lg border border-violet-400 transition-all duration-200 hover:ring-[3px] hover:ring-violet-500/50">
                <div className="p-3">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 animate-spin rounded-full border-9 border-violet-300 border-t-transparent" />
                    </div>
                  )}
                  <img
                    src={artwork.primaryImage}
                    alt={artwork.title}
                    className={`h-80 w-full rounded-md object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-2 flex-col justify-between p-4">
                  <div>
                    <h3 className="line-clamp-2 text-lg font-bold">
                      {artwork.title}
                    </h3>
                    <p className="text-gray-600">{artwork.artist}</p>
                    <p className="text-sm text-gray-500">{artwork.date}</p>
                  </div>

                  <div className="flex justify-center">
                    <FavoriteButton 
                      artwork={artwork} 
                      user={session?.user} 
                      isLoading={isPending}
                    />
                  </div>

                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
