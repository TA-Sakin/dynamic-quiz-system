import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const CreateQuiz = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [showPrice, setShowPrice] = useState("hidden");
  const [priceRequired, setPriceRequired] = useState(false);
  const [addQuestions, setAddQuestions] = useState({
    questions: [],
  });
  const [increaseOptions, setIncreaseOptions] = useState({
    options: [],
  });

  //   const imgStorageKey = "85af4a16326eb6123558d198cba862d3";

  const handleRadio = (e) => {
    if (e.target.value === "Paid") {
      setShowPrice("visible");
      setPriceRequired(true);
    } else {
      setShowPrice("hidden");
      setPriceRequired(false);
    }
  };

  const addQuestion = () => {
    setAddQuestions({
      questions: addQuestions.questions.concat({
        options: [],
        answers: [],
      }),
    });
  };

  const addOption = () => {
    addQuestions.questions.forEach((question) => {
      question.options.concat();
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mt-5 ">Add New Products</h3>
      <div className="card flex-shrink-0 w-full max-w-md bg-base-100">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Topic name"
                className="input input-bordered rounded-none"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Short description"
                type="description"
                className="textarea textarea-bordered rounded-none"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description quantity is required",
                  },
                })}
              />
              {errors.description?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <div className="flex justify-center">
                <div className="mb-3 w-96">
                  <label
                    htmlFor="formFile"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Topic image
                  </label>
                  <input
                    className="block w-full px-3py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    id="formFile"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "Image is required",
                      },
                    })}
                  />
                  {errors.image?.type === "required" && (
                    <span className="text-sm text-red-500">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-control w-fit">
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  name="option"
                  onChange={handleRadio}
                  value="Free"
                  // checked
                />
                <span className="text-base font-semibold pr-2">Free</span>
                <input
                  type="radio"
                  name="option"
                  onChange={handleRadio}
                  value="Paid"
                />
                <span className="text-base font-semibold pl-2">Paid</span>
              </label>
            </div>
            <div className={`form-control ${showPrice}`}>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="input input-bordered rounded-none"
                {...register("price", {
                  required: {
                    value: priceRequired,
                    message: "Price is required",
                  },
                })}
              />
              {errors.price?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold mt-3">When to show answer?</p>
            </div>
            <div className="form-control w-fit">
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  name="answer"
                  // onChange={handleRadio}
                  value="showAnsAfterSubmit"
                />
                <span className="text-base font-semibold pr-2">
                  after submission
                </span>
                <input
                  type="radio"
                  name="answer"
                  // onChange={handleRadio}
                  value="showAnsOneByOne"
                />
                <span className="text-base font-semibold pl-2">
                  after each question
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label w-fit">
                <span className="label-text mr-5">Time limit</span>
                <input
                  type="checkbox"
                  name="option"
                  // onChange={handleRadio}
                  value="Paid"
                />
                <span className="text-base font-semibold pl-2">
                  Time per question?
                </span>
              </label>
              <input
                type="number"
                name="retake"
                placeholder="Total time for all questions"
                className="input input-bordered rounded-none"
                {...register("time", {
                  required: {
                    value: true,
                    message: "Time quantity is required",
                  },
                })}
              />
              {errors.time?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.time.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Maximum retake</span>
              </label>
              <input
                type="number"
                name="retake"
                placeholder="Enter a number"
                className="input input-bordered rounded-none"
                {...register("retake", {
                  required: {
                    value: true,
                    message: "retake quantity is required",
                  },
                })}
              />
              {errors.retake?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.retake.message}
                </span>
              )}
            </div>
            {addQuestions?.questions?.map((question, i) => (
              <div className="border-2 border-gray-300 rounded-md mt-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text"> Question</span>
                  </label>
                  <input
                    type="text"
                    name="question"
                    placeholder="Enter name"
                    className="input input-bordered rounded-none"
                  />
                  {question?.options?.map((option) => (
                    <div className="mt-5">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        title="Check if it is the answer."
                      />
                      <input
                        type="text"
                        name="question"
                        placeholder="Option"
                        className="input input-bordered max-w-xs rounded-none"
                      />
                    </div>
                  ))}
                  <div
                    className="btn btn-green-500 rounded-none w-full max-w-sm mt-5"
                    onClick={addOption}
                  >
                    Add options
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-5">
              <div
                className="btn btn-accent rounded-none w-full max-w-sm"
                onClick={addQuestion}
              >
                Add question
              </div>
            </div>
            {/* </div> */}
            {/* <div className="form-control mt-6">
              <button
                className="btn btn-accent rounded-none w-full max-w-sm"
                value="Add Question"
              />
            </div> */}
            <div className="form-control mt-6">
              <input
                className="btn bg-black rounded-none w-full max-w-sm"
                value="Submit"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
