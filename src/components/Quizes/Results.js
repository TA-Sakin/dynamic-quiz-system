import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import Loading from "../shared/Loading";
import _ from "lodash";
import { BsCheckSquareFill } from "react-icons/bs";

const Results = () => {
  const { id } = useParams();
  const [questions, time, loading] = useQuestions(id);
  const { state } = useLocation();
  const [showAnswer, setShowAnswer] = useState("hidden");
  let score = 0;
  if (loading) {
    return <Loading />;
  }
  for (let i = 0; i < state.length; i++) {
    if (_.isEqual(questions[i].answers, state[i][i])) {
      score++;
    }
  }
  const checkAnswers = () => {
    setShowAnswer("visible");
  };
  return (
    <div className="flex justify-center my-10">
      <div>
        <h3 className="text-center my-3 font-semibold">
          You Scored:{score}/{questions.length}
        </h3>
        <div className="flex justify-center">
          <button className="btn btn-sm " onClick={checkAnswers}>
            Check Answers
          </button>
        </div>
        <div className={`${showAnswer}`}>
          {questions.map((question, i) => (
            <div>
              <p className="text-xl my-2">
                {i + 1}. {question.title}
              </p>

              {question.answers.map((answer, i) => (
                <div className="form-control w-fit">
                  <label className="label">
                    <span>
                      <BsCheckSquareFill className="text-green-400" />
                    </span>
                    <span className="text-base font-semibold pl-2">
                      {answer}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
