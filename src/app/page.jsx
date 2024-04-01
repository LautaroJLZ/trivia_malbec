import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-center text-white text-5xl p-5">Malbec Home</h1>
        <div className="bg-black text-white p-5 rounded-md text-center  my-4 text-2xl font-bold  hover:bg-gray-300 hover:text-black transition-all duration-300 cursor-pointer">
          <Link href="/Quiz">Empezar Juego</Link>
        </div>
      </div>
    </main>
  );
}
