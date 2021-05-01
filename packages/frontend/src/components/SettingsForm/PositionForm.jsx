import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Drawer, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingCreate,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import { getEditableElement } from "../../containers/Settings/redux/settingGetters";

const PositionForm = ({ positionId, onCloseEditor }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const positionForEdit = useSelector(getEditableElement);
  const onCreatePosition = async (position) => {
    if (positionForEdit) {
      await dispatch(fetchSettingUpdate("position", position));
      onCloseEditor();
    } else {
      await dispatch(fetchSettingCreate("position", position));
      form.resetFields();
      onCloseEditor();
    }
  };
  useEffect(() => {
    form.resetFields();
    dispatch(setEditableSetting("positions", positionId));
    if (positionForEdit) {
      form.setFieldsValue(positionForEdit);
    }
  }, [positionId, dispatch, positionForEdit]);
  return (
    <Form
      form={form}
      name="add-position"
      className={"appeal-form"}
      layout={"vertical"}
      onFinish={onCreatePosition}
    >
      <Form.Item
        name={"title"}
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
      <Form.Item>
        <Button type="primary" htmlType="submit" size={"middle"}>
          {positionForEdit ? "Обновить" : "Создать должность"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PositionForm;
