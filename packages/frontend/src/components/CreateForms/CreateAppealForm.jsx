import React from "react";
import AppealAdminFields from "./AppealAdminFields";
import { Button, Form, Input, Select, Upload } from "antd";
import { prioritets } from "../../constants";
import { UploadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Option } = Select;

const CreateAppealForm = ({
  topics,
  onFieldsChange,
  onCreateAppeal,
  user,
  users,
  isLoaded
}) => {
  const [form] = Form.useForm();
  const onFinishHandler = (data) => {
    onCreateAppeal(data);
    form.resetFields();
  };
  return (
    <>
      <Button key="3" type="primary" style={{ margin: "10px 0 0 10px" }}>
        <NavLink to="/appeals">Назад</NavLink>
      </Button>
      <Form
        form={form}
        name="add-appeal"
        onFieldsChange={onFieldsChange}
        className="appeal-form"
        layout="vertical"
        onFinish={onFinishHandler}
      >
        <Form.Item
          name="topicId"
          label="Тематика обращения"
          rules={[{ required: true }]}
        >
          <Select placeholder="Выберите тематику обращения" allowClear={true}>
            {topics.map((topic, index) => {
              return (
                <Option key={index} value={topic.id}>
                  {topic.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {user && user.role && user.role.name === "admin" && (
          <AppealAdminFields users={users} />
        )}
        <Form.Item
          name="title"
          label="Заголовок обращения"
          rules={[
            {
              required: true,
              message: "Заголовок обязателен!"
            }
          ]}
        >
          <Input placeholder="Опишите вкратце обращение" />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Приоритет"
          rules={[{ required: true }]}
        >
          <Select placeholder="Приоритет" allowClear={true}>
            {prioritets.map((prioritet) => {
              return (
                <Option key={prioritet.value} value={prioritet.value}>
                  {prioritet.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Полное описание">
          <Input.TextArea
            placeholder="Подробно опишите проблему"
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
          <Button
            disabled={isLoaded}
            type="primary"
            htmlType="submit"
            size="middle"
          >
            Создать заявку
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateAppealForm;
