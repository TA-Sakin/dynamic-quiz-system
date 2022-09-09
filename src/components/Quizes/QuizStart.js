import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useHistory } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import useQuestions from "../../hooks/useQuestions";
import Loading from "../shared/Loading";

const QuizStart = () => {
  const { id } = useParams();
  const [questions, time, loading] = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const checkboxRef = useRef(null);
  const [answers, setAnswers] = useState([]);
  const answersOfQuestions = {};
  const checkedAnswers = [];

  const navigate = useNavigate();
  useEffect(() => {
    const findAllCheckbox =
      checkboxRef.current?.querySelectorAll("input:checked");
    if (findAllCheckbox) {
      findAllCheckbox.forEach((item) => (item.checked = false));
    }
  }, [currentQuestion]);

  if (loading) {
    return <Loading />;
  }

  const handleClick = (checked, option) => {
    if (checked) {
      checkedAnswers.push(option);
    } else {
      const idx = checkedAnswers.indexOf(option);
      checkedAnswers.splice(idx, 1);
    }
    answersOfQuestions[currentQuestion] = checkedAnswers;
  };

  const handleNext = () => {
    if (currentQuestion + 1 <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
      setAnswers((prevState) => [...prevState, answersOfQuestions]);
    }
  };

  if (answers.length === questions.length) {
    console.log(answers);
    navigate(`/result/${id}`, { state: answers });
  }

  return (
    <div className="flex justify-center my-10">
      <div
        ref={checkboxRef}
        className="shadow-lg w-[500px] pl-5 py-10 rounded-lg"
      >
        <span className="mb-3 text-lg flex items-center">
          <AiOutlineQuestionCircle className="text-green-500 mr-1" />
          Each question might have multiple answers.
        </span>
        <div className="flex justify-between mb-2">
          <p>{questions.length} questions</p>
          <p className="pr-5">{time} minutes</p>
        </div>
        <hr className="border-1" />
        <p className="text-xl my-2">
          {currentQuestion + 1}. {questions[currentQuestion]?.title}
        </p>
        {questions[currentQuestion]?.options.map((option, i) => (
          <div className="form-control w-fit">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                name="option"
                onClick={(e) => handleClick(e.target.checked, option)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-base font-semibold pl-2">{option}</span>
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-5 mr-5 ml-1">
          {/* <button
            className="btn btn-dark btn-sm rounded-none no-animation"
            onClick={handlePrev}
          >
            Previous
          </button> */}
          {currentQuestion === questions.length - 1 ? (
            <button
              className="btn btn-dark btn-sm rounded-none no-animation"
              onClick={handleNext}
            >
              Submit
            </button>
          ) : (
            <button
              className="btn btn-dark btn-sm rounded-none no-animation"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
