import React from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import TicketDetails from "../../../components/TicketDetails/TicketDetails";


const TicketDetailsPage = (props) => {
    const dispatch = useDispatch();
    return (
        <TicketDetails/>
    );
};

export default TicketDetailsPage;