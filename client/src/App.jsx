import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
<<<<<<< HEAD
import LoginPage from "./Pages/LoginPage";
=======
import Login from "./Components/Login";
>>>>>>> origin/main


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/login" element={<LoginPage />} />
=======
        <Route path="/login" element={<Login />} />
>>>>>>> origin/main
      </Routes>
    </BrowserRouter>
  );
};

export default App;
