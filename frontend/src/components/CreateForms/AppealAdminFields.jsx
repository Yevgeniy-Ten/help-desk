import React from "react";
import {Form, Select} from "antd";

const {Option} = Select
const AppealAdminFields = () => {
    const users = [{
        id: 1,
        name: "Евгений"
    }]
    const prioritets = [{
        name: "Инцидиент",
        value: "incident"
    },
        {
            name: "Стандартный",
            value: "low"
        }, {

            name: "Средний",
            value: "medium"
        },
        {
            name: "Высокий",
            value: "high"
        }]
    const status = [{
        name: "Открытый",
        value: "isOpen"
    },
        {
            name: "Выполняется",
            value: "isWorked"
        }, {

            name: "Завершено",
            value: "isFinished"
        }]
    return (
        <>
            <Form.Item
                name={"topicId"}
                label="От лица клиента"
                rules={[{required: true}]}>
                <Select placeholder="От кого:" allowClear>
                    {users.map((user) => {
                        return (
                            <Option key={user.id} value={user.id}>
                                {user.name}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={"priority"}
                label="Приоритет"
                rules={[{required: true}]}>
                <Select placeholder="Приоритет" allowClear>
                    {prioritets.map((prioritet) => {
                        return (
                            <Option key={prioritet.value} value={prioritet.value}>
                                {prioritet.name}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={"status"}
                label="Статус"
                rules={[{required: true}]}>
                <Select placeholder="Статус" allowClear>
                    {status.map((status) => {
                        return (
                            <Option key={status.value} value={status.value}>
                                {status.name}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </>
    );
};

export default AppealAdminFields;
