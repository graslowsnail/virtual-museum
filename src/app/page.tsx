import { api } from "@/trpc/server";

export default async function Home() {
  // Fetch "Hello world" from tRPC
  const { greeting } = await api.hello.get();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold">{greeting}</h1>
    </main>
  );
}
