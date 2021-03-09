import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AllAppeals from './AllAppeals/AllAppeals';
import DetailAppeal from './DetailAppeal/DetailAppeal';
import AddAppealForm from './AddAppealForm/AddAppealForm';

const Appeals = (props) => {

    return (
        <>
            <Switch>
                <Route exact path="/appeals" component={AllAppeals} />
                <Route exact path="/appeals/add" component={AddAppealForm} />
                <Route exact path="/appeals/:id" component={DetailAppeal} />
                <Redirect to="/appeals" />
            </Switch>
        </>
    );
};

export default Appeals;