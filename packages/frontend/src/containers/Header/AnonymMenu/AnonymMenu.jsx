import React from "react";
import { NavLink } from "react-router-dom";
import "../Header.css";

const AnonymMenu = () => {
  return (
    <div className="menu">
      <NavLink
        to="/auth"
        className="menu__link"
        exact={true}
        activeClassName="active"
      >
        Log in
      </NavLink>
      <NavLink
        to="/auth/register"
        className="menu__link"
        activeClassName="active"
      >
        Register
      </NavLink>
    </div>
  );
};

export default AnonymMenu;
