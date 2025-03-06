import { useEffect, useState } from "react";

const QuizPage = () => {
  const [quizData, setQuizData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/quiz")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching Quiz data:", error));
  }, []);

  return (
    <div>
      <h1>Islamic Quiz</h1>
      <ul>
        {quizData.map((quiz: any, index: number) => (
          <li key={index}>
            <strong>{quiz.question}</strong>
            <ul>
              {quiz.options.map((option: string, idx: number) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p><strong>Answer: </strong>{quiz.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizPage;
