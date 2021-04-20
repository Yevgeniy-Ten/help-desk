import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="auth-form-container">
      <Switch>
        <Route exact={true} path="/auth" component={Login} />
        <Route exact={true} path="/auth/register" component={Register} />
      </Switch>
    </div>
  );
};

export default Auth;
