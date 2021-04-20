import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;
const ReglamentFields = ({ departments }) => {
  return (
    <>
      <Form.Item
        name="departmentId"
        label="Отвественный отдел"
        rules={[
          {
            required: true,
            message: "Заголовок обязателен!"
          }
        ]}
      >
        <Select placeholder="Выберите отвественный отдел" allowClear={true}>
          {departments.map((department, index) => {
            return (
              <Option key={index} value={department.id}>
                {department.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="standart"
        label="Срок исполнения (часов) стандартного"
        rules={[
          {
            required: true,
            message: "Срок исполнения обязателен!"
          }
        ]}
      >
        <Input placeholder="Количество часов" />
      </Form.Item>
      <Form.Item
        name="middle"
        label="Срок исполнения (часов) среднего"
        rules={[
          {
            required: true,
            message: "Срок исполнения обязателен!"
          }
        ]}
      >
        <Input placeholder="Количество часов" />
      </Form.Item>
      <Form.Item
        name="high"
        label="Срок исполнения (часов) высокого"
        rules={[
          {
            required: true,
            message: "Срок исполнения обязателен!"
          }
        ]}
      >
        <Input placeholder="Количество часов" />
      </Form.Item>
      <Form.Item
        name="incident"
        label="Срок исполнения (часов) инцидента"
        rules={[
          {
            required: true,
            message: "Срок исполнения обязателен!"
          }
        ]}
      >
        <Input placeholder="Количество часов" />
      </Form.Item>
    </>
  );
};

export default ReglamentFields;
