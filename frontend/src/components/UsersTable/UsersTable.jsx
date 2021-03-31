import React from "react";
import { Button, Space, Table } from "antd";
import { NavLink } from "react-router-dom";

const UsersTable = ({ users, onAuthorizeUser }) => {
  const usersColumns = [
    {
      title: "Имя Фамилия",
      key: "full_name",
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: "Компания",
      dataIndex: "company",
      key: "company",
      render: (company) => (company ? company.title : "Не выбрано"),
    },
    {
      title: "Из отдела",
      dataIndex: "departmentUser",
      key: "departmentUser",
      render: (department) => (department ? department.title : "Не выбрано"),
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      render: (role) => (role ? role.name : "Нет роли"),
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Действия",
      key: "action",
      render: (text, user) => {
        return (
          <Space>
            {!user.isAuthorized && (
              <Button
                onClick={onAuthorizeUser.bind(null, user.id)}
                type="primary"
              >
                Потвердить
              </Button>
            )}
            <NavLink to={`/edit/user/${user.id}`}>
              <Button type="dashed">Редактировать</Button>
            </NavLink>
            <Button danger>Удалить</Button>
          </Space>
        );
      },
    },
  ];
  return <Table columns={usersColumns} dataSource={users} />;
};

export default UsersTable;
