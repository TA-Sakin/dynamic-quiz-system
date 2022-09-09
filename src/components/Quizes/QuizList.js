import React, { useEffect, useState } from "react";
// import useQuiz from "../../hooks/useQuiz";
import QuizCard from "./QuizCard";

const QuizList = () => {
  // const { quizes } = useQuiz();
  // const { quizes } = useQuiz();
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/quizes", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setQuizes(data));
  }, []);
  return (
    <div>
      <h3 className="text-3xl text-center mt-10 font-bold">
        List of All Free and Premium Quizes
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center mx-auto">
        {quizes?.map((quiz) => (
          <QuizCard key={quiz?.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;
