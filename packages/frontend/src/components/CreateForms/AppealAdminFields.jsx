import React from "react";
import { Form, Select } from "antd";
import { statuses } from "../../constants";

const { Option } = Select;
const AppealAdminFields = ({ users }) => {
  return (
    <>
      <Form.Item name="clientId" label="От лица клиента">
        <Select placeholder="От кого:" allowClear={true}>
          {users &&
            users.map((user) => {
              return (
                <Option
                  key={user.id}
                  value={user.id}
                  name={`${user.firstName} ${user.lastName}`}
                >
                  {user.firstName} {user.lastName}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
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
    </>
  );
};

export default AppealAdminFields;
