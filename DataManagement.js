import axios from "../api/axios";
import Pusher from "pusher-js";
import { io } from "socket.io-client";
import {
  LOGOUT_URL,
  REVIEWS_URL,
  TRAININGS_URL,
  BOOKINGS_URL,
  REGISTER_URL,
} from "./URLConstants";

export async function getAllReviews() {
  const response = await axios.get(REVIEWS_URL);
  return response;
}
export async function getAllTrainings() {
  const response = await axios.get(TRAININGS_URL);
  return response.data;
}
export async function getAllBookings() {
  const response = await axios.get(BOOKINGS_URL);

  return response;
}
export async function getAllTrainers() {
  const response = await axios.get(REGISTER_URL);
  return response.data.filter((each) => {
    return each.classification === "Trainer";
  });
}
export async function Logout() {
  const response = await axios.get(LOGOUT_URL);
  return response;
}
