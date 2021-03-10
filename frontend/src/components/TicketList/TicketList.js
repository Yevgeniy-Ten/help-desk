import React from "react";
import { List } from "antd";
import { Link } from "react-router-dom"

const TicketList = ({ tickets }) => {
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={tickets}
            renderItem={ticket => (
                <List.Item
                    actions={[<Link to={`/tickets/${ticket.id}`}>Детали тикета</Link>]}
                >
                    <List.Item.Meta
                        title={<a href="https://ant.design"> Тикет #{ticket.id}: {ticket.title}</a>}
                        description={ticket.description}
                    />
                    <div>content</div>
                </List.Item>
            )}
        />
    );
};

export default TicketList;