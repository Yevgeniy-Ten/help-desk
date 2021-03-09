import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Layout} from "antd"
import {NavLink, Link} from "react-router-dom";
import {getUser} from "../../containers/Auth/redux/getters/getters";
import {logoutUser} from "../../containers/Auth/redux/actions/usersActions";

const {Header} = Layout
const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    const logoutUserHandler = () => {
        dispatch(logoutUser());
    };
    return (
        <Header>
            <p>Header</p>
        </Header>
    )
}

export default AppHeader;