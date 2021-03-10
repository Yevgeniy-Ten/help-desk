import React from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getTicketsState } from "../redux/getters/getters";
import TicketList from "../../../components/TicketList/TicketList";
import TicketsFilter from "../../../components/TicketsFilter/TicketsFilter";

const AllTickets = () => {
    const dispatch = useDispatch();

    const { tickets } = useSelector(getTicketsState, shallowEqual);

    return (
        <>
            <TicketsFilter />
            <TicketList tickets={tickets} />
        </>
    );
};

export default AllTickets;