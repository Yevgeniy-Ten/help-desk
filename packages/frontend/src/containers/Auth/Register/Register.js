import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUserState } from "../redux/getters/getters";
import { registerUser } from "../redux/actions/usersActions";
import { NavLink } from "react-router-dom";
import FileInput from "../../../components/UploadFile/FileInput";
import { Button, Form, Input, Select, message } from "antd";
import { getCompanies } from "../../Settings/redux/settingGetters";

import {
  fetchCompanies,
  fetchSettings
} from "../../Settings/redux/settingsActions";
import { getFieldError } from "../../../helpers/helpers";

const { Option } = Select;
const Register = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { registerError, isLoading, isRegisterSuccess } = useSelector(
    getUserState,
    shallowEqual
  );
  const companies = useSelector(getCompanies);
  const submitFormHandler = (values) => {
    dispatch(registerUser(values));
  };
  useEffect(() => {
    if (registerError && registerError.message) {
      message.error({
        content: registerError.message,
        className: "message-custom"
      });
    }
  }, [registerError]);
  const onFilesChange = (filesList) => {
    form.setFieldsValue({ upload: filesList });
  };
  useEffect(() => {
    dispatch(fetchSettings("companies"));
  }, [dispatch]);
  console.log(getFieldError(registerError, "email"));
  return (
    <Form
      form={form}
      onFinish={submitFormHandler}
      name="register"
      layout="vertical"
    >
      <h1>Форма регистрации</h1>
      <hr />
      <Form.Item
        label="Имя"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Введите ваше имя"
          }
        ]}
        className="mb-sm"
      >
        <Input placeholder="Имя" />
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Введите вашу фамилию"
          }
        ]}
        className="mb-sm"
      >
        <Input placeholder="Фамилия" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Электронная почта"
        validateStatus={getFieldError(registerError, "email") && "error"}
        help={getFieldError(registerError, "email")}
        rules={[
          {
            required: true,
            message: "Пожалуйста введит свою почту!"
          }
        ]}
        className="mb-sm"
      >
        <Input placeholder="Ваша почта:" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Телефон"
        rules={[
          {
            required: true,
            message: "Введите номер телефона"
          }
        ]}
        className="mb-sm"
      >
        <Input placeholder="Номер телефона" />
      </Form.Item>
      <Form.Item
        name="companyId"
        label="Компания"
        className="mb-sm"
        rules={[
          {
            required: true,
            message: "Выберите компанию"
          }
        ]}
      >
        <Select placeholder="Выберите компанию" allowClear={true}>
          {companies.map((company) => {
            return (
              <Option key={company.id} value={company.id}>
                {company.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        validateStatus={getFieldError(registerError, "password") && "error"}
        help={getFieldError(registerError, "password")}
        className="mb-sm"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password placeholder="Пароль" />
      </Form.Item>
      <Form.Item className="mb-sm" name="upload">
        <FileInput name="upload" onChange={onFilesChange} inputType={true} />
      </Form.Item>
      <Form.Item className="mb-sm">
        <Button
          loading={isLoading}
          type="default"
          block={true}
          htmlType="submit"
          size="middle"
        >
          Зарегистирироваться
        </Button>
      </Form.Item>
      <Form.Item className="mb-sm">
        или <NavLink to="/auth">Войти в систему</NavLink>
      </Form.Item>
    </Form>
  );
};

export default Register;
