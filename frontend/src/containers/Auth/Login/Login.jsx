import React from "react";
import {Link} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserState} from "../redux/getters/getters";
import {Button, Form, Input, Space} from "antd";
import {loginUser} from "../redux/actions/usersActions";
import FacebookAuth from "../FacebookAuth/FacebookAuth";


const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const {loginError, isLoading} = useSelector(getUserState, shallowEqual)
    const submitFormHandler = (values) => {
        dispatch(loginUser(values));
    }
    return (
        <Form
            form={form}
            name="login"
            size={"large"}
            onFinish={submitFormHandler}
        >
            <Form.Item
                name={"email"}
                label="Электронная почта"
                rules={[{required: true, message: "Введите логин"}]}>
                <Input placeholder={"Почта"}/>
            </Form.Item>

            <Form.Item
                label={"Пароль"}
                name={"password"}
                rules={[{required: true, message: "Введите пароль"}]}
            >
                <Input.Password
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item>
                <Space direction={"vertical"} className={"fullwidth"}>
                    <Button loading={isLoading} type="primary" block htmlType="submit" size={"large"}>
                        Log in
                    </Button>
                    <FacebookAuth/>
                </Space>
                Or <Link to={"/auth/register"}>register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;