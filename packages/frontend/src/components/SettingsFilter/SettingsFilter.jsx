import React from "react";
import {Button, Form, Select} from "antd";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";

const {Option} = Select
const SettingsFilter = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const filterSubmitHandler = (value) => {
        dispatch(push(value.status));
    }

    return (
        <Form form={form}
              name="form-filter"
              layout={"vertical"}
              onFinish={filterSubmitHandler}

        >
            <h3>Фильтр</h3>
            <hr/>
            <Form.Item
                name={"status"}
                label="По статусу"

            >
                <Select
                    placeholder="Справочник"
                    defaultValue={"/settings/topics"}
                    name={"setting"}
                >
                    <Option value={"/settings/topics"}>
                        По тематикам
                    </Option>
                    <Option value={"/settings/companies"}>
                        По компаниям
                    </Option>
                    <Option value={"/settings/reglaments"}>
                        По регламенту
                    </Option>
                    <Option value={"/settings/departments"}>
                        По отделу
                    </Option>
                    <Option value={"/settings/positions"}>
                        По должностям
                    </Option>
                    <Option value={"/settings/orgstructure"}>
                        По орг. структуре
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
