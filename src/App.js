import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import HomePage from "./Pages/Home/HomePage";
import EventPage from "./Pages/Event/EventPage";
import CommunityPage from "./Pages/Community/CommunityPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        {/*<Route path="/login" element={<Login />} />*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </div>
  );
}

export default App;
