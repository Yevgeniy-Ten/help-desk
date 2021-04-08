import React, {useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchSettingCreate, fetchSettings,
} from "../../containers/Settings/redux/settingsActions";
import {getCompanies, getDepartments, getTopics} from "../../containers/Settings/redux/settingGetters";
import ReglamentFields from "./ReglamentFields";

const {Option} = Select
const ReglamentForm = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const topics = useSelector(getTopics)
    const departments = useSelector(getDepartments);
    const companies = useSelector(getCompanies)
    useEffect(() => {
        dispatch(fetchSettings("topics"));
        dispatch(fetchSettings("companies"));
        dispatch(fetchSettings("departments"));
    }, [dispatch])
    const onCreateReglament = (reglament) => dispatch(fetchSettingCreate("rules", reglament))
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
                name={"companyId"}
                label="Для компании">
                <Select placeholder="Выбрать компанию" allowClear>
                    {companies.map((company, index) => {
                        return (
                            <Option key={index} value={company.id}>
                                {company.title}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <ReglamentFields departments={departments}/>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать регламент
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ReglamentForm;
