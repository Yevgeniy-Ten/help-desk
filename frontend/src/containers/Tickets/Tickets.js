import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AllTickets from "./AllTickets/AllTickets";
import AddTicketForm from "./AddTicketForm/AddTicketForm";
import TicketDetailsPage from "./TicketDetailsPage/TicketDetailsPage";
import 'antd/dist/antd.css';

const Tickets = () => {
    return (
        <Switch>
            <Route exact path="/tickets" component={AllTickets} />
            <Route exact path="/tickets/add" component={AddTicketForm} />
            <Route exact path="/tickets/:id" component={TicketDetailsPage} />
            <Redirect to="/tickets" />
        </Switch>
    );
};

export default Tickets;