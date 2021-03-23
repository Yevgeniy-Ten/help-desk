import React from "react";
import {Button, Space, Table} from "antd";


const UsersTable = ({users, onAuthorizeUser}) => {
    const usersColumns = [{
        title: "Имя Фамилия",
        key: "full_name",
        render: (user) => `${user.firstName} ${user.lastName}`
    },
        {
            title: "Компания",
            dataIndex: "companyId",
            key: "companyId",
            render: (company) => company ? company : "Не выбрано"
        },
        {
            title: "Из отдела",
            dataIndex: "departmentId",
            key: "departmentId",
            render: (department) => department ? department : "Не выбрано"
        },
        {
            title: "Роль",
            dataIndex: "roleId",
            key: "roleId",
            render: (role) => role ? role : "Нет роли"
        },
        {
            title: "Электронная почта",
            dataIndex: "email",
            key: "email",
        }, {
            title: "Действия",
            key: "action",
            render: (text, user) => {
                return (
                    <Space>
                        {!user.isAuthorized &&
                        <Button onClick={onAuthorizeUser.bind(null, user.id)} type="primary">Потвердить</Button>}
                        <Button danger>Удалить</Button>
                    </Space>
                )
            }
        }]
    return (
        <Table columns={usersColumns} dataSource={users}/>
    );
};

export default UsersTable;
