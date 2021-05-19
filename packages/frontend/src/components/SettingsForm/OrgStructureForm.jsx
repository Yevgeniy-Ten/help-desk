import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartments,
  getEditableElement,
  getPositions,
  getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import {
  fetchSettingCreate,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import { Button, Checkbox, Form, Input, Select } from "antd";

const { Option } = Select;
const OrgStructureForm = ({ onCloseEditor, orgstructureId }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const positions = useSelector(getPositions);
  const isLoading = useSelector(getSettingsLoader);
  const departments = useSelector(getDepartments);
  const orgstructureForEdit = useSelector(getEditableElement);
  const onCreateOrgStructure = async (values) => {
    if (orgstructureForEdit) {
      await dispatch(
        fetchSettingUpdate(
          "departments",
          { title: values.departmentTitle },
          orgstructureForEdit.department.id
        )
      );
      await dispatch(
        fetchSettingUpdate(
          "position",
          { title: values.positionTitle },
          orgstructureForEdit.position.id
        )
      );
      await dispatch(fetchSettingUpdate("orgstructure", values));
    } else {
      await dispatch(fetchSettingCreate("orgstructure", values));
      form.resetFields();
    }
    onCloseEditor();
  };
  useEffect(() => {
    form.resetFields();
    dispatch(fetchSettings("departments"));
    dispatch(fetchSettings("position"));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(setEditableSetting("orgstructures", orgstructureId));
  //   if (orgstructureForEdit) {
  //     form.setFieldsValue(orgstructureForEdit);
  //     form.setFieldsValue({
  //       departmentTitle: orgstructureForEdit.department.title,
  //       positionTitle: orgstructureForEdit.position.title
  //     });
  //   }
  // }, [dispatch, orgstructureForEdit, orgstructureId]);

  return (
    <Form
      form={form}
      onFinish={onCreateOrgStructure}
      name="orgstructureForm"
      className="appeal-form"
      layout="vertical"
    >
      <h1>Форма создания структуры огранизации</h1>
      <hr />
      <Form.Item
        required={true}
        name="departmentId"
        label="Отделы"
        className="mb-sm"
      >
        <Select placeholder="Выберите компанию" allowClear={true}>
          {departments.map((department) => {
            return (
              <Option key={department.id} value={department.id}>
                {department.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {orgstructureForEdit && (
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
      <Form.Item
        required={true}
        name="positionId"
        label="Должности"
        className="mb-sm"
      >
        <Select placeholder="Выберите должность" allowClear={true}>
          {positions.map((position) => {
            return (
              <Option key={position.id} value={position.id}>
                {position.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {orgstructureForEdit && (
        <Form.Item
          name={"positionTitle"}
          label="Имя должности"
          rules={[
            {
              required: true,
              message: "Название обязательны!"
            }
          ]}
        >
          <Input placeholder={"Название должности"} />
        </Form.Item>
      )}
      <Form.Item name="isMain" valuePropName="checked">
        <Checkbox>Главный этого отдела</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          size="middle"
        >
          {orgstructureForEdit ? "Обновить" : "Создать орг структуру"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrgStructureForm;
