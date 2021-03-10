import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Button, Form, Input } from "antd";
import 'antd/dist/antd.css';
// import { getTiketsState } from '../redux/getters/getters';

const AddTicketForm = () => {
    const dispatch = useDispatch();
    // const { TextArea } = Input;
    // const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();
    const submitFormHandler = (event) => {

    }

    return (
        <>
            <Form
                form={form}
                name="add-tiket"
                size={"large"}
                layout={"vertical"}
                onFinish={submitFormHandler}
            >
                <Form.Item
                    name={"appealId"}
                    label="№ обращения">
                    <Input placeholder={"Выбрать обращение"} />
                </Form.Item>
                <Form.Item
                    name={"type"}
                    label="Тип">
                    <Input placeholder={"Инцидент или обащение"} />
                </Form.Item>
                <Form.Item
                    label={"Тематика"}
                    name={"topicId"}>
                    <Input placeholder="Тематика" />
                </Form.Item>
                <Form.Item
                    name={'description'}
                    label="Полное описание тикета">
                    <Input.TextArea placeholder={"Подробно опишите тикет"} />
                </Form.Item>
                <Form.Item
                    label={"Статус"}
                    name={"status"}>
                    <Input placeholder="Тикет в работе" />
                </Form.Item>
                <Form.Item
                    label={"Срок"}
                    name={"deadline"}>
                    <Input placeholder="Срок выполнения тикета" />
                </Form.Item>
                <Form.Item
                    label={"Сделано за"}
                    name={"hourWork"}>
                    <Input placeholder="3 часа" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size={"large"}>
                        Создать обращение
                </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddTicketForm;