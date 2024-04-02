import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import localFont from "next/font/local";
const fontSerif = localFont({ src: "../fonts/NotoSerifTangut.ttf" });
const fontSageffine = localFont({ src: "../fonts/Sageffine.otf" });

export default function Home() {

  return (
    <main>
      <div className="bg-[url('../views/img/bg_bodega_rojo.jpg')] bg-cover bg-center ">
        <div className={fontSageffine.className}>
          <div className="absolute top-0 right-0 m-7 text-4xl">
            Trivia <span className="bg-white text-red-900 rounded-md p-2">Malbec</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="w-[90%] md:w-[60%] lg:w-[35%] backdrop-blur-sm bg-white/[.05] flex flex-col py-5 md:py-10 px-10 md:px-16 border border-white rounded-lg shadow-xl">
            <div className={fontSageffine.className}>
              <h1 className="text-left text-white text-5xl md:text-6xl py-5 md:py-8">Login Malbec</h1>
            </div>
            <label htmlFor="username" className={fontSerif.className + " text-white text-lg"}>Usuario:</label>
            <input id="username" type="text" className={fontSerif.className + " text-red-800 border-2 border-white rounded py-2 px-5 my-2"} />
            <label htmlFor="password" className={fontSerif.className + " text-white text-lg mt-4"}>Contraseña:</label>
            <input id="password" type="password" className=" text-red-800 border-2 border-white rounded py-2 px-5 my-2" />
            {/* <Link href="/Init">
              <a className="bg-white text-red-700 rounded-md px-10 py-3 text-center my-10 text-xl hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
                Iniciar Sesión <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </a>
            </Link> */}
            <div className={fontSerif.className}>
              <Link href="/Init" className="flex gap-2 bg-white text-red-900 font-bold rounded-md px-10 py-3 text-center my-5 md:my-10 text-xl hover:bg-red-500 hover:text-white justify-center items-center transition-all duration-300 cursor-pointer">
                Iniciar Sesion <FaArrowRight className="" />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
