import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AllAppeals from "./AllAppeals/AllAppeals";
import DetailAppealPage from "./DetailAppealPage/DetailAppealPage";
import EditAppealPage from "./EditAppealPage/EditAppealPage";
import AddAppealPage from "./AddAppealPage/AddAppealPage";

const Appeals = () => {
    return (
        <Switch>
            <Route exact path="/appeals" component={AllAppeals}/>
            <Route exact path="/appeals/add" component={AddAppealPage}/>
            <Route exact path="/appeals/:id" component={DetailAppealPage}/>
            <Route exact path="/appeals/:id/edit" component={EditAppealPage}/>
            <Redirect to="/appeals"/>
        </Switch>
    );
};

export default Appeals;