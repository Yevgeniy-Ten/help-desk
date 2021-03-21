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
        title: "Клиентов",
        dataIndex: "employees",
        key: "employees",
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
const CompanyTables = () => {
    const companies = [{
        id: 1,
        title: "Beeline",
        employees: 5
    }]
    return (
        <Table bordered title={() => <h4>Компании</h4>} columns={columns} dataSource={companies}/>
    );
};

export default CompanyTables;
