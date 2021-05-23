import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import { Button, Form, Select, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useToggle } from "../../hooks/useToggle";
// import ReglamentFields from "./ReglamentFields";
import {
  getTopics,
  getEditableElement
} from "../../../containers/Settings/redux/settingGetters";

const { Option } = Select;
const { TextArea } = Input;

const FAQsCreateEditForm = ({ topicId, onCloseEditor }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const topics = useSelector(getTopics);
  console.log("top", topics);

  // const topicForEdit = useSelector(getEditableElement); // для редактирования
  // const onCreateTopic = async (topic) => {
  //   if (topicForEdit) {
  //     await dispatch(fetchSettingUpdate("topics", topic));
  //     onCloseEditor();
  //   } else {
  //     await dispatch(fetchSettingCreate("topics", topic));
  //     form.resetFields();
  //     onCloseEditor();
  //   }
  // };
  // const [reglamentIsShow, toggleReglamentIsShow] = useToggle();
  // const departments = useSelector(getDepartments);
  useEffect(() => {
    form.resetFields();
    dispatch(fetchSettings("topics"));
    console.log("return");
  }, [dispatch]);
  // useEffect(() => {
  //   form.resetFields();
  //   dispatch(setEditableSetting("topics", topicId));
  //   if (topicForEdit) {
  //     form.setFieldsValue(topicForEdit);
  //   }
  // }, [topicId, dispatch, topicForEdit]);
  const onFinish = (value) => {
    console.log("form", value);
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="add-edit-FAQ"
      className="faqs-form"
      layout="vertical"
      onFinish={onFinish}
      // onFinish={onCreateTopic}
    >
      <Form.Item
        name="topiId"
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
        name="title-faq"
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
        name="answer-faq"
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
      <Form.Item name="videoPath-faq" label="Ссылка на видео решение">
        <Input placeholder="Вставьте ссылку на видео" allowClear={true} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="middle">
          Обновить
          {/* {topicForEdit ? "Обновить" : "Создать решение"} */}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FAQsCreateEditForm;
