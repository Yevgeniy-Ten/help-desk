import React from "react";
import {NavLink} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserState} from "../redux/getters/getters";
import {Button, Form, Input} from "antd";
import {loginUser} from "../redux/actions/usersActions";


const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {loginError, isLoading} = useSelector(getUserState, shallowEqual);

    const submitFormHandler = (values) => {
        dispatch(loginUser(values));
    }

    return (
        <Form form={form}
              className={"auth-form-width"}
              name="login"
              layout={"vertical"}
              onFinish={submitFormHandler}>
            <Form.Item
                name={"email"}
                label="Электронная почта"
                rules={[{
                    required: true,
                    message: "Введите почту"
                }]}>
                <Input placeholder={"Электронная почта"}/>
            </Form.Item>
            <Form.Item
                label={"Пароль"}
                name={"password"}
                rules={[{
                    required: true,
                    message: "Введите пароль"
                }]}
            >
                <Input.Password
                    placeholder="Пароль"/>
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} type="default" block htmlType="submit" size={"middle"}>
                    Log in
                </Button>
            </Form.Item>
            <Form.Item>
                Or <NavLink to={"/auth/register"} style={{cursor: "pointer"}}>Register now!</NavLink>
            </Form.Item>
        </Form>
    );
}

export default Login;