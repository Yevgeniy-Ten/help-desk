import React from "react";
import { Checkbox, Form, Select } from "antd";
import { statuses, prioritets } from "../../constants";

const { Option } = Select;

const AdminAppealsFilter = ({ companies, departments }) => {
  return (
    <>
      <Form.Item name="status" label="Статус">
        <Select placeholder="Статус" allowClear={true}>
          {statuses.map((status) => {
            return (
              <Option key={status.value} value={status.value}>
                {status.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="priority" label="Приоритет">
        <Select placeholder="Приоритет" allowClear={true}>
          {prioritets.map((priority) => {
            return (
              <Option key={priority.value} value={priority.value}>
                {priority.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="companyId" label="Компания">
        <Select placeholder="Компания" allowClear={true} disabled={true}>
          {companies.map((company) => {
            return (
              <Option key={company.id} value={company.id}>
                {company.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="departmentId" label="Отдел">
        <Select placeholder="Отдел" allowClear={true}>
          {departments.map((department) => {
            return (
              <Option key={department.id} value={department.id}>
                {department.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {/* <Form.Item name="myAppeals" valuePropName="checked">
        <Checkbox>Мои обращения</Checkbox>
      </Form.Item> */}
    </>
  );
};

export default AdminAppealsFilter;
