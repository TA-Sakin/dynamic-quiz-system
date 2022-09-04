import { signOut } from "firebase/auth";
import React, { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.init";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };
  return (
    <Fragment>
      <div className="mt-32 flex flex-col justify-center items-center ">
        <h3 className="text-4xl font-bold mb-8">Dynamic Quiz System</h3>
        {user ? (
          <Link to="/login">
            <button
              className="btn btn-primary rounded-none no-animation"
              onClick={logout}
            >
              Logout
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
