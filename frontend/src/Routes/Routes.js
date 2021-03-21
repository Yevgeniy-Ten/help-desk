import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../containers/Auth/redux/getters/getters";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import UserProfile from "../containers/UserProfile/UserProfile";
import Appeals from "../containers/Appeals/Appeals";
import Auth from "../containers/Auth/Auth";
import AllUsers from "../containers/AllUsers/AllUsers";
import Settings from "../containers/Settings/Settings";
import FAQ from "../containers/FAQ/FAQ";

const Routes = () => {
    const user = useSelector(getUser)
    return (
        <Switch>
            <ProtectedRoute isAllowed={user} exact redirectTo={"/auth"} path="/" component={UserProfile}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/appeals" component={Appeals}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/users" component={AllUsers}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/settings" component={Settings}/>
            <ProtectedRoute isAllowed={!user} redirectTo={"/appeals"} path="/auth" component={Auth}/>
            <Route path={"/faq"} exact component={FAQ}/>
            <Redirect to={"/"}/>
        </Switch>
    );
};

export default Routes;
