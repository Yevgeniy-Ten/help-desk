import React from "react";
import { Layout } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../containers/Auth/redux/getters/getters";
import { NavLink } from "react-router-dom";
import "./Header.css";

const {Header} = Layout
const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    return (
        <Header>

            <div className="header">
                <NavLink to="/auth">
                    <h1 className="header__logo">HELP DESK</h1>
                </NavLink>
                <div className="header__item">
                    <NavLink to="/auth">
                        <span className="header__link">
                            Log in
                        </span>
                    </NavLink>
                    <NavLink to="/auth/register">
                        <span className="header__link">
                            Register
                        </span>
                    </NavLink>
                </div>
                
            </div>
            
        </Header>
    )
}

export default AppHeader;