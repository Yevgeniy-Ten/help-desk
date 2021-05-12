import { Button, Space } from "antd";

export const usersColumns = [
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
      return company.name;
    }
  },
  {
    title: "Группа",
    dataIndex: "role",
    key: "role",
    render: (role) => {
      return role.name;
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
    render: (isFake) => {
      return isFake ? "Не подтверждена" : "Подтверждена";
    }
  },
  {
    title: "Действия",
    key: "action",
    render: (text, user) => {
      return (
        <Space>
          {!user.isAuthorized && <Button type="primary">Потвердить</Button>}
          <Button danger={true}>Удалить</Button>
        </Space>
      );
    }
  }
];
// firstName: "Евгений",
//     lastName: "Тен",
//     company: {
//     name: "Beeline"
// },
// email: "ten.djenia@gmail.com",
//     role: {
//     name: "Клиент"
// },
// status: true,
