import { api } from "@/trpc/server";
import AIImageGenerator from "@/components/ai-image-generator";

export default async function Home() {
  // Fetch "Hello world" from tRPC
  const { greeting } = await api.hello.get();

  return (
    <main className="items-center justify-center">
      <AIImageGenerator/>
    </main>
  );
}
