"use client";
import { api } from "@/trpc/react";
import { useSession } from "@/lib/auth-client";
import { Heart, HeartOff, Landmark } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  // Fetch user's favorites
  const {
    data: favorites,
    isLoading: favoritesLoading,
    refetch,
  } = api.favorites.getUserFavorites.useQuery(undefined, {
    enabled: !!session?.user,
  });

  // Toggle favorite mutation
  const toggleMutation = api.favorites.toggle.useMutation({
    onSuccess: () => {
      refetch(); // Refresh the favorites list
    },
    onError: (error) => {
      console.error("Failed to toggle favorite:", error);
    },
  });

  const handleRemoveFavorite = (artworkId: string) => {
    toggleMutation.mutate({ artworkId });
  };

  // Loading state
  if (sessionLoading || favoritesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-400 border-t-transparent" />
      </div>
    );
  }

  // Not logged in
  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 to-violet-500">
            <Landmark size={48} color="#18181b" strokeWidth={1.75} />
          </div>
          <h3 className="mb-2 font-mono text-xl font-semibold text-gray-500">
            🔒 Vault locked
          </h3>
          <p className="mx-auto max-w-md font-mono text-gray-500">
            Sign in to view your vault of ancient artifacts
          </p>
          <button
            onClick={() => router.push("/auth/sign-in")}
            className="mt-6 h-12 rounded-xl bg-gradient-to-r from-violet-300 to-violet-500 px-8 font-mono font-semibold text-black transition-all hover:from-violet-400 hover:to-violet-500 hover:ring-[3px] hover:ring-violet-500/50"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // No favorites
  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 to-violet-500">
            <Landmark size={48} color="#18181b" strokeWidth={1.75} />
          </div>
          <h3 className="mb-1 text-4xl font-mono">
            <span>📦</span>{" "}
            <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
              Your vault is empty
            </span>
          </h3>
          <p className="mx-auto max-w-md font-mono text-gray-400">
            Send your agent to find ancient artifacts!
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 h-12 rounded-xl bg-gradient-to-r from-violet-300 to-violet-500 px-8 font-mono font-semibold text-black transition-all hover:from-violet-400 hover:to-violet-500 hover:ring-[3px] hover:ring-violet-500/50"
          >
            Explore Dungeons
          </button>
        </div>
      </div>
    );
  }

  // Render favorites grid
  return (
    <div className="mx-auto max-w-7xl px-4 pt-20">
      <div className="mb-8">
        <h1 className="mb-1 text-4xl font-mono">
          <span>🏛️</span>{" "}
          <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
            Your Vault
          </span>
        </h1>
        <p className="font-mono text-gray-500">
          {favorites.length} ancient artifact{favorites.length !== 1 ? "s" : ""} secured in your vault
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="relative flex flex-col overflow-hidden rounded-lg border border-violet-400 shadow-sm transition-all duration-200 hover:shadow-lg hover:ring-[3px] hover:ring-violet-500/50"
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden p-3">
              <img
                src={
                  favorite.artwork.primaryImage || "/placeholder-artwork.jpg"
                }
                alt={favorite.artwork.title}
                className="h-full w-full rounded-md object-cover"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex-1">
                <h3 className="mb-1 line-clamp-2 text-lg font-bold">
                  {favorite.artwork.title}
                </h3>
                <p className="mb-1 text-sm text-gray-600">
                  {favorite.artwork.artist}
                </p>
                <p className="text-xs text-gray-500">
                  {favorite.artwork.date}
                </p>
              </div>

              {/* Remove from favorites button - always at bottom */}
              <button
                onClick={() => handleRemoveFavorite(favorite.artworkId)}
                disabled={toggleMutation.isPending}
                className={`mt-4 flex w-full items-center justify-center rounded-xl px-4 py-2 font-mono text-sm font-medium transition-all ${
                  toggleMutation.isPending
                    ? "cursor-not-allowed text-gray-400"
                    : "bg-gradient-to-r from-red-300 to-red-400 text-black hover:from-red-400 hover:to-red-500 hover:ring-[3px] hover:ring-red-500/50"
                }`}
              >
                {toggleMutation.isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                ) : (
                  <>
                    <HeartOff size={16} className="mr-2" />
                    Remove from Vault
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
