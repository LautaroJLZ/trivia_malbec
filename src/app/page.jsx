import Link from "next/link";

export default function Home() {

  return (
    <main>
      <div className="bg-[url('../views/img/bg_bodega_rojo.jpg')] bg-cover bg-center ">
        <div className="absolute top-0 right-0 m-7 text-2xl">
          Trivia <span className="bg-white text-red-700 rounded-md p-2">Malbec</span>
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="w-[35%] backdrop-blur-sm bg-white/[.05] flex flex-col py-10 px-16 border border-white rounded-lg shadow-xl">
            <h1 className="text-left text-white text-4xl py-8">Login Malbec</h1>
            <label htmlFor="username" className="text-white">Usuario:</label>
            <input id="username" type="text" className="text-red-800 border-2 border-white rounded-md py-1 px-2 my-2" />
            <label htmlFor="password" className="text-white mt-4">Contraseña:</label>
            <input id="password" type="password" className="text-red-800 border-2 border-white rounded-md py-1 px-2 my-2" />
            <Link href="/Init" className="bg-white text-red-700 rounded-md px-10 py-3 text-center my-10 text-2xl hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
              Iniciar Sesion 
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}
