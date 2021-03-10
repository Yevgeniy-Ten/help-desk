import React from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserState} from "../redux/getters/getters";
import {registerUser} from "../redux/actions/usersActions";
import {Button, Form, Input} from "antd";
import {getFieldError} from "../../../helpers/helpers";
import FacebookAuth from "../FacebookAuth/FacebookAuth";
import UploadFile from "../../../components/UploadFile/UploadFile";
import {Link} from "react-router-dom";


const Register = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const {registerError, isLoading} = useSelector(getUserState, shallowEqual)
    const submitFormHandler = (values) => {
        dispatch(registerUser(values));
    }

    return (
        <Form
            form={form}
            onFinish={submitFormHandler}
            size={"large"}
            name="register">
            <Form.Item
                label="Имя"
                name={"lastName"}
                rules={[{required: true, message: "Введите ваше имя"}]}>
                <Input placeholder={"Имя"}/>
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name={"firstName"}
                rules={[{required: true, message: "Введите вашу фамилию"}]}>
                <Input placeholder={"Фамилия"}/>
            </Form.Item>
            <Form.Item
                name={"email"}
                label="Электронная почта"
                validateStatus={getFieldError(registerError, "login") && "error"}
                help={getFieldError(registerError, "login")}
                rules={[{required: true, message: "Please input login!"}]}>
                <Input placeholder={"User login"}/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name={"password"}
                validateStatus={getFieldError(registerError, "password") && "error"}
                help={getFieldError(registerError, "password")}
                rules={[{required: true, message: "Введите пароль"}]}
            >
                <Input.Password placeholder={"Пароль"}/>
            </Form.Item>
            <UploadFile id={"register_photo"} label={"Your photo"} name={"photo"}/>
            <Form.Item>
                <Button block loading={isLoading} type="primary" htmlType="submit">
                    Register
                </Button>
                Or <Link to={"/auth"}>Login now!</Link>
                <FacebookAuth type={"link"}/>
            </Form.Item>
        </Form>
    );
}

export default Register;