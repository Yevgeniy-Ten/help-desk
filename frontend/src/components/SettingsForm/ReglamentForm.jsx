import React from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input} from "antd";

const ReglamentForm = () => {
    const [form]=useForm()
    return (
        <Form form={form}
              name="add-appeal"
              className={"appeal-form"}
              layout={"vertical"}
        >
            <Form.Item
                name={"title"}
                label="Название регламента"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Заголовок регламента"}/>
            </Form.Item>
            <Form.Item
                name={"title"}
                label="Тематика"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Выбрать тематику"}/>
            </Form.Item>
            <Form.Item
                name={"title"}
                label="Отвественный отдел"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Заголовок регламента"}/>
            </Form.Item>
            <Form.Item
                name={"title"}
                label="Плановая дата решения"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Плановая дата решения"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать компанию
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ReglamentForm;
