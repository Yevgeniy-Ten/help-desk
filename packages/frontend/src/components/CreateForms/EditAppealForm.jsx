import React from "react";
import {Button, Form, Input, Select} from "antd";
import { statuses, prioritets } from "../../constants";

const {Option} = Select
const EditAppealForm = ({appealFields, topics, departments, employees, onChangeFields, onSaveAppeal}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form}
              name="edit-appeal"
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onSaveAppeal}
              onValuesChange={onChangeFields}
              >
            <Form.Item
                name={"topicId"}
                label="Тематика обращения"
                rules={[{required: true}]}
                initialValue={appealFields && appealFields.topicId}
                >
                <Select placeholder="Выберите тематику обращения" allowClear>
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
                name={"priority"}
                label="Приоритет"
                rules={[{required: true}]}
                initialValue={appealFields && appealFields.priority}
                >
                <Select placeholder="Приоритет" allowClear>
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
                name={"status"}
                label="Статус"
                rules={[{required: true}]}
                initialValue={appealFields && appealFields.status}
                >
                <Select placeholder="Выберите cтатус обращения" allowClear>
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
                name={"title"}
                label="Заголовок обращения"
                initialValue={appealFields && appealFields.title}
                >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                name={"departmentId"}
                label="Отдел"
                initialValue={appealFields && appealFields.department && appealFields.department.id}
                >
                <Select placeholder="Выберите отдел" allowClear>
                    {departments.map((department) => {
                        return (
                            <Option key={department.id}
                                    value={department.id}>
                                {department.title}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={"employeeId"}
                label="Ответствейнный сотрудник"
                initialValue={appealFields && appealFields.employeeId}
                >
                <Select placeholder="Выберите ответствейнного сотрудника" allowClear>
                    {employees && employees.map((employee) => {
                        return (
                            <Option key={employee.id}
                                    value={employee.id}>
                                {employee.firstName} {employee.lastName}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={"deadline"}
                label="Срок исполнения (часов)"
                rules={[
                    {
                        required: true,
                        message: "Срок исполнения обязательна!"
                    }]}
                initialValue={appealFields && appealFields.deadline}   
                >
                <Input placeholder={"Количество часов"}/>
            </Form.Item>
            <Form.Item
                name={"hourWork"}
                label="Затрачено (часов)"
                rules={[
                    {
                        required: true,
                        message: "Трудозатраты обязательна!"
                    }]}
                initialValue={appealFields && appealFields.hourWork}
                >
                <Input placeholder={"Количество затраченных часов"}/>
            </Form.Item>
            <Form.Item
                name={"comment"}
                label="Комментарии"
            >
                <Input.TextArea
                    placeholder={"Оставьте комментарии"}
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditAppealForm;
