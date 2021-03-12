import React, { useEffect } from "react";
import { 
    Button,
    Form, 
    Input, 
    Select
    } from "antd";
import FileInput from "../../../components/UploadFile/FileInput";
import "./AddAppealForm.css";
const { Option } = Select;

const AddAppealForm = () => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        //выгружает список тематик для options
    }, []);

    const submitFormHandler = (value) => {
        // console.log(value);
    }

    const onTopicChange = (value) => {
        form.setFieldsValue({ topic: value });
    };

    const onFilesChange = (filesList) => {
        form.setFieldsValue({ upload: filesList });
    };

    return (
        <Form
            form={form}
            name="add-appeal"
            size={"default"}
            layout={"horizontal"}
            onFinish={submitFormHandler}
        >
            <Form.Item
                name={"topic"}
                label="Тематика обращения"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                placeholder="Выберите тематику обращения"
                onChange={onTopicChange}
                allowClear
                >
                    <Option value={"IT"}>IT</Option>
                    <Option value={"телефония"}>телефония</Option>
                    <Option value={"другое"}>другое</Option>
                </Select>
            </Form.Item>
            <Form.Item
            name={"title"}
            label="Заголовок обращения"
            rules={[
                {
                    required: true,
                },
            ]}
            >
                <Input placeholder={"Опишите в кратце обращение"} />
            </Form.Item>
            <Form.Item 
            name={"description"}
            label="Полное описание проблемы">
                <Input.TextArea placeholder={"Подробно опишите проблему"} />
            </Form.Item>
            <Form.Item
            name={"upload"}
            label="Загрузите файл"
            >
                <FileInput 
                name="upload"
                onChange={onFilesChange}
                />
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