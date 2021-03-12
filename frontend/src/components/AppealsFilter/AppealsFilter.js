import React, { useEffect } from "react";
import {
    Input, 
    Form, 
    Button, 
    Checkbox,
    Select
    } from "antd";
import DateFilter from "../UI/DateFilter/DateFilter";
const { Option } = Select;

const AppealsFilter = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        //выгружает список статусов для options
    }, []);

    const submitFormHandler = (value) => {
        console.log(value);
    };
    
    const onStatusChange = (value) => {
        form.setFieldsValue({ status: value });
    };

    const onDateChange = (values) => {
        let date = {
            startDate: values[0]._d,
            endDate: values[1]._d
        }
        
        form.setFieldsValue({ date: date });
    };

    const onMyApealsChange = (e) => {
        if(!e.target.checked) {
            form.setFieldsValue({ myAppeals: false });
        }
        else {
            form.setFieldsValue({ myAppeals: true });
        }
    };

    return (
        <Form
            form={form}
            name="form-filter"
            size={"large"}
            layout={"horizontal"}
            onFinish={submitFormHandler}
        >
            <Form.Item
                name={"id"}
                label="Поиск по идентификатору">
                <Input placeholder={"Выбранные идентефикаторы"}/>
            </Form.Item>
            <Form.Item
                name={"status"}
                label="По статусу"
            >
                <Select
                placeholder="Выберите статус обращения"
                onChange={onStatusChange}
                allowClear
                >
                    <Option value={"Выполняется"}>Выполняется</Option>
                    <Option value={"Отложено"}>Отложено</Option>
                    <Option value={"Выполнено"}>Выполнено</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label={"По дате"}
                name={"date"}>
                <DateFilter onChange={onDateChange}/>
            </Form.Item>
            <Form.Item>
                <Form.Item name="myAppeals" checked={false} onChange={onMyApealsChange}>
                    <Checkbox>Мои обращения</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Потвердить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AppealsFilter;