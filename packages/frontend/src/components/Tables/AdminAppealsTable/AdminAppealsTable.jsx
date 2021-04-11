import React from "react";
import {Button, Space, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";

const AdminAppealsTable = ({appeals}) => {
    const appealColumns = [
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
            render: createdAt => new Date(createdAt).toLocaleDateString()
        },
        {
            title: "ID заявки",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Заявка от",
            dataIndex: "clientRequest",
            key: "clientRequest",
            render: (creator) => `${creator.firstName} ${creator.lastName}`
        },
        {
            title: "Тематика",
            dataIndex: "topic",
            key: "topic",
            render: topic => topic.title
        },
        {
            title: "Приоритет",
            dataIndex: "priority",
            key: "priority",
            render: (priority) => {
                let color = "green"
                if (priority === "Срочно") {
                    color = "gold"
                } else if (priority === "Средний") {
                    color = "cyan"
                } else if (priority === "Критично") {
                    color = "red"
                }
                return <Tag color={color}>
                    {priority.toUpperCase()}
                </Tag>
            }
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Ответственный отдел",
            dataIndex: "department",
            key: "department",
            render: department => department.title
        },
        {
            title: "Ответствейнный сотрудник",
            dataIndex: "employeeRequest",
            key: "employeeRequest",
            render: (employeeRequest) => employeeRequest ? `${employeeRequest.firstName} ${employeeRequest.lastName}` : null
        },
        {
            title: "Срок исполнения (часов)",
            dataIndex: "deadline",
            key: "deadline",
        },
        {
            title: "Затрачено (часов)",
            dataIndex: "hourWork",
            key: "hourWork",
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
