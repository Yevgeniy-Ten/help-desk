import React from "react";
import { Layout, Button } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { logoutUser } from "../../containers/Auth/redux/actions/usersActions";
import { getUser } from "../../containers/Auth/redux/getters/getters";

const {Header} = Layout
const AppHeader = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const logoutUserHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <Header>
            <div className="header">
                <NavLink to="/auth">
                    <h1 className="header__logo">HELP DESK</h1>
                </NavLink>
                <div className="header__item">
                    <NavLink to="/auth">
                        {user ? (
                            <>
                                <span className="header__username">
                                    {user.firstName} {user.lastName}
                                </span>
                            </>
                        ) : (
                            <span className="header__link">
                                Log in
                            </span>
                        )}
                        
                    </NavLink>
                    <NavLink to="/auth/register">
                        {user ? (
                            <Button type="default" size={"middle"} onClick={logoutUserHandler}>
                                Log out
                            </Button>
                            ) : (
                            <span className="header__link">
                                Register
                            </span>
                        )}
                    </NavLink>
                </div>
                
            </div>
        </Header>
    )
}

export default AppHeader;