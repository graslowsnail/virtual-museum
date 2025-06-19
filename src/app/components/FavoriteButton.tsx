import { Heart, HeartOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

interface Artwork {
  objectID: number;
  title: string;
  artist: string;
  date: string;
  primaryImage: string;
  department: string;
}

export default function FavoriteButton({
  artwork,
  user,
  isLoading,
}: {
  artwork: Artwork;
  user: any;
  isLoading: boolean;
}) {

  // Check if artwork is favorited (only if user is logged in)
  const { data: isFavorited, refetch } = api.favorites.isFavorited.useQuery(
    { artworkId: String(artwork.objectID) },
    { enabled: !!user } // Only run query if user exists
  );

  // Toggle favorite mutation
  const toggleMutation = api.favorites.toggle.useMutation({
    onSuccess: () => {
      refetch(); // Refresh the favorite status
    },
    onError: (error) => {
      console.error("Failed to toggle favorite:", error);
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle favorite for logged in user
    toggleMutation.mutate({ artworkId: String(artwork.objectID) });
  };

  if (isLoading) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      </div>
    );
  }

  // Show HeartOff if user is logged in AND has favorited this artwork
  const showFavorited = user && isFavorited;

  // If user is not logged in, show disabled button with tooltip
  if (!user) {
    return (
      <div className="group relative">
        <button
          disabled
          className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full bg-gradient-to-r from-violet-300 to-violet-500 text-gray-400 transition-all duration-200 hover:from-violet-400 hover:to-violet-500 hover:ring-[3px] hover:ring-violet-500/50"
        >
          <Heart color="#18181b"  size={24} fill="none" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
          <div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-mono text-white shadow-lg">
            Sign in to add artifacts to vault
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={toggleMutation.isPending}
      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
        toggleMutation.isPending 
          ? "bg-gray-300 cursor-not-allowed" 
          : "bg-violet-300 text-violet-700 hover:bg-violet-400"
      }`}
    >
      {toggleMutation.isPending ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      ) : showFavorited ? (
        <HeartOff size={24} className="transition-all duration-200" />
      ) : (
        <Heart size={24} fill="none" className="transition-all duration-200" />
      )}
    </button>
  );
}
