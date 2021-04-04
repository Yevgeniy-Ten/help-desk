import {Button, Space} from "antd";

export const usersColumns = [{
    title: "Имя Фамилия",
    key: "full_name",
    render: (user) => `${user.firstName} ${user.lastName}`
},
    {
        title: "Компания",
        dataIndex: "company",
        key: "company",
        render: (company) => company.name
    }, {
        title: "Группа",
        dataIndex: "role",
        key: "role",
        render: (role) => role.name
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
                    {!user.isAuthorized && <Button type="primary">Потвердить</Button>}
                    <Button danger>Удалить</Button>
                </Space>
            )
        }
    }]
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