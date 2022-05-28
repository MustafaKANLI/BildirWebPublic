import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import HomePage from "./Pages/Home/HomePage";
import EventPage from "./Pages/Event/EventPage";
import CommunitiesPage from "./Pages/Community/CommunitiesPage/CommunitiesPage";
import NavBar from "./components/NavBar/NavBar";
import Community from "./Pages/Community/Community";
import Profile from "./Pages/Profile/Profile";
import RegisterStudent from "./Pages/Register/RegisterStudent";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/event/*" element={<EventPage />} />
        <Route path="/community/*" element={<Community />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/studentregister" element={<RegisterStudent />} />
      </Routes>
    </div>
  );
}

export default App;
