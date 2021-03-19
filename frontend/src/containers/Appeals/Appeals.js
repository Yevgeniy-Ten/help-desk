import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AllAppeals from "./AllAppeals/AllAppeals";
import AddAppealForm from "./AddAppealForm/AddAppealForm";
import DetailAppealPage from "./DetailAppealPage/DetailAppealPage";

const Appeals = () => {
    return (
        <Switch>
            <Route exact path="/appeals" component={AllAppeals}/>
            <Route exact path="/appeals/add" component={AddAppealForm}/>
            <Route exact path="/appeals/:id" component={DetailAppealPage}/>
            <Redirect to="/appeals"/>
        </Switch>
    );
};

export default Appeals;