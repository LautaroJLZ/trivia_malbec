import Link from "next/link";

const InitQuiz = () => {

  return (
    <main>
      <div className="bg-red-900 bg-cover bg-center ">
        <div className="absolute top-0 right-0 m-7 text-2xl">
          Trivia <span className="bg-white text-red-700 rounded-md p-2">Malbec</span>
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-center text-white text-5xl p-5">Para Comenzar<br></br>la Trivia pulse<br></br>sobre el botón</h1>
          <Link href="/Quiz" className="bg-white text-red-700 rounded-full px-10 py-3 text-center my-4 text-2xl font-bold  hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
            Comenzar Trivia
          </Link>
        </div>
      </div>
    </main>
  );
};

export default InitQuiz;

