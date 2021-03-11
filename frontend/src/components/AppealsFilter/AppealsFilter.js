import React from "react";
import {Input, Form, Button, Checkbox} from "antd";


const AppealsFilter = () => {
    const [form] = Form.useForm()
    const submitFormHandler = (value) => {
        console.log(value);
    }

    return (
        <Form
            form={form}
            name="form-filter"
            size={"large"}
            layout={"horizontal"}
            onFinish={submitFormHandler}
        >
            <Form.Item
                name={"email"}
                label="Поиск по идентификатору">
                <Input placeholder={"Выбранные идентефикаторы"}/>
            </Form.Item>
            <Form.Item
                name={"status"}
                label="По статусу">
                <Input placeholder={"Статус"}/>
            </Form.Item>
            <Form.Item
                label={"По дате"}
                name={"date"}>
                <Input placeholder="Дата"/>
            </Form.Item>
            <Form.Item>
                <Form.Item name="myAppeals" valuePropName="checked" noStyle>
                    <Checkbox>Мои обращения</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Потвердить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AppealsFilter;