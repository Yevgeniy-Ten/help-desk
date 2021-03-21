import React from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input} from "antd";

const DepartmentForm = () => {
    const [form]=useForm()
    return (
        <Form form={form}
              name="add-department"
              className={"appeal-form"}
              layout={"vertical"}
        >
            <Form.Item
                name={"title"}
                label="Имя отдела"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Имя отдела"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать отдел
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DepartmentForm;
