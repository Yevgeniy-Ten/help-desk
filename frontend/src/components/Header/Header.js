import React from "react";
import {Layout} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../containers/Auth/redux/getters/getters";

const {Header} = Layout
const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    return (
        <Header>
            <h1 style={{color: "#fff"}}>HELP_DESK</h1>
        </Header>
    )
}

export default AppHeader;