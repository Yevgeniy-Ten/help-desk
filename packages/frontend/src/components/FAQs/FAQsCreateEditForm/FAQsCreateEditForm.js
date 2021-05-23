import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import { Button, Form, Select, Input, Checkbox } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useToggle } from "../../hooks/useToggle";
// import ReglamentFields from "./ReglamentFields";
import {
  getTopics,
  getEditableElement
} from "../../../containers/Settings/redux/settingGetters";
import { getEditableFaqs } from "../../../containers/FAQ/redux/faqsGetters";

const { Option } = Select;
const { TextArea } = Input;

const FAQsCreateEditForm = ({ faqId, onCloseEditor }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const topics = useSelector(getTopics);
  console.log("top", topics);

  const editableFAQS = useSelector(getEditableFaqs); // для редактирования
  console.log("edt", editableFAQS);
  const onCreateEditFaqs = async (topic) => {
    if (editableFAQS) {
      await dispatch(fetchSettingUpdate("topics", topic));
      onCloseEditor();
    } else {
      await dispatch(fetchSettingCreate("topics", topic));
      form.resetFields();
      onCloseEditor();
    }
  };

  useEffect(() => {
    form.resetFields();
    dispatch(fetchSettings("topics"));
  }, [dispatch]);
  useEffect(() => {
    form.resetFields();
    if (editableFAQS) {
      form.setFieldsValue(editableFAQS);
    }
  }, [faqId, dispatch, editableFAQS]);

  return (
    <Form
      form={form}
      name="add-edit-FAQ"
      className="faqs-form"
      layout="vertical"
      onFinish={onCreateEditFaqs}
      // onFinish={onCreateTopic}
    >
      <Form.Item
        name="topicId"
        label="Тематика"
        rules={[
          {
            required: true,
            message: "Тематика обязательна!"
          }
        ]}
      >
        <Select placeholder="Выберите тематику базы знаний" allowClear={true}>
          {topics &&
            topics.map((topic, index) => {
              return (
                <Option key={index} value={topic.id}>
                  {topic.title}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        name="questionTitle"
        label="Тема вопроса"
        rules={[
          {
            required: true,
            message: "Поле вопроса обязательно!"
          }
        ]}
      >
        <Input placeholder="Тема вопроса" allowClear={true} />
      </Form.Item>
      <Form.Item
        name="answer"
        label="Ответ на вопрос"
        rules={[
          {
            required: true,
            message: "Поле ответа обязательно!"
          }
        ]}
      >
        <TextArea placeholder="Ответ на вопрос" rows={5} allowClear={true} />
      </Form.Item>
      <Form.Item name="videoPath" label="Ссылка на видео решение">
        <Input placeholder="Вставьте ссылку на видео" allowClear={true} />
      </Form.Item>
      <Form.Item name="private" valuePropName="checked">
        <Checkbox>Для сотрудников</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="middle">
          {editableFAQS ? "Обновить" : "Создать решение"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FAQsCreateEditForm;
