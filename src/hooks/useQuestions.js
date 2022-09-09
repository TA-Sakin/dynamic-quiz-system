import { useEffect, useState } from "react";

const useQuestions = (id) => {
  const [questions, setQuestions] = useState({});
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/quiz/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setTime(data.time.limit);
        setLoading(false);
      });
  }, [id]);
  return [questions, time, loading];
};

export default useQuestions;
