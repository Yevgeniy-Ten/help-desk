import React from "react";
import { Input, Form, Button, Checkbox } from "antd";


const TicketsFilter = () => {
    const [form] = Form.useForm();

    const submitFormHandler = (event) => {

    }

    return (
        <Form
            form={form}
            name="form-filter"
            size={"default"}
            layout={"vertical"}
            onFinish={submitFormHandler}
        >
            <Form.Item
            name={"email"}
            label="Поиск по идентификатору"
            style={{marginBottom: "15px"}}
            >
                <Input placeholder={"Выбранные идентефикаторы"} />
            </Form.Item>
            <Form.Item
            name={"status"}
            label="По статусу"
            style={{marginBottom: "15px"}}
            >
                <Input placeholder={"Статус"} />
            </Form.Item>
            <Form.Item
            label={"По дате"}
            name={"date"}
            style={{marginBottom: "15px"}}
                >
                <Input placeholder="Дата" />
            </Form.Item>
            <Form.Item style={{marginBottom: "15px"}}>
                <Form.Item name="myAppeals" valuePropName="checked" noStyle>
                    <Checkbox>Мои обращения</Checkbox>
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