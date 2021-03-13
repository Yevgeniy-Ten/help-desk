import React, { useEffect } from "react";
import {
    Input, 
    Form, 
    Button, 
    Checkbox,
    Select,
    Row,
    Col
    } from "antd";
import DateFilter from "../UI/DateFilter/DateFilter";
import "./AppealsFilter.css";
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
        let date = {};
        if(values && values.length > 0) {
            date = {
                startDate: values[0]._d,
                endDate: values[1]._d
            }
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
            size={"default"}
            layout={"vertical"}
            onFinish={submitFormHandler}
        >
            <Row gutter={{ xs: 8, lg: 10 }}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                    name={"id"}
                    label="Поиск по идентификатору"
                    style={{marginBottom: "15px"}}
                    >
                        <Input placeholder={"Выбранные идентефикаторы"}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                    <Form.Item
                    name={"status"}
                    label="По статусу"
                    style={{marginBottom: "15px"}}
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
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                    <Form.Item
                    label={"По дате"}
                    name={"date"}
                    style={{marginBottom: "15px"}}
                    >
                        <DateFilter onChange={onDateChange} />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                    <Form.Item style={{marginBottom: "0"}}>
                        <Form.Item name="myAppeals" checked={false} onChange={onMyApealsChange}>
                            <Checkbox>Мои обращения</Checkbox>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item style={{marginBottom: "0"}}>
                        <Button type="primary" htmlType="submit" size={"large"}>
                            Потвердить
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default AppealsFilter;