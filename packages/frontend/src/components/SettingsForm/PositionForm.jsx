import React from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { fetchSettingCreate } from "../../containers/Settings/redux/settingsActions";

const PositionForm = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const onCreatePosition = (position) =>
    dispatch(fetchSettingCreate("position", position));
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
          Создать должность
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PositionForm;
