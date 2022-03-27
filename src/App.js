import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
