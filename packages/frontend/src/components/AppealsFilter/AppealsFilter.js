import React from "react";
import { Input, Form, Button } from "antd";
import DateFilter from "../UI/DateFilter/DateFilter";
import AdminAppealsFilter from "./AdminAppealsFilter";

const AppealsFilter = ({
  user,
  filterSubmitHandler,
  filterChangeHandler,
  isAdmin,
  loading
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="form-filter"
      onFieldsChange={filterChangeHandler}
      layout="vertical"
      onFinish={filterSubmitHandler}
    >
      <h3>Фильтр</h3>
      <hr />
      <Form.Item name="id" label="Поиск по идентификатору">
        <Input placeholder="Выбранные идентефикаторы" />
      </Form.Item>
      <Form.Item label="По дате" name="date">
        <DateFilter />
      </Form.Item>
      {user && user.role && user.role.name === "admin" && (
        <AdminAppealsFilter />
      )}
      <Form.Item>
        <Button
          disabled={loading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Потвердить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AppealsFilter;
