import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
  useAuthState,
} from "react-firebase-hooks/auth";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import auth from "../../firebase/firebase.init";

const Login = () => {
  const [signInWithEmailAndPassword, signInUser, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, passwordError] =
    useSendPasswordResetEmail(auth);
  const [user] = useAuthState(auth);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
    infoError: "",
  });
  const navigate = useNavigate();

  const handleEmail = (e) => {
    if (e.target.value) {
      setInfo({ ...info, email: e.target.value });
      setError({ ...errors, email: "" });
    }
  };
  const handlePassword = (e) => {
    if (e.target.value) {
      setInfo({ ...info, password: e.target.value });
      setError({ ...errors, password: "" });
    }
  };

  const handleResetPassword = async () => {
    if (info.email && !passwordError) {
      await sendPasswordResetEmail(info.email);
    } else if (passwordError === undefined || passwordError) {
      setError({ ...errors, email: "Missing email" });
    } else if (passwordError) {
      setError({ ...errors, email: `${(passwordError?.code).slice(5)}` });
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!info.email) {
      setError({ ...errors, email: "Enter a email" });
    } else if (!info.password) {
      setError({ ...errors, password: "Enter a password" });
    } else {
      await signInWithEmailAndPassword(info.email, info.password);
    }
  };
  if (user) {
    navigate("/");
  }
  useEffect(() => {
    if (error) {
      console.log(error);
      switch (error?.code) {
        case "auth/user-not-found":
          setError((errors) => ({
            ...errors,
            email: "Email not registered",
          }));
          break;
        case "auth/invalid-email":
          setError((errors) => ({
            ...errors,
            email: "Invalid email",
          }));
          break;
        case "auth/wrong-password":
          setError((errors) => ({ ...errors, password: "Wrong password" }));
          break;
        default:
          setError((errors) => ({
            ...errors,
            infoError: "User credential don't match",
          }));
          break;
      }
    }
  }, [error]);
  return (
    <section className="">
      <div className="max-w-sm mx-auto my-20 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="my-5">
          <div className="flex flex-col space-y-5">
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
                <span className="text-red-400 text-sm flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.email}
                </span>
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
                <span className="text-red-400 text-sm flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.password}
                </span>
              )}
              {errors?.infoError && (
                <span className="text-red-400 text-sm flex items-center mt-3">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.infoError}
                </span>
              )}
            </label>
            <div className="flex flex-row justify-between cursor-pointer">
              <div>
                <p
                  onClick={handleResetPassword}
                  className="text-sm font-semibold text-indigo-600"
                >
                  Forgot Password?
                </p>
              </div>
            </div>
            {!loading ? (
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <span>LOGIN</span>
              </button>
            ) : (
              <button
                className="w-full py-3 font-medium text-white bg-indigo-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                disabled
              >
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-200"></div>
              </button>
            )}
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 text-sm font-bold inline-flex space-x-1 items-center"
              >
                <span>Sign Up </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
