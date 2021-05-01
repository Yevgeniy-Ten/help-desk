import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import { getEditableElement } from "../../containers/Settings/redux/settingGetters";

const DepartmentForm = ({ departmentId, onCloseEditor }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const departmentForEdit = useSelector(getEditableElement);
  const onCreateDepartment = async (department) => {
    if (departmentForEdit) {
      await dispatch(fetchSettingUpdate("departments", department));
    } else {
      await dispatch(fetchSettingCreate("departments", department));
      form.resetFields();
    }
    if (onCloseEditor) onCloseEditor();
  };

  useEffect(() => {
    form.resetFields();
    dispatch(setEditableSetting("departments", departmentId));
    if (departmentForEdit) {
      form.setFieldsValue(departmentForEdit);
    }
  }, [departmentForEdit, dispatch, departmentId]);
  return (
    <Form
      form={form}
      onFinish={onCreateDepartment}
      name="add-department"
      className={"appeal-form"}
      layout={"vertical"}
    >
      <Form.Item
        name={"title"}
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
      <Form.Item>
        <Button type="primary" htmlType="submit" size={"middle"}>
          {departmentForEdit && onCloseEditor ? "Обновить" : "Создать отдел"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DepartmentForm;
