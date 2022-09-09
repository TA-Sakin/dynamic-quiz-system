// import React, { useContext, useEffect, useState } from "react";

// const QuizContext = React.createContext();
// export function useQuiz() {
//   return useContext(QuizContext);
// }
// export const QuizProvider = ({ children }) => {
//   const [quizes, setQuizes] = useState([]);
//   const [quiz, setQuiz] = useState({});
//   const [id, setId] = useState("");
//   const [quizloading, setQuizLoading] = useState(true);
//   useEffect(() => {
//     fetch("quiz.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setQuizes(data);
//         id && setQuiz(data.find((d) => d.id === id));
//         setQuizLoading(false);
//       });
//   }, [id]);
//   if (id) {
//     console.log("context", id, quiz);
//   }
//   const value = { quizes, quizloading, setId, quiz };

//   return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
// };
