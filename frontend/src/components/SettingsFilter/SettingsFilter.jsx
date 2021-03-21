import React from "react";
import {Button, Form, Select} from "antd";
import {NavLink} from "react-router-dom";

const {Option} = Select
const SettingsFilter = ({onChangeCurrentSetting}) => {
    const [form] = Form.useForm();

    return (
        <Form form={form}
              name="form-filter"
              layout={"vertical"}
            // onFinish={filterSubmitHandler}
        >
            <h3>Фильтр</h3>
            <hr/>
            <Form.Item
                name={"setting"}
                label="По статусу"
            >
                <Select
                    placeholder="Справочник"
                    defaultValue={"topic"}
                    name={"setting"}>
                    <Option value={"topic"}>
                        <NavLink to={"/settings/topics"}>По тематикам</NavLink>
                    </Option>
                    <Option value={"company"}>
                        <NavLink to={"/settings/companies"}>По компаниям</NavLink>
                    </Option>
                    <Option value={"reglament"}>
                        <NavLink to={"/settings/reglaments"}>По регламенту</NavLink>
                    </Option>
                    <Option value={"department"}>
                        <NavLink to={"/settings/departments"}>По отделу</NavLink>
                    </Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Потвердить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SettingsFilter;
