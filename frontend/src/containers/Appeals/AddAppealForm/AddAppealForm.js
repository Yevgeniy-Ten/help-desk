import React from "react";
import {Button, Form, Input} from "antd";

const AddAppealForm = () => {
    const [form] = Form.useForm()
    const submitFormHandler = (event) => {

    }
    return (
        <Form
            form={form}
            name="add-appeal"
            size={"large"}
            layout={"vertical"}
            onFinish={submitFormHandler}
        >
            <Form.Item
                name={"email"}
                label="Тематика обращения">
                <Input placeholder={"Выбрать тематику"}/>
            </Form.Item>
            <Form.Item
                name={"status"}
                label="Заголовок обращения">
                <Input placeholder={"Опишите в кратце обращение"}/>
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Полное описание проблемы">
                <Input.TextArea placeholder={"Подробно опишите проблему"} />
            </Form.Item>
            <Form.Item
                label={"Прикрепить файлы"}
                name={"date"}>
                <Input placeholder="Файлы"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Создать обращение
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddAppealForm;