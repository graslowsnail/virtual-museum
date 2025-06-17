import { api } from "@/trpc/server";
import ChatInput from "./components/ChatInput";

export default async function Home() {
  // Fetch "Hello world" from tRPC
  const { greeting } = await api.hello.get();

  return (
    <main className="items-center justify-center">
      <p className="text-7xl text-center">
      {greeting}
      </p>
      <ChatInput />
    </main>
  );
}
