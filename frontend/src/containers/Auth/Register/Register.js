import React, { useEffect } from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserState} from "../redux/getters/getters";
import {registerUser} from "../redux/actions/usersActions";
import {NavLink} from "react-router-dom";
import FileInput from "../../../components/UploadFile/FileInput";
import {Button, Form, Input, Select} from "antd";
import {getCompanies} from "../../Settings/redux/settingGetters";
import "../Auth.css"
import { fetchCompanies } from "../../Settings/redux/settingsActions";

const {Option} = Select
const Register = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {registerError, isLoading} = useSelector(getUserState, shallowEqual);
    const companies = useSelector(getCompanies)
    const submitFormHandler = (values) => {
        dispatch(registerUser(values));
    }

    const onFilesChange = (filesList) => {
        form.setFieldsValue({upload: filesList});
    };
    useEffect(()=>{
        dispatch(fetchCompanies())
    },[dispatch])
    return (
        <Form form={form}
              onFinish={submitFormHandler}
              name="register"
              layout={"vertical"}>
            <h1>Форма регистрации</h1>
            <hr/>
            <Form.Item
                label="Имя"
                name={"lastName"}
                rules={[{
                    required: true,
                    message: "Введите ваше имя"
                }]}
                className={"mb-sm"}
            >
                <Input placeholder={"Имя"}/>
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name={"firstName"}
                rules={[{
                    required: true,
                    message: "Введите вашу фамилию"
                }]}
                className={"mb-sm"}
            >
                <Input placeholder={"Фамилия"}/>
            </Form.Item>
            <Form.Item
                name={"email"}
                label="Электронная почта"
                rules={[{
                    required: true,
                    message: "Пожалуйста введит свою почту!"
                }]}
                className={"mb-sm"}
            >
                <Input placeholder={"Ваша почта:"}/>
            </Form.Item>
            <Form.Item
                name={"phoneNumber"}
                label="Телефон"
                rules={[{
                    required: true,
                    message: "Введите номер телефона"
                }]}
                className={"mb-sm"}>
                <Input placeholder={"Номер телефона"}/>
            </Form.Item>
            <Form.Item
                name={"companyId"}
                label="Компания"
                className={"mb-sm"}
            >
                <Select placeholder="Выберите компанию" allowClear>
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
                name={"password"}
                className={"mb-sm"}
                rules={[{required: true, message: "Введите пароль"}]}
            >
                <Input.Password placeholder={"Пароль"}/>
            </Form.Item>
            <Form.Item className={"mb-sm"} name={"upload"}>
                <FileInput
                    name="upload"
                    onChange={onFilesChange}
                    inputType={true}
                />
            </Form.Item>
            <Form.Item className={"mb-sm"}>
                <Button loading={isLoading} type="default" block htmlType="submit" size={"middle"}>
                    Зарегистирироваться
                </Button>
            </Form.Item>
            <Form.Item className={"mb-sm"}>
                Or <NavLink to={"/auth"}>Login now!</NavLink>
            </Form.Item>
        </Form>
    );
}

export default Register;