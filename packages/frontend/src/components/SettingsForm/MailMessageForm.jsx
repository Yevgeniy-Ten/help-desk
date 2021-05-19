import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditableElement,
  getMailMessages
} from "../../containers/Settings/redux/settingGetters";
import {
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import { Button, Form, Input, Select, message } from "antd";

const { Option } = Select;
const MailMessageForm = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const messages = useSelector(getMailMessages);
  const mailMessageForEdit = useSelector(getEditableElement); // для редактирования
  const onUpdateMailMessage = async (company) => {
    if (mailMessageForEdit) {
      await dispatch(fetchSettingUpdate("mailmessages", company));
      message.success({
        content: "Обновлено!"
      });
    }
  };
  useEffect(() => {
    dispatch(fetchSettings("mailmessages"));
  }, [dispatch]);
  useEffect(() => {
    if (mailMessageForEdit) {
      form.resetFields();
      form.setFieldsValue(mailMessageForEdit);
    }
  }, [dispatch, mailMessageForEdit]);
  const onFieldsChange = (fields) => {
    if (fields.length) {
      if (fields[0].name[0] === "type") {
        dispatch(setEditableSetting("mailmessages", fields[0].value));
      }
    }
  };
  return (
    <Form
      form={form}
      name="mailMessageForm"
      onFinish={onUpdateMailMessage}
      className={"appeal-form"}
      layout={"vertical"}
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        required={true}
        name="type"
        label="Тип сообщения"
        className="mb-sm"
      >
        <Select placeholder="Выберите тип сообщения" allowClear={true}>
          {messages.map((message) => {
            return (
              <Option key={message.id} value={message.id}>
                {message.type}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="message" label="Сообщение">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size={"middle"}>
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MailMessageForm;
