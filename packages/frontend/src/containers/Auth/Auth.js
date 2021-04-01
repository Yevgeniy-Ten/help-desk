import React from "react";
import {Route, Switch} from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import "./Auth.css"

const Auth = () => {
    return (
        <div className="auth-form-container">
            <Switch>
                <Route exact path="/auth" component={Login}/>
                <Route exact path="/auth/register" component={Register}/>
            </Switch>
        </div>
    );
};

export default Auth;
