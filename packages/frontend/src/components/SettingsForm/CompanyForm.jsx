import React from "react";
import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {useDispatch} from "react-redux";
import {fetchCompanyCreate} from "../../containers/Settings/redux/settingsActions";

const CompanyForm = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const onCreateCompany = (company) => dispatch(fetchCompanyCreate(company))
    return (
        <Form form={form}
              name="add-appeal"
              onFinish={onCreateCompany}
              className={"appeal-form"}
              layout={"vertical"}
        >
            <Form.Item
                name={"title"}
                label="Название компании"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Имя компании"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать компанию
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CompanyForm;
