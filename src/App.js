import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import RequireAuth from "./components/Authentication/RequireAuth";
import Signup from "./components/Authentication/Signup";
import Home from "./components/Home/Home";
import Navigation from "./components/shared/Navigation";
import QuizList from "./components/Quizes/QuizList";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/Authentication/PublicRoute";
import PageNotFound from "./components/shared/PageNotFound";
import { AuthProvider } from "./Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Dashboard/Shared/Profile";
import AllUsers from "./components/Dashboard/ForAdmin/AllUsers";

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<QuizList />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="users" element={<AllUsers />}></Route>
          </Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </AuthProvider>
    </Fragment>
  );
}

export default App;

