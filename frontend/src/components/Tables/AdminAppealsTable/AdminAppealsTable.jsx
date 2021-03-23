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
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Заявка от",
            dataIndex: "clientId",
            key: "clientId",
            render: (creator) => creator.name
        },
        {
            title: "Тематика",
            dataIndex: "topicId",
            key: "topicId",
            render: topic => topic.name
        },
        {
            title: "Ответственный отдел",
            dataIndex: "departmentId",
            key: "departmentId",
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
                } else if (priority === "Инцидент") {
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
