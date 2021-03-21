import React from "react";
import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";

const CompanyForm = () => {
    const [form]=useForm()
    return (
        <Form form={form}
              name="add-appeal"
              className={"appeal-form"}
              layout={"vertical"}
             >
            <Form.Item
                name={"title"}
                label="Название компании"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Имя компании"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать компанию
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CompanyForm;
