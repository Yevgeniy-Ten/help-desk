import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import { getUserState } from "../Auth/redux/getters/getters";
import { getCompanies } from "../Settings/redux/settingGetters";
import { getFieldError } from "../../helpers/helpers";
import { registerUser } from "../Auth/redux/actions/usersActions";

const { Option } = Select;
const UserCreate = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { registerError, isLoading } = useSelector(getUserState, shallowEqual);
  const companies = useSelector(getCompanies);
  const submitFormHandler = (values) => {
    dispatch(registerUser(values, "/users"));
  };
  return (
    <>
      <Button key="3" type="primary">
        <NavLink to="/users">Назад</NavLink>
      </Button>
      <Form
        form={form}
        onFinish={submitFormHandler}
        name="register"
        layout="vertical"
        className="create-user-form-container"
      >
        <h1>Форма создания</h1>
        <hr />
        <Form.Item
          label="Имя"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Введите имя пользователя"
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
              message: "Введите фамилию пользователя"
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
              message: "Пожалуйста введит почту пользователя!"
            }
          ]}
          className="mb-sm"
        >
          <Input placeholder="Почта пользователя:" />
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
        <Form.Item className="mb-sm element-center">
          <Button
            loading={isLoading}
            type="default"
            block={true}
            htmlType="submit"
            size="middle"
            className="element-width"
          >
            Создать
          </Button>
          <NavLink to="/users" className="ml-sm">
            <Button type="default" className="element-width">
              Отмена
            </Button>
          </NavLink>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserCreate;
