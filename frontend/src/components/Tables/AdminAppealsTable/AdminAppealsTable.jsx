import React from "react";
import {Button, Space, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";

const AdminAppealsTable = ({appeals}) => {
    console.log(appeals)
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
            title: "Ответственный отдел",
            dataIndex: "department",
            key: "department",
            render: department => department.title
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
                if (priority === "Срочно") {
                    color = "volcano"
                } else if (priority === "Средний") {
                    color = "gold"
                } else if (priority === "Критично") {
                    color = "red"
                }
                return <Tag color={color}>
                    {priority.toUpperCase()}
                </Tag>
            }
        },
        {
            title: "Затрачено",
            dataIndex: "hourWork",
            render: (hourWork) => `${hourWork} часов`
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
