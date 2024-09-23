import Header from "@/components/Header";
import ListMovie from "@/components/ListMovie";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <ListMovie />
    </main>
  );
}
