import * as React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import PostTraining from "../Trainer/PostTraining/PostTraining";
import ViewBookings from "../Trainer/ViewBookings/ViewBookings";
import Connect from "../Trainer/Connect/Connect";
import UserRegistration from "../UserRegistration/UserRegistration";
import Login from "../Login/Login";
import ViewBookingsC from "../Trainee/ViewBookingsC/ViewBookingsC";
import FindTraining from "../Trainee/FindTraining/FindTraining";
import ConnectC from "../Trainee/ConnectC/ConnectC";
import FindGym from "../Trainee/FindGym/FindGym";
import ViewDetails from "../Trainee/ViewDetails/ViewDetails";
import MoreInfo from "../Trainer/MoreInfo/MoreInfo";
import "./App.css";
import Home from "../Home/Home";
export default function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/Home/" element={<Home />} />
          <Route path="/PostTraining" element={<PostTraining />} />
          <Route path="/ViewBookings/" element={<ViewBookings />} />
          <Route path="/MoreInfo" element={<MoreInfo />} />
          <Route path="/Connect/" element={<Connect />} />

          <Route path="/FindTraining" element={<FindTraining />} />
          <Route path="/YourBookings" element={<ViewBookingsC />} />
          <Route path="/TraineeConnect" element={<ConnectC />} />
          <Route path="/FindGym" element={<FindGym />} />
          <Route path="/ViewDetails" element={<ViewDetails />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
