import React from "react";
import AppealAdminFields from "./AppealAdminFields";
import {Button, Form, Input, Select, Upload} from "antd";
import {prioritets} from "../../constants"
import { UploadOutlined } from "@ant-design/icons";
const {Option} = Select;

const CreateAppealForm = ({topics, onFieldsChange, onCreateAppeal, user, users, isLoaded}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form}
              name="add-appeal"
              onFieldsChange={onFieldsChange}
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onCreateAppeal}>
            <Form.Item
                name={"topicId"}
                label="Тематика обращения"
                rules={[{required: true}]}>
                <Select placeholder="Выберите тематику обращения" allowClear>
                    {topics.map((topic, index) => {
                        return (
                            <Option key={index} value={topic.id}>
                                {topic.title}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            {user && user.role && user.role.name==="admin" &&
                <AppealAdminFields users={users}/>
            }
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
                name={"priority"}
                label="Приоритет"
                rules={[{required: true}]}>
                <Select placeholder="Приоритет" allowClear>
                    {prioritets.map((prioritet) => {
                        return (
                            <Option key={prioritet.value} value={prioritet.value}>
                                {prioritet.name}
                            </Option>
                        );
                    })}
                </Select>
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
            <Form.Item>
                <Upload>
                    <Button>
                        <UploadOutlined /> Click to Upload
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button disabled={isLoaded} type="primary" htmlType="submit" size={"middle"}>
                    Создать заявку
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateAppealForm;
