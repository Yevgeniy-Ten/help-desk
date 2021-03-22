import React from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {fetchTopicCreate} from "../../containers/Settings/redux/settingsActions";

const TopicForm = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const onCreateTopic = (topic) => dispatch(fetchTopicCreate(topic))
    return (
        <Form form={form}
              name="add-appeal"
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onCreateTopic}
        >
            <Form.Item
                name={"title"}
                label="Имя темы"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Имя темы"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать тематику
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TopicForm;
