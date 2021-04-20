import React from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AnonymMenu from "./AnonymMenu/AnonymMenu";
import AuthMenu from "./AuthMenu/AuthMenu";
import { logoutUser } from "../Auth/redux/actions/usersActions";
import "./Header.css";
import { getUser } from "../Auth/redux/getters/getters";

const { Header } = Layout;
const AppHeader = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const logoutUserHandler = () => {
    return dispatch(logoutUser());
  };
  return (
    <Header className="header">
      <NavLink to="/" className="header__logo">
        HELP DESK
      </NavLink>
      {!user ? <AnonymMenu /> : <AuthMenu onLogout={logoutUserHandler} />}
    </Header>
  );
};

export default AppHeader;
