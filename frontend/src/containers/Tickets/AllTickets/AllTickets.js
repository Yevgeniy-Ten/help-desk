import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTicketsState } from "../redux/getters/getters";
import TicketList from "../../../components/TicketList/TicketList";
import TicketsFilter from "../../../components/TicketsFilter/TicketsFilter";
import { fetchTickets } from "../redux/action/ticketsAction";

const AllTickets = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector(getTicketsState, shallowEqual);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    return (
        <>
            <TicketsFilter />
            <TicketList tickets={tickets} />
        </>
    );
};

export default AllTickets;