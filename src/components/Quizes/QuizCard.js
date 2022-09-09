import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={quiz.image} alt="quiz" className="w-full" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title items-center text-center">
          {quiz.name}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p>{quiz.description}</p>
        <div className="card-actions items-center justify-around mt-5">
          <div className="badge badge-outline">Taken by:{quiz.takenBy}</div>
          <Link to={`/quizes/${quiz._id}`}>
            <button className="btn btn-sm btn-outline">Start Now</button>
          </Link>
          <div className="badge badge-outline">{quiz.time.limit}minutes</div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
