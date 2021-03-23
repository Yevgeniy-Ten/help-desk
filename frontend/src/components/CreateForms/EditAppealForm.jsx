import React from "react";
import {Button, Form, Input, Select} from "antd";
import AppealAdminFields from "./AppealAdminFields";

const {Option} = Select
const EditAppealForm = ({topics, onSaveAppeal}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form}
              name="edit-appeal"
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onSaveAppeal}>
            <Form.Item
                name={"topicId"}
                label="Тематика обращения"
                rules={[{required: true}]}>
                <Select placeholder="Выберите тематику обращения" allowClear>
                    {topics.map((topic, index) => {
                        return (
                            <Option key={index} value={topic.id}>
                                {topic.name}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <AppealAdminFields/>
            <Form.Item
                name={"title"}
                label="Заголовок обращения"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Опишите вкратце обращение"}/>
            </Form.Item>
            <Form.Item
                name={"description"}
                label="Полное описание"
            >
                <Input.TextArea
                    placeholder={"Подробно опишите проблему"}
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item
                name={"deadline"}
                label="Плановая дата решения"
                rules={[
                    {
                        required: true,
                        message: "Дата обязательна!"
                    }]}>
                <Input placeholder={"Дата решения"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditAppealForm;
