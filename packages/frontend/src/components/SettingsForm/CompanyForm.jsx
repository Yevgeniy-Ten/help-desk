import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import { getEditableElement } from "../../containers/Settings/redux/settingGetters";

const CompanyForm = ({ companyId, onCloseEditor }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  dispatch(fetchSettingUpdate("position", { ...values }));

  const companyForEdit = useSelector(getEditableElement); // для редактирования
  const onCreateCompany = async (company) => {
    if (companyForEdit) {
      await dispatch(fetchSettingUpdate("companies", { ...company }));
      onCloseEditor();
    } else {
      await dispatch(fetchSettingCreate("companies", company));
      form.resetFields();
      onCloseEditor();
    }
  };

  useEffect(() => {
    dispatch(setEditableSetting("companies", companyId));
    if (companyForEdit) {
      form.setFieldsValue(companyForEdit);
    }
  }, [companyId, dispatch, companyForEdit]);
  return (
    <Form
      form={form}
      name="add-appeal"
      onFinish={onCreateCompany}
      className={"appeal-form"}
      layout={"vertical"}
    >
      <Form.Item
        name={"title"}
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
      <Form.Item>
        <Button type="primary" htmlType="submit" size={"middle"}>
          {companyForEdit ? "Обновить" : "Создать компанию"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyForm;
