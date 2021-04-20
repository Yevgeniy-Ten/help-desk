import React from "react";
import { Button, Form, Input, Select, Row, Col } from "antd";
import { statuses, prioritets } from "../../constants";
import { getHourWork } from "../../helpers/helpers";
import { PlusOutlined } from "@ant-design/icons";
import { useToggle } from "../../hooks/useToggle";

const getTime = (index) => {
  const time = [];
  for (let i = 0; i < index; i++) {
    time.push(i);
  }
  return time;
};
const { Option } = Select;
const EditAppealForm = ({
  appealFields,
  topics,
  departments,
  employees,
  onChangeFields,
  onSaveAppeal
}) => {
  const [hourWorkEditShow, toggleHourWorkEditIsShow] = useToggle();
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="edit-appeal"
      className="appeal-form"
      layout="vertical"
      onFinish={onSaveAppeal}
      onValuesChange={onChangeFields}
    >
      <Form.Item
        name="topicId"
        label="Тематика обращения"
        rules={[{ required: true }]}
        initialValue={appealFields.topicId}
      >
        <Select placeholder="Выберите тематику обращения" allowClear={true}>
          {topics.map((topic, index) => {
            return (
              <Option key={index} value={topic.id}>
                {topic.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="priority"
        label="Приоритет"
        rules={[{ required: true }]}
        initialValue={appealFields.priority}
      >
        <Select placeholder="Приоритет" allowClear={true}>
          {prioritets.map((prioritet) => {
            return (
              <Option key={prioritet.value} value={prioritet.value}>
                {prioritet.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label="Статус"
        rules={[{ required: true }]}
        initialValue={appealFields.status}
      >
        <Select placeholder="Выберите cтатус обращения" allowClear={true}>
          {statuses.map((status) => {
            return (
              <Option key={status.value} value={status.value}>
                {status.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="title"
        label="Заголовок обращения"
        initialValue={appealFields.title}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name="departmentId"
        label="Отдел"
        initialValue={appealFields.department && appealFields.department.id}
      >
        <Select placeholder="Выберите отдел" allowClear={true}>
          {departments.map((department) => {
            return (
              <Option key={department.id} value={department.id}>
                {department.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="employeeId"
        label="Ответствейнный сотрудник"
        initialValue={appealFields.employeeId}
      >
        <Select
          placeholder="Выберите ответствейнного сотрудника"
          allowClear={true}
        >
          {employees &&
            employees.map((employee) => {
              return (
                <Option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        name="deadline"
        label="Срок исполнения (часов)"
        rules={[
          {
            required: true,
            message: "Срок исполнения обязательна!"
          }
        ]}
        initialValue={appealFields.deadline}
      >
        <Input placeholder="Количество часов" />
      </Form.Item>
      <Form.Item
        name="intialHourWork"
        label="Затрачено (часов)"
        rules={[
          {
            required: true,
            message: "Трудозатраты обязательна!"
          }
        ]}
        initialValue={getHourWork(appealFields.hourWork)}
      >
        <Input placeholder="Количество затраченных часов" disabled={true} />
      </Form.Item>
      {hourWorkEditShow && (
        <>
          <Row>
            <Col span={8}>
              <Form.Item name="hourWork" label="HH" initialValue={0}>
                <Select placeholder="HH" allowClear={true}>
                  {getTime(24).map((hour, i) => {
                    return (
                      <Option key={i} value={hour}>
                        {hour}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="minuteWork" label="mm" initialValue={0}>
                <Select placeholder="mm" allowClear={true}>
                  {getTime(60).map((minute, i) => {
                    return (
                      <Option key={i} value={minute}>
                        {minute}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="secondWork" label="ss" initialValue={0}>
                <Select placeholder="ss" allowClear={true}>
                  {getTime(60).map((second, i) => {
                    return (
                      <Option key={i} value={second}>
                        {second}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
      <Form.Item>
        <Button
          type="dashed"
          onClick={toggleHourWorkEditIsShow}
          block={true}
          icon={<PlusOutlined />}
        >
          {hourWorkEditShow
            ? "Отменить изменение трудозатрат"
            : "Добавить часы в трудозатраты"}
        </Button>
      </Form.Item>
      <Form.Item name="comment" label="Комментарии">
        <Input.TextArea placeholder="Оставьте комментарии" allowClear={true} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="middle">
          Сохранить изменения
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAppealForm;
