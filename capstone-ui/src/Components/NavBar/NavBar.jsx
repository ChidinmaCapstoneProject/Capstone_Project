import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./styles";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
const NavBar = () => {
  const { chooseClass } = useContext(AuthContext);
  return (
    <>
      <Nav>
        {/* <NavLink to='/'>
          <img src={require('../../images/logo.svg')} alt='logo' />
        </NavLink> */}
        <Bars />
        <NavMenu className="flex justify-center space-x-4">
          <NavLink
            to="/Home"
            className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
            activeStyle
          >
            Home
          </NavLink>
          {chooseClass === "Trainer" ? (
            <>
              <NavLink
                to="/PostTraining"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                Post Training
              </NavLink>
              <NavLink
                to="/ViewTrainerBookings"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                ViewBookings
              </NavLink>
              <NavLink
                to="/Chat"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                Connect
              </NavLink>
            </>
          ) : chooseClass === "Trainee" ? (
            <>
              <NavLink
                to="/FindTraining"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                Find Training
              </NavLink>
              <NavLink
                to="/Bookings"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                My Bookings
              </NavLink>
              <NavLink
                to="/FindGym"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                Find Gym
              </NavLink>
              <NavLink
                to="/Chat"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
                activeStyle
              >
                Connect
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
