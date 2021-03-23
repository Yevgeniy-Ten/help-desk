import React, {useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments, fetchReglamentCreate, fetchTopics} from "../../containers/Settings/redux/settingsActions";
import {getDepartments, getTopics} from "../../containers/Settings/redux/settingGetters";
const {Option} = Select
const ReglamentForm = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const topics = useSelector(getTopics)
    const departments = useSelector(getDepartments);
    useEffect(() => {
        dispatch(fetchTopics());
        dispatch(fetchDepartments());
    },[dispatch])
    const onCreateReglament = (reglament) => dispatch(fetchReglamentCreate(reglament))
    return (
        <Form form={form}
              name="add-appeal"
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onCreateReglament}
        >
            <Form.Item
                name={"title"}
                label="Название регламента"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Заголовок регламента"}/>
            </Form.Item>
            <Form.Item
                name={"topicId"}
                label="Тематика Заявки"
                rules={[
                    {required: true}]}>
                <Select placeholder="Выберите тематику" allowClear>
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
                name={"departmentId"}
                label="Отвественный отдел"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Select placeholder="Выберите отвественный отдел" allowClear>
                    {departments.map((department, index) => {
                        return (
                            <Option key={index} value={department.id}>
                                {department.title}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={"deadline"}
                label="Плановая дата решения"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Плановая дата решения"}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать компанию
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ReglamentForm;
