import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostTraining from "../Trainer/PostTraining/PostTraining";
import ViewTrainerBookings from "../Trainer/ViewTrainerBookings/ViewTrainerBookings";
import UserRegistration from "../UserRegistration/UserRegistration";
import Login from "../Login/Login";
import ViewTraineeBookings from "../Trainee/ViewTraineeBookings/ViewTraineeBookings";
import FindTraining from "../Trainee/FindTraining/FindTraining";
import FindGym from "../Trainee/FindGym/FindGym";
import ViewDetails from "../Trainee/ViewDetails/ViewDetails";
import MoreInfo from "../Trainer/MoreInfo/MoreInfo";
import TrainingList from "../Trainee/FindTraining/TrainingList/TrainingList";
import Bookings from "../Bookings/Bookings";
import TrainerBookedSessions from "../Trainer/TrainerBookedSessions/TrainerBookedSessions";
import Messenger from "../Chats/Messenger/Messenger";
import TrainerInfo from "../Trainee/FindTraining/TrainerInfo/TrainerInfo";
import "./App.css";
import Home from "../Home/Home";
export default function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/PostTraining" element={<PostTraining />} />
          <Route
            path="/ViewTrainerBookings"
            element={<ViewTrainerBookings />}
          />
          <Route path="/MoreInfo" element={<MoreInfo />} />
          <Route path="/Chat" element={<Messenger />} />

          <Route path="/FindTraining" element={<FindTraining />} />
          <Route path="/TrainerInfo" element={<TrainerInfo />} />

          <Route
            path="/ViewTraineeBookings"
            element={<ViewTraineeBookings />}
          />

          <Route path="/FindGym" element={<FindGym />} />
          <Route path="/ViewDetails" element={<ViewDetails />} />
          <Route path="/TrainingList" element={<TrainingList />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route
            path="/TrainerBookedSessions"
            element={<TrainerBookedSessions />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
