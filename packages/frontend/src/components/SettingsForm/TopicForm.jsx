import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchSettingCreate, fetchSettings} from "../../containers/Settings/redux/settingsActions";
import {PlusOutlined} from "@ant-design/icons"
import {useToggle} from "../../hooks/useToggle";
import ReglamentFields from "./ReglamentFields";
import {getDepartments} from "../../containers/Settings/redux/settingGetters";

const TopicForm = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const onCreateTopic = (topic) => dispatch(fetchSettingCreate("topics", topic))
    const [reglamentIsShow, toggleReglamentIsShow] = useToggle()
    const departments = useSelector(getDepartments)
    useEffect(() => {
        if (reglamentIsShow) {
            dispatch(fetchSettings("departments"))
        }
    }, [reglamentIsShow,dispatch])
    return (
        <Form form={form}
              name="add-appeal"
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onCreateTopic}
        >
            <Form.Item
                name={"title"}
                label="Имя темы"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Имя темы"}/>
            </Form.Item>
            {reglamentIsShow && <ReglamentFields departments={departments}/>}
            <Form.Item>
                <Button type="dashed" onClick={toggleReglamentIsShow} block icon={<PlusOutlined/>}>
                    {reglamentIsShow ? "Отменить создание регламента" : "Создать регламент по тематике"}
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать тематику
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TopicForm;
