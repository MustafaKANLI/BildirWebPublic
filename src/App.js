import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <div>
      <Routes>
        {/*<Route path="/login" element={<Login />} />*/}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
