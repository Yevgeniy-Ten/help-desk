import React from "react";
import {Button, Space, Table} from "antd";
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
        title: "Тематика",
        dataIndex: "topic",
        key: "topic",
    },
    {
        title: "Ответсвенный отдел",
        dataIndex: "department",
        key: "department",
    },
    {
        title: "Срок исполнения",
        dataIndex: "deadline",
        key: "deadline",
        render: (text) => `${text} часов`,
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
const ReglamentsTable = () => {
    const companies = [{
        id: 1,
        title: "Beeline",
        topic: "Сайты",
        department: "Отдел сайтов",
        deadline: 8
    }]
    return (
        <Table bordered title={() => <h4>Регламенты</h4>} columns={columns} dataSource={companies}/>
    );
};

export default ReglamentsTable;
