import Link from "next/link";

const TriviaPage = () => {
  return (
    <main>
      <div className="container">
        <h1>Quiz App</h1>
        <Link href="/Quiz">
          <button>Start Quiz</button>
        </Link>
      </div>
    </main>
  );
};

export default TriviaPage;
