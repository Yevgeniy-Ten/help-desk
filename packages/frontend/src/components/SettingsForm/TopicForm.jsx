import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import { PlusOutlined } from "@ant-design/icons";
import { useToggle } from "../../hooks/useToggle";
import ReglamentFields from "./ReglamentFields";
import {
  getDepartments,
  getEditableElement
} from "../../containers/Settings/redux/settingGetters";

const TopicForm = ({ topicId, onCloseEditor }) => {
  const [form] = useForm();
  const topicForEdit = useSelector(getEditableElement); // для редактирования
  const dispatch = useDispatch();
  const onCreateTopic = async (topic) => {
    if (topicForEdit) {
      await dispatch(fetchSettingUpdate("topics", topic));
      onCloseEditor();
    } else {
      await dispatch(fetchSettingCreate("topics", topic));
      form.resetFields();
      onCloseEditor();
    }
  };
  const [reglamentIsShow, toggleReglamentIsShow] = useToggle();
  const departments = useSelector(getDepartments);
  useEffect(() => {
    if (reglamentIsShow) {
      dispatch(fetchSettings("departments"));
    }
  }, [reglamentIsShow, dispatch]);
  useEffect(() => {
    dispatch(setEditableSetting("topics", topicId));
    if (topicForEdit) {
      form.setFieldsValue(topicForEdit);
    }
  }, [topicId, dispatch, topicForEdit]);
  return (
    <Form
      form={form}
      name="add-appeal"
      className="appeal-form"
      layout="vertical"
      onFinish={onCreateTopic}
    >
      <Form.Item
        name="title"
        label="Имя темы"
        rules={[
          {
            required: true,
            message: "Заголовок обязателен!"
          }
        ]}
      >
        <Input placeholder="Имя темы" />
      </Form.Item>
      {reglamentIsShow && <ReglamentFields departments={departments} />}
      {!topicForEdit && (
        <Form.Item>
          <Button
            type="dashed"
            onClick={toggleReglamentIsShow}
            block={true}
            icon={<PlusOutlined />}
          >
            {reglamentIsShow
              ? "Отменить создание регламента"
              : "Создать регламент по тематике"}
          </Button>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" size="middle">
          {topicForEdit ? "Обновить" : "Создать тематику"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TopicForm;
