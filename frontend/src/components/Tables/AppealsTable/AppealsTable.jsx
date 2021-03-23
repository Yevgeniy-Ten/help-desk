import React from "react";
import {Table, Space, Button} from "antd"
import {NavLink} from "react-router-dom";

const AppealsTable = ({appeals}) => {
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
            title: "Тематика",
            dataIndex: "topicId",
            key: "topicId",
            render: topic => topic.name
        },
        {
            title: "Последнее действие",
            dataIndex: "action",
            key: "action",
            render: action => action.title
        },
        {
            title: "Действия",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <NavLink to={`/appeals/${record.id}`}>Детали</NavLink>
                    <Button danger>Удалить</Button>
                </Space>
            ),
        },
    ];
    return (
        <Table columns={appealColumns} dataSource={appeals}/>
    )

};

export default AppealsTable;
