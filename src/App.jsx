import React from "react";
import { BASE_URL } from "./constant.js";
import { Route, Routes } from "react-router-dom";
import { SignupPage, LoginPage } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/"
          element={<div className="text-white">Hello</div>}
        ></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </>
  );
};

export default App;
