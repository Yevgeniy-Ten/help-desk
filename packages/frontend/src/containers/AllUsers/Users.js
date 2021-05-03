import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import EditUser from "./EditUser";
import UserCreate from "./UserCreate";
import UserTableContainer from "./UserTableContainer";

const Users = () => {
  return (
    <div style={{ padding: "10px 20px" }}>
      <Switch>
        <Route path="/users" exact={true} component={UserTableContainer} />
        <Route path="/users/create" exact={true} component={UserCreate} />
        <Route path="/users/edit/:id" exact={true} component={EditUser} />
        <Redirect to="/users" />
      </Switch>
    </div>
  );
};

export default Users;
