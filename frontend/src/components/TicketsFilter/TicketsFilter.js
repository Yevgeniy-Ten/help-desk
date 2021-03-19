import React from "react";
import { Input, Form, Button, Checkbox } from "antd";


const TicketsFilter = ({filterFormHandler}) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="form-filter"
            layout={"vertical"}
            onFinish={filterFormHandler}>
            <h3>Фильтр</h3>
            <hr/>
            <Form.Item
            name={"email"}
            label="Поиск по идентификатору">
                <Input placeholder={"Выбранные идентефикаторы"} />
            </Form.Item>
            <Form.Item
            name={"status"}
            label="По статусу">
                <Input placeholder={"Статус"} />
            </Form.Item>
            <Form.Item
                name={"status"}
                label="По приоритету">
                <Input placeholder={"По приоритету"} />
            </Form.Item>
            <Form.Item style={{marginBottom: "15px"}}>
                <Form.Item name="myAppeals" valuePropName="checked" noStyle>
                    <Checkbox>Мои заявки</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item style={{marginBottom: "15px"}}>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Потвердить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TicketsFilter;