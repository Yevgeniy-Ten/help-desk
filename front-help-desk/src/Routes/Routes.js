import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Tickets from "../containers/Tickets/Tickets";
import Appeals from "../containers/Appeals/Appeals";
import Auth from "../containers/Auth/Auth";
import { useSelector } from "react-redux";
import { getUser } from "../containers/Auth/redux/getters/getters";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const Routes = () => {
    const user = useSelector(getUser)
    return (
        <Switch>
            <ProtectedRoute isAllowed={true} redirectTo={"/auth"} path="/appeals" component={Appeals} />
            <ProtectedRoute path="/tickets" isAllowed={true} redirectTo={"/auth"} component={Tickets} />
            <ProtectedRoute isAllowed={!user} redirectTo={"/"} path="/auth" component={Auth} />
            <Route path={"/faq"} exact component={Route} />
            <Redirect to={!!user ? "/appeals" : "/auth"} />
        </Switch>
    );
};

export default Routes;
