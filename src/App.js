import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;

