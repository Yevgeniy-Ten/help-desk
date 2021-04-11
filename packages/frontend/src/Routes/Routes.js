import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../containers/Auth/redux/getters/getters";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import UserProfile from "../containers/UserProfile/UserProfile";
import Appeals from "../containers/Appeals/Appeals";
import Auth from "../containers/Auth/Auth";
import History from "../containers/History/History";
import Users from "../containers/AllUsers/Users";
import Settings from "../containers/Settings/Settings";
import FAQ from "../containers/FAQ/FAQ";
import EditUser from "../containers/AllUsers/EditUser";

const Routes = () => {
    const user = useSelector(getUser)
    return (
        <Switch>
            <ProtectedRoute isAllowed={user} exact redirectTo={"/auth"} path="/" component={UserProfile}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/appeals" component={Appeals}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/requests/history" component={History}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/users" component={Users}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/settings" component={Settings}/>
            <ProtectedRoute isAllowed={!user} redirectTo={"/appeals"} path="/auth" component={Auth}/>
            <ProtectedRoute isAllowed={user} redirectTo={"/auth"} path="/edit/user/:id" component={EditUser}/>
            <Route path={"/faq"} exact component={FAQ}/>
            <Redirect to={"/"}/>
        </Switch>
    );
};

export default Routes;
