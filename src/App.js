import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import HomePage from "./Pages/Home/HomePage";
import EventPage from "./Pages/Event/EventPage";
import CommunitiesPage from "./Pages/Community/CommunitiesPage/CommunitiesPage";
import NavBar from "./components/NavBar/NavBar";
import Community from "./Pages/Community/Community";
import Profile from "./Pages/Profile/Profile";
import RegisteredEvents from "./Pages/Profile/Student/RegisteredEvents";
import FollowedCommunities from "./Pages/Profile/Student/FollowedCommunities";
import RegisterStudent from "./Pages/Register/RegisterStudent";
import RegisterCommunity from "./Pages/Register/RegisterCommunity";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/event/*" element={<EventPage />} />
        <Route path="/community/*" element={<Community />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/registeredEvents"
          element={<RegisteredEvents />}
        />
        <Route
          path="/profile/followedCommunities"
          element={<FollowedCommunities />}
        />

        <Route path="/studentregister" element={<RegisterStudent />} />
        <Route path="/communityregister" element={<RegisterCommunity />} />
      </Routes>
    </div>
  );
}

export default App;
