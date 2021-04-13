import React from "react";
import {Table, Tag} from "antd";

const HistoryTable = ({history}) => {
    const historyColumns = [
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
            render: createdAt => new Date(createdAt).toLocaleDateString()
        },
        {
            title: "ID заявки",
            dataIndex: "requestId",
            key: "requestId",
        },
        {
            title: "Тематика",
            dataIndex: "topicId",
            key: "topicId",
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
            dataIndex: "departmentId",
            key: "departmentId",
        },
        {
            title: "Ответствейнный сотрудник",
            dataIndex: "employeeId",
            key: "employeeId",
            // render: (employeeId) => employeeId ? `${employeeId.firstName} ${employeeId.lastName}` : null
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
            title: "Комментарии",
            dataIndex: "comment",
            key: "comment",
        },
    ];
    return (
        <Table scroll={{x: 1100}} columns={historyColumns} dataSource={history}/>
    )
};

export default HistoryTable;
