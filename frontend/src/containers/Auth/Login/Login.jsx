import React from "react";
import {NavLink} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserState} from "../redux/getters/getters";
import {Button, Form, Input, Row, Col} from "antd";
import {loginUser} from "../redux/actions/usersActions";
import FacebookAuth from "../FacebookAuth/FacebookAuth";


const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {loginError, isLoading} = useSelector(getUserState, shallowEqual);

    const submitFormHandler = (values) => {
        dispatch(loginUser(values));
    }

    return (
        <Form
            form={form}
            name="login"
            size={"default"}
            layout={"vertical"}
            onFinish={submitFormHandler}
        >
            <Form.Item
            name={"email"}
            label="Электронная почта"
            rules={[{
                required: true, 
                message: "Введите логин"
            }]}
            style={{marginBottom: "15px"}}
            >
                <Input placeholder={"Почта"}/>
            </Form.Item>

            <Form.Item
            label={"Пароль"}
            name={"password"}
            rules={[{
                required: true, 
                message: "Введите пароль"
            }]}
            style={{marginBottom: "15px"}}
            >
                <Input.Password
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item>
                <Row gutter={5}>
                    <Col span={24} style={{marginBottom: "15px"}}>
                        <Row gutter={5} align="middle">
                            <Col span={8}>
                                <Button loading={isLoading} type="default" block htmlType="submit" size={"middle"}>
                                    Log in
                                </Button>
                            </Col> 
                            <Col span={8}>
                                Or <NavLink to={"/auth/register"} style={{ cursor: "pointer" }}>Register now!</NavLink>
                            </Col> 
                        </Row>
                    </Col>
                    <Col span={8}>
                        <FacebookAuth/> 
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}

export default Login;