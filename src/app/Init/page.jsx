import Link from "next/link";

import localFont from "next/font/local";
const fontSerif = localFont({ src: "../../fonts/NotoSerifTangut.ttf" });
const fontSageffine = localFont({ src: "../../fonts/Sageffine.otf" });

const InitQuiz = () => {

  return (
    <main>
      <div className="bg-red-900 bg-cover bg-center ">
        <div className={fontSageffine.className}>
          <div className="absolute top-0 right-0 m-7 text-4xl">
            Trivia <span className="bg-white text-red-900 rounded-md p-2">Malbec</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className={fontSageffine.className}>
            <h1 className="text-center text-white text-6xl md:text-7xl lg:text-8xl p-5">Para Comenzar<br></br>la Trivia pulse<br></br>sobre el botón</h1>
          </div>
          <div className={fontSerif.className + " my-5"}>
            <Link href="/Quiz" className="bg-white text-red-900 rounded-full px-10 py-4 text-center text-3xl font-bold  hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
              Comenzar Trivia
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InitQuiz;

