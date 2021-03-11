import React, { useEffect, useState } from "react";
import { 
    Button,
    Form, 
    Input, 
    Select, 
    Upload 
    } from "antd";
import FileInput from "../../../components/UploadFile/FileInput";
// import 'antd/dist/antd.css';
// import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Option } = Select;

const AddAppealForm = () => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        //выгружает список тематик для options
    }, []);

    const submitFormHandler = (value) => {
        console.log(value);
    }

    const onGenderChange = (value) => {
        form.setFieldsValue({ topic: value });
    };

    const normFile = (filesList) => {
        console.log(filesList);
      
        // const name = e.target.name;
        // const file = e.target.files[0];
        // console.log(name);
        // console.log(file);
        form.setFieldsValue({ upload: filesList });
    };
    return (
        <Form
            form={form}
            name="add-appeal"
            size={"default"}
            layout={"horizontal"}
            onFinish={submitFormHandler}
            // className={}
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
                {/* <Input /> */}
                <Select
                placeholder="Выберите тематику обращения"
                onChange={onGenderChange}
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
            // name={['user', 'introduction']}
            name={"description"}
            label="Полное описание проблемы">
                <Input.TextArea placeholder={"Подробно опишите проблему"} />
            </Form.Item>
            <Form.Item
            name={"upload"}
            label="Загрузите файл"
            rules={[
                {
                    required: true,
                },
            ]}
            >
                <FileInput 
                name="upload"
                onChange={normFile}
                />
            </Form.Item>
            {/* <Form.Item
                label={"Прикрепить файлы"}
                name={"date"}>
                <Input placeholder="Файлы" />
            </Form.Item> */}
            {/* <Form.Item label="Файлы">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетащите файлы в эту область</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item> */}
            {/* <Form.Item
            name="upload"
            label="Файлы"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="longgggggggggggggggggggggggggggggggggg"
            >
                <Upload>
                <Button icon={<InboxOutlined />}>Нажмите для загрузки</Button>
                </Upload>
            </Form.Item> */}
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Создать обращение
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddAppealForm;