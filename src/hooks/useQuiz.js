// import { useEffect, useState } from "react";

// const useQuiz = (id = "") => {
//   const [quizes, setQuizes] = useState([]);
//   const [quiz, setQuiz] = useState({});
//   const [quizloading, setQuizLoading] = useState(true);
//   useEffect(() => {
//     fetch("quiz.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setQuizes(data);
//         // id && setQuiz(data.find((d) => d.id === id));
//         setQuizLoading(false);
//       });
//   }, [id]);
//   if (id) {
//     console.log("use", id);
//   }
//   return [quizes, quiz, quizloading];
// };
// export default useQuiz;
