import React from "react";
import {Button, Space, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";

const AdminAppealsTable = ({appeals}) => {
    const appealColumns = [
        {
            title: "Дата создания",
            dataIndex: "createdDate",
            key: "date",
            render: text => new Date(text).toLocaleDateString()
        },
        {
            title: "ID заявки",
            dataIndex: "appealId",
            key: "appeal",
        },
        {
            title: "Заявка от",
            dataIndex: "creator",
            key: "creator",
            render: (creator) => creator.name
        },
        {
            title: "Тематика",
            dataIndex: "topic",
            key: "topic",
            render: topic => topic.name
        },
        {
            title: "Ответственный",
            dataIndex: "employee",
            key: "employee",
            render: employee => employee.name
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Приоритет",
            dataIndex: "priority",
            key: "priority",
            render: (priority) => {
                let color = "cyan"
                if (priority === "high") {
                    color = "volcano"
                } else if (priority === "medium") {
                    color = "gold"
                } else if (priority === "incident") {
                    color = "red"
                }
                return <Tag color={color}>
                    {priority.toUpperCase()}
                </Tag>
            }
        },
        {
            title: "Затрачено",
            dataIndex: "hourWorks",
            render: (hourWorks) => `${hourWorks} часов`
        },
        {
            title: "Действия",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <NavLink to={`/appeals/${record.id}`}>Детали</NavLink>
                    <NavLink to={`/appeals/${record.id}/edit`}>Редактировать</NavLink>
                    <Button danger>Удалить</Button>
                </Space>
            ),
        },
    ];
    return (
        <Table scroll={{x: 1100}} columns={appealColumns} dataSource={appeals}/>
    )
};

export default AdminAppealsTable;
