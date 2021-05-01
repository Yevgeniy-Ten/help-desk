import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import {
  getCompanies,
  getDepartments,
  getEditableElement,
  getTopics
} from "../../containers/Settings/redux/settingGetters";
import ReglamentFields from "./ReglamentFields";

const { Option } = Select;
const ReglamentForm = ({ reglamentId }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const topics = useSelector(getTopics);
  const departments = useSelector(getDepartments);
  const companies = useSelector(getCompanies);
  const reglamentForEdit = useSelector(getEditableElement);
  useEffect(() => {
    form.resetFields();
    dispatch(fetchSettings("topics"));
    dispatch(fetchSettings("companies"));
    dispatch(fetchSettings("departments"));
  }, [dispatch]);
  useEffect(() => {
    if (reglamentForEdit) {
      form.setFieldsValue(reglamentForEdit);
      form.setFieldsValue({
        departmentTitle: reglamentForEdit.department.title,
        companyTitle:
          reglamentForEdit.company && reglamentForEdit.company.title,
        topicTitle: reglamentForEdit.topic.title
      });
    } else {
      dispatch(setEditableSetting("reglaments", reglamentId));
    }
  }, [dispatch, reglamentForEdit, reglamentId]);
  const onCreateReglament = async (reglament) => {
    form.resetFields();
    if (reglamentForEdit) {
      await dispatch(
        fetchSettingUpdate(
          "topics",
          { title: reglament.topicTitle },
          reglamentForEdit.topic.id
        )
      );
      await dispatch(
        fetchSettingUpdate(
          "departments",
          { title: reglament.departmentTitle },
          reglamentForEdit.department.id
        )
      );
      if (reglamentForEdit.company) {
        await dispatch(
          fetchSettingUpdate(
            "companies",
            { title: reglament.companyTitle },
            reglamentForEdit.company.id
          )
        );
      }
      await dispatch(fetchSettingUpdate("reglaments", reglament));
    } else {
      await dispatch(fetchSettingCreate("reglaments", reglament));
    }
  };
  return (
    <Form
      form={form}
      name="add-appeal"
      className="appeal-form"
      layout="vertical"
      onFinish={onCreateReglament}
    >
      <Form.Item
        name="title"
        label="Название регламента"
        rules={[
          {
            required: true,
            message: "Заголовок обязателен!"
          }
        ]}
      >
        <Input placeholder="Заголовок регламента" />
      </Form.Item>
      {reglamentForEdit && (
        <Form.Item
          name="topicTitle"
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
      )}
      <Form.Item
        name="topicId"
        label="Тематика Заявки"
        rules={[{ required: true }]}
      >
        <Select placeholder="Выберите тематику" allowClear={true}>
          {topics.map((topic, index) => {
            return (
              <Option key={index} value={topic.id}>
                {topic.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="companyId" label="Для компании">
        <Select placeholder="Выбрать компанию" allowClear={true}>
          {companies.map((company, index) => {
            return (
              <Option key={index} value={company.id}>
                {company.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {reglamentForEdit && reglamentForEdit.company && (
        <Form.Item
          name={"companyTitle"}
          label="Название компании"
          rules={[
            {
              required: true,
              message: "Заголовок обязателен!"
            }
          ]}
        >
          <Input placeholder={"Имя компании"} />
        </Form.Item>
      )}
      {reglamentForEdit && (
        <Form.Item
          name={"departmentTitle"}
          label="Имя отдела"
          rules={[
            {
              required: true,
              message: "Заголовок обязателен!"
            }
          ]}
        >
          <Input placeholder={"Имя отдела"} />
        </Form.Item>
      )}
      <ReglamentFields departments={departments} />
      <Form.Item>
        <Button type="primary" htmlType="submit" size="middle">
          {reglamentForEdit ? "Обновить регламент" : "Создать регламент"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReglamentForm;
