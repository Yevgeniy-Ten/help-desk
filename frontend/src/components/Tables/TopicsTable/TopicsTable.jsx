import React from "react";
import {Table, Space, Button} from "antd"
import {NavLink} from "react-router-dom";

const columns = [
    {
        title: "Идентификатор",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Название",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Действия",
        key: "actions",
        render: (text, record) => (
            <Space size="middle">
                <NavLink to={`/settings/topics/${record.id}`}>Редактировать</NavLink>
                <Button danger>Удалить</Button>
            </Space>
        ),
    },
];
const TopicsTable = () => {
    const topics = [{
        id: 1,
        title: "Сайты",
    }]
    return (
        <Table bordered title={()=><h4>Тематики</h4>} columns={columns} dataSource={topics}/>
    );
};

export default TopicsTable;
