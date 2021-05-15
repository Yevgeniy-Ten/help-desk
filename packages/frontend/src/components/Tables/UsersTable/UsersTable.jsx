import React from "react";
import { Button, Space, Table, Divider } from "antd";
import { NavLink } from "react-router-dom";

const UsersTable = ({ users, onAuthorizeUser }) => {
  const usersColumns = [
    {
      title: "Имя Фамилия",
      key: "full_name",
      render: (user) => {
        return `${user.firstName} ${user.lastName}`;
      }
    },
    {
      title: "Компания",
      dataIndex: "company",
      key: "company",
      render: (company) => {
        return company ? company.title : "Не выбрано";
      }
    },
    {
      title: "Из отдела",
      dataIndex: "orgStructure",
      key: "orgStructure",
      render: (orgStructure) => {
        return orgStructure ? orgStructure.departmentId : "Не выбрано";
      }
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return role ? role.name : "Нет роли";
      }
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Почта",
      dataIndex: "isFake",
      key: "isFake",
      defaultSortOrder: "descend",
      // eslint-disable-next-line consistent-return
      sorter: (a, b) => {
        if (a.isFake > b.isFake) return 1;
        if (a.isFake < b.isFake) return -1;
      },
      render: (isFake) => {
        return isFake ? (
          <span style={{ textAlign: "center", color: "#ff4d4f" }}>
            Не подтверждена
          </span>
        ) : (
          <span style={{ textAlign: "center", color: "#99c578" }}>
            Подтверждена
          </span>
        );
      }
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
            <NavLink to={`/users/edit/${user.id}`}>
              <Button type="dashed">Редактировать</Button>
            </NavLink>
            <Button danger={true}>Удалить</Button>
          </Space>
        );
      }
    }
  ];
  return (
    <Table
      title={() => {
        return (
          <>
            <div className="flex-between">
              <h3>Контакты</h3>
              <NavLink to="/users/create">
                <Button type="primary">Создать пользователя</Button>
              </NavLink>
            </div>
          </>
        );
      }}
      bordered={true}
      columns={usersColumns}
      dataSource={users}
    />
  );
};

export default UsersTable;
