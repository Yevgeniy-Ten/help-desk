import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';

import AllTikets from './AllTikets/AllTikets';
import DetailTiket from './DetailTiket/DetailTiket';
import AddTiketForm from './AddTiketForm/AddTiketForm';

const Tickets = (props) => {

    return (
        <>
            <Switch>
                <Route exact path="/tikets" component={AllTikets} />
                <Route exact path="/tikets/add" component={AddTiketForm} />
                <Route exact path="/appeals/:id" component={DetailTiket} />
                <Redirect to="/tikets" />
            </Switch>
        </>
    );
};

export default Tickets;