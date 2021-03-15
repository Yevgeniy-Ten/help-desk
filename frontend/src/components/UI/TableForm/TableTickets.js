import { Table, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const TableTickets = ({tickets}) => {
    const props = {
    bordered: true,
    pagination: { position: "bottom" },
    size: "middle",
    showHeader: true,
    scroll: { x: 400 },
    };

    const columns = [
        {
            key: "title",
            title: 'Заголовок',
            dataIndex: 'title',
            align: "center",
            // width: "50%"
        },
        {
            key: "topicId",
            title: 'Тематика',
            dataIndex: 'topicId',
            align: "center",
            // width: "50%"
        },
        {
            key: "type",
            title: 'Тип',
            dataIndex: 'type',
            align: "center",
            // width: "50%"
        },
        {
            key: "status",
            title: 'Статус',
            dataIndex: 'status',
            align: "center",
            // width: "30%"
        },
        {
            key: "priority",
            title: 'Приоритет',
            dataIndex: 'priority',
            align: "center",
            // width: "50%"
        },
        {
            key: "hourWork",
            title: 'Трудозатраты',
            dataIndex: 'hourWork',
            align: "center",
            // width: "50%"
        },
        {
            key: "deadline",
            title: 'Сроки',
            dataIndex: 'deadline',
            align: "center",
            // width: "50%"
        },
        {
            key: "action",
            title: 'Просмотр',
            dataIndex: 'action',
            align: "center",
            // width: "15%"
        },
    ];

    let data = [];
    for (let index = 0; index < tickets.length; index++) {
        data.push({
            key: index,
            id: tickets[index].id,
            appealId: tickets[index].appealId,
            title: tickets[index].title,
            topicId: tickets[index].topicId,
            type: tickets[index].type,
            status: tickets[index].status,
            priority: tickets[index].priority,
            hourWork: tickets[index].hourWork,
            deadline: tickets[index].deadline,
            description: tickets[index].description,
            action: (
                <>
                    <Button type="default" size={"middle"}>
                        <NavLink to={`/appeals/${tickets[index].id}`}>Detail</NavLink>
                    </Button>
                </>
            ),
        });
    }

    

    return (
        <Table 
        {...props}
        columns={columns} 
        dataSource={data} 
        />
    );
}

export default TableTickets;