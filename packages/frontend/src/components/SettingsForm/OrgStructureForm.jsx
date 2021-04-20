import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartments,
  getPositions,
  getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import {
  fetchSettingCreate,
  fetchSettings
} from "../../containers/Settings/redux/settingsActions";
import { Button, Checkbox, Form, Select } from "antd";

const { Option } = Select;
const OrgStructureForm = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const positions = useSelector(getPositions);
  const isLoading = useSelector(getSettingsLoader);
  const departments = useSelector(getDepartments);
  const onCreateOrgStructure = (values) => {
    dispatch(fetchSettingCreate("orgstructure", values));
  };
  useEffect(() => {
    dispatch(fetchSettings("departments"));
    dispatch(fetchSettings("position"));
  }, [dispatch]);
  return (
    <Form
      form={form}
      onFinish={onCreateOrgStructure}
      name="orgstructureForm"
      className="appeal-form"
      layout="vertical"
    >
      <h1>Форма создания структуры огранизации</h1>
      <hr />
      <Form.Item name="departmentId" label="Отделы" className="mb-sm">
        <Select placeholder="Выберите компанию" allowClear={true}>
          {departments.map((department) => {
            return (
              <Option key={department.id} value={department.id}>
                {department.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="positionId" label="Должности" className="mb-sm">
        <Select placeholder="Выберите должность" allowClear={true}>
          {positions.map((position) => {
            return (
              <Option key={position.id} value={position.id}>
                {position.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="isMain" valuePropName="checked">
        <Checkbox>Главный этого отдела</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          size="middle"
        >
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrgStructureForm;
