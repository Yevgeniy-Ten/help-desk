import React from "react";
import TableTickets from "../UI/TableForm/TableTickets";

const TicketList = ({ tickets }) => {

    return (
        <TableTickets tickets={tickets} />
    );
};

export default TicketList;