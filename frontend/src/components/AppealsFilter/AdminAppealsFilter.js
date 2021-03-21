import React from "react";
import {Checkbox, Form, Select} from "antd";

const {Option} = Select;

const AdminAppealsFilter = () => {
    return (
        <>
            <Form.Item
                name={"status"}
                label="По статусу"
            >
                <Select
                    placeholder="Выберите статус обращения"
                    name={"status"}>
                    <Option value={"isOpened"}>Открытые</Option>
                    <Option value={"isStarted"}>Выполняется</Option>
                    <Option value={"isFinished"}>Выполнено</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={"priority"}
                label="По приоритету"
            >
                <Select
                    placeholder="Выберите приориет"
                    name={"priority"}>
                    <Option value={"incident"}>Инцидент</Option>
                    <Option value={"high"}>Срочные</Option>
                    <Option value={"medium"}>Средние</Option>
                    <Option value={"low"}>Стандартные</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={"company"}
                label="От компании"
            >
                <Select
                    placeholder="Выберите компанию"
                    name={"company"}>
                    <Option value={"beeline"}>Beeline</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={"department"}
                label="По отделу"
            >
                <Select
                    placeholder="Выберите отдел"
                    name={"department"}>
                    <Option value={"beeline"}>Логистика</Option>
                </Select>
            </Form.Item>
            <Form.Item name={"myAppeals"} valuePropName="checked">
                <Checkbox>Мои обращения</Checkbox>
            </Form.Item>
        </>
    );
};

export default AdminAppealsFilter;
