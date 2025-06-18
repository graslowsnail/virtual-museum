import { api } from "@/trpc/server";
import MuseumSearch from "./components/MuseumSearch";

export default async function Home() {
  // Fetch "Hello world" from tRPC
  const { greeting } = await api.hello.get();

  return (
    <main className="items-center justify-center pt-20">
      <div className="text-center mb-5">
          <h1 className="text-4xl font-mono bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent mb-1">
            AI Museum curator
          </h1>
          <p className="text-gray-500 font-mono">
            Uncover lost treasures and forgotten masterpieces.
          </p>
        </div>
      <MuseumSearch/>
    </main>
  );
}
