import React, { Fragment, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

const Signup = () => {
  const { token, signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    emptyError: "",
  });

  const handleName = (e) => {
    if (e.target.name) {
      setInfo({ ...info, name: e.target.value });
      setErrors({ ...errors, name: "" });
    }
  };

  const handleEmail = (e) => {
    const verifyEmail = /\S+@\S+\.\S+/.test(e.target.value);
    if (verifyEmail) {
      setInfo({ ...info, email: e.target.value });
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Invalid email" });
      setInfo({ ...info, email: "" });
    }
  };

  const handlePassword = (e) => {
    const verifyPassword = /(?=.*?[#?!@$%^&*-]).{6,}/.test(e.target.value);
    const passLength = /.{6,}/.test(e.target.value);
    if (verifyPassword) {
      setInfo({ ...info, password: e.target.value });
      setErrors({ ...errors, password: "" });
    } else {
      if (!passLength) {
        setErrors({
          ...errors,
          password: "Minimum 6 characters including 1 special character",
        });
        setInfo({ ...info, password: "" });
      }
    }
  };

  const handleConfirmPass = (e) => {
    if (e.target.value === info.password) {
      setInfo({ ...info, confirmPassword: e.target.value });
      setErrors({ ...errors, confirmPassword: "" });
    } else {
      setErrors({ ...errors, confirmPassword: "Password doesn't match" });
      setInfo({ ...info, confirmPassword: "" });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (!info.name) {
        setErrors({ ...errors, name: "Enter your name" });
      } else if (!info.email) {
        setErrors({ ...errors, email: "Enter your email" });
      } else if (!info.password) {
        setErrors({ ...errors, password: "Enter your password" });
      } else if (info.confirmPassword !== info.password) {
        setErrors({ ...errors, confirmPassword: "Password doesn't match" });
      } else {
        setLoading(true);
        await signup(info.email, info.password, info.name);
        if (token) {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    if (error) {
      switch (error?.code) {
        case "auth/email-already-in-use":
          setErrors((errors) => ({
            ...errors,
            email: "Email already in use",
          }));
          break;
        default:
          setErrors((errors) => ({
            ...errors,
            emptyError: `${error.code.slice(5)}`,
          }));
          break;
      }
    }
  }, [error]);

  return (
    <Fragment>
      <div className="max-w-sm mx-auto my-20 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
        <h1 className="text-2xl text-center font-bold mb-3">Sign up</h1>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col space-y-5">
            <label htmlFor="name">
              <p className="text-sm text-slate-700 pb-2">Name</p>
              <input
                onChange={handleName}
                id="name"
                name="name"
                type="name"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
              {errors?.name && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.name}
                </p>
              )}
            </label>
            <label htmlFor="email">
              <p className="text-sm text-slate-700 pb-2">Email address</p>
              <input
                onChange={handleEmail}
                id="email"
                name="email"
                type="email"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
              {errors?.email && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.email}
                </p>
              )}
            </label>
            <label htmlFor="password">
              <p className="text-sm text-slate-700 pb-2">Password</p>
              <input
                onChange={handlePassword}
                id="password"
                name="password"
                type="password"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
              />
              {errors?.password && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.password}
                </p>
              )}
            </label>
            <label htmlFor="confirmPassword">
              <p className="text-sm text-slate-700 pb-2">Confirm Password</p>
              <input
                onChange={handleConfirmPass}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Confirm your password"
              />
              {errors?.confirmPassword && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
              {errors?.emptyError && (
                <p className="text-red-400 text-xs mt-3 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors?.emptyError}
                </p>
              )}
            </label>
            {!loading ? (
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <span>SIGN UP</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                disabled
              >
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
              </button>
            )}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span className="font-bold text-sm">Login </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
