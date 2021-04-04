import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import EditUser from "./EditUser";
import UserTableContainer from "./UserTableContainer";


const Users = () => {
    return (
        <div style={{padding: "10px 20px"}}>
            <Switch>
                <Route path={"/users"} exact component={UserTableContainer}/>
                <Route path={"/users/edit/:id"} exact component={EditUser}/>
                <Redirect to={"/users"}/>
            </Switch>
        </div>
    );
};

export default Users;
