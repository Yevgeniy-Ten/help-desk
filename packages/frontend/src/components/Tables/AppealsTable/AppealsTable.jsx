import React from "react";
import {Table, Space, Tag} from "antd"
import {NavLink} from "react-router-dom";

const AppealsTable = ({appeals}) => {
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
            title: "Тематика",
            dataIndex: "topic",
            key: "topic",
            render: topic => topic.title
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
            title: "Срок исполнения (часов)",
            dataIndex: "deadline",
            key: "deadline",
        },
        {
            title: "Действия",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <NavLink to={`/appeals/${record.id}`}>Детали</NavLink>
                </Space>
            ),
        },
    ];
    return (
        <Table columns={appealColumns} dataSource={appeals}/>
    )

};

export default AppealsTable;
