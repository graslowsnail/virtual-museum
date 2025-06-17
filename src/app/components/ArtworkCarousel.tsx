"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

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
  // finter out artwork with no imgage
  const validArtworks = artworks.filter(
    (artwork) => artwork.primaryImage && artwork.primaryImage.trim() !== "",
  );

  if (validArtworks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No artworks with images found.
      </div>
    );
  }

  return (
    <Carousel className="mx-auto w-full max-w-4xl">
      <CarouselContent>
        {validArtworks.map((artwork, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
            <div className="p-1">
              <div className="border border-violet-400 rounded-lg overflow-hidden h-[600px] flex flex-col hover:ring-violet-500/50 hover:ring-[3px] transition-all duration-200 cursor-pointer">
                <div className="p-3">
                  <img
                    src={artwork.primaryImage}
                    alt={artwork.title}
                    className="h-80 w-full object-cover rounded-md"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold line-clamp-2">{artwork.title}</h3>
                    <p className="text-gray-600">{artwork.artist}</p>
                    <p className="text-sm text-gray-500">{artwork.date}</p>
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
