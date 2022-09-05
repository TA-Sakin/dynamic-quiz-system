import { signOut } from "firebase/auth";
import React, { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../Utils/firebase.init";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../shared/Loading";

const Home = () => {
  const { currentUser: user, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <Fragment>
      <div className="mt-32 flex flex-col justify-center items-center ">
        <h3 className="text-4xl font-bold mb-8">
          Welcome to Dynamic Quiz System
        </h3>
        {user ? (
          <Link to="/dashboard">
            <button className="btn btn-primary rounded-none no-animation">
              Checkout All The Quizes
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary rounded-none no-animation">
              Login To Start Your Quiz
            </button>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
