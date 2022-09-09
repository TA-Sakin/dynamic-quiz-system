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
import Dashboard from "./components/Dashboard/Shared/Dashboard";
import Profile from "./components/Dashboard/Shared/Profile";
import AllUsers from "./components/Dashboard/ForAdmin/AllUsers";
import CreateQuiz from "./components/Dashboard/ForAdmin/CreateQuiz";
import { QuizProvider } from "./Context/QuizContext";
// import StartQuiz from "./components/Quizes/StartQuiz";
import QuizStart from "./components/Quizes/QuizStart";
import Routed from "./components/Quizes/Routed";
import Results from "./components/Quizes/Results";

function App() {
  return (
    <Fragment>
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
          <Route path="profile" element={<Profile />}></Route>
          <Route path="users" element={<AllUsers />}></Route>
          <Route path="createquiz" element={<CreateQuiz />}></Route>
        </Route>
        <Route
          path="/quizes/:id"
          element={
            <RequireAuth>
              <QuizStart />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/result/:id"
          element={
            <RequireAuth>
              <Results />
            </RequireAuth>
          }
        ></Route>
        <Route
          exact
          path="/quizes"
          element={
            <RequireAuth>
              <QuizList />
            </RequireAuth>
          }
        ></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;

