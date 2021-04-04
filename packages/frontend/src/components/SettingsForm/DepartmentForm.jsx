import React from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {fetchSettingCreate} from "../../containers/Settings/redux/settingsActions";

const DepartmentForm = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const onCreateDepartment = (department) => dispatch(fetchSettingCreate("departments", department))
    return (
        <Form form={form}
              onFinish={onCreateDepartment}
              name="add-department"
              className={"appeal-form"}
              layout={"vertical"}
        >
            <Form.Item
                name={"title"}
                label="Имя отдела"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Имя отдела"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать отдел
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DepartmentForm;
