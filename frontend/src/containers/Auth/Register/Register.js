import React from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserState} from "../redux/getters/getters";
import {registerUser} from "../redux/actions/usersActions";
import {Button, Form, Input, Row, Col} from "antd";
import {getFieldError} from "../../../helpers/helpers";
import FacebookAuth from "../FacebookAuth/FacebookAuth";
import {NavLink} from "react-router-dom";
import FileInput from "../../../components/UploadFile/FileInput";


const Register = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {registerError, isLoading} = useSelector(getUserState, shallowEqual);

    const submitFormHandler = (values) => {
        dispatch(registerUser(values));
        console.log(values);
    }

    const onFilesChange = (filesList) => {
        form.setFieldsValue({ upload: filesList });
    };

    return (
        <Form
        form={form}
        onFinish={submitFormHandler}
        size={"default"}
        name="register"
        layout={"vertical"}
        >
            <Form.Item
            label="Имя"
            name={"lastName"}
            rules={[{
                required: true, 
                message: "Введите ваше имя"
            }]}
            style={{marginBottom: "15px"}}
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
            style={{marginBottom: "15px"}}
            >
                <Input placeholder={"Фамилия"}/>
            </Form.Item>
            <Form.Item
            name={"email"}
            label="Электронная почта"
            validateStatus={getFieldError(registerError, "login") && "error"}
            help={getFieldError(registerError, "login")}
            rules={[{
                required: true, 
                message: "Please input login!"
            }]}
            style={{marginBottom: "15px"}}
            >
                <Input placeholder={"User login"}/>
            </Form.Item>
            <Form.Item
            label="Пароль"
            name={"password"}
            validateStatus={getFieldError(registerError, "password") && "error"}
            help={getFieldError(registerError, "password")}
            rules={[{
                required: true, 
                message: "Введите пароль"
            }]}
            style={{marginBottom: "15px"}}
            >
                <Input.Password placeholder={"Пароль"}/>
            </Form.Item>
            <Form.Item
            name={"upload"}
            style={{marginBottom: "15px"}}
            >
                <FileInput 
                name="upload"
                onChange={onFilesChange}
                inputType={true}
                />
            </Form.Item>
            <Form.Item>
                <Row gutter={5}>
                    <Col span={24} style={{marginBottom: "15px"}}>
                        <Row gutter={5} align="middle">
                            <Col span={8}>
                                <Button loading={isLoading} type="default" block htmlType="submit" size={"middle"}>
                                    Register
                                </Button>
                            </Col> 
                            <Col span={8}>
                                Or <NavLink to={"/auth"} style={{ cursor: "pointer" }}>Login now!</NavLink>
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

export default Register;