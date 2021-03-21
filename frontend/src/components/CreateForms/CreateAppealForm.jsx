import React from "react";
import AppealAdminFields from "./AppealAdminFields";
import {Button, Form, Input, Select} from "antd";

const {Option} = Select;

const CreateAppealForm = ({topics, onFieldsChange, onCreateAppeal, isAdmin}) => {
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
                                {topic.name}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            {isAdmin && <AppealAdminFields/>}
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
                name={"description"}
                label="Полное описание"
            >
                <Input.TextArea
                    placeholder={"Подробно опишите проблему"}
                    allowClear={true}
                />
            </Form.Item>

            {/*<Form.Item name={"upload"} >*/}
            {/*    <FileInput*/}
            {/*        name="files"*/}
            {/*        onChange={onFilesChange}*/}
            {/*        inputType={false}*/}
            {/*    />*/}
            {/*</Form.Item>*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать заявку
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateAppealForm;
