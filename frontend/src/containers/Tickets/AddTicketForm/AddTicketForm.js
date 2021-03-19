import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { 
    Button, 
    Form, 
    Input, 
    Select, 
    DatePicker,
    Row,
    Col
    } from "antd";
import "./AddTicketForm.css";
import { getAppealsState, getTopicsState } from '../../Appeals/redux/getters/getters';
import { NavLink } from 'react-router-dom';
import { fetchTopics } from '../../Appeals/redux/action/topicsActions';
import { addNewTickets } from '../redux/action/ticketsAction';
import { fetchAppeals } from '../../Appeals/redux/action/appealsAction';
const { Option } = Select;

const AddTicketForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {appeals} = useSelector(getAppealsState, shallowEqual);
    const {topics} = useSelector(getTopicsState, shallowEqual);

    useEffect(() => {
        dispatch(fetchAppeals());
        dispatch(fetchTopics());
    }, [dispatch]);

    const submitFormHandler = (values) => {
        const {deadline} = values;
        const ticketData = {
            appeals: values.appeals,
            deadline: deadline._d,
            description: values.description,
            hourWork: values.hourWork,
            priority: values.priority,
            status: values.status,
            title: values.title,
            topicId: values.topicId,
            type: values.type
        }
        console.log(ticketData)
        dispatch(addNewTickets(ticketData));
    };

    const onAppealsChange = (values) => {
        // console.log(values);
        form.setFieldsValue({ appeals: values });
    };

    const onTypeChange = (value) => {
        // console.log(value);
        form.setFieldsValue({ type: value });
    };

    const onStatusChange = (value) => {
        // console.log(value);
        form.setFieldsValue({ status: value });
    };

    const onPriorityChange = (value) => {
        // console.log(value);
        form.setFieldsValue({ priority: value });
    };

    const onTopicChange = (value) => {
        // console.log(value);
        form.setFieldsValue({ topicId: value });
    };

    return (
        <>
            <Form
                form={form}
                name="add-tiket"
                size={"default"}
                layout={"vertical"}
                onFinish={submitFormHandler}
            >
                <Row gutter={{ xs: 8, lg: 10 }}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Form.Item
                        name={"appeals"}
                        label="Выбранные обращения"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <Select
                            mode="multiple"
                            optionLabelProp="label"
                            placeholder="Выберите тематику обращения"
                            onChange={onAppealsChange}
                            allowClear
                            >
                                {appeals.map((appeal, index) => {
                                    return(
                                        <>
                                            <Option key={index} value={appeal.id}>
                                                <div className="form__item">
                                                    <span style={{marginRight: "auto"}}>
                                                       ID: {appeal.id}, {appeal.title}
                                                    </span>
                                                    <Button type="primary" size={"middle"} style={{marginRight: "10px"}}>
                                                        <NavLink to={`/appeals/${appeal.id}`}>Detail</NavLink>
                                                    </Button>
                                                </div>
                                            </Option>
                                        </>
                                    )
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                        label={"Тематика"}
                        name={"topicId"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <Select
                            placeholder="Выберите тематику обращения"
                            onChange={onTopicChange}
                            allowClear
                            style={{marginBottom: "15px"}}
                            >
                                {topics.map((topic, index) => {
                                    return(
                                        <>
                                            <Option key={index} value={topic.id}>{topic.name}</Option>
                                        </>
                                    )
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                        name={"type"}
                        label="Тип"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <Select
                            placeholder="Выберите инцидент или обращение"
                            onChange={onTypeChange}
                            allowClear
                            >
                                <Option key="incident" value="incident">Инцидент</Option>
                                <Option key="request" value="request">Запрос</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                        name={"status"}
                        label="Статус"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <Select
                            placeholder="Выберите статус"
                            onChange={onStatusChange}
                            allowClear
                            // defaultValue="open"
                            >
                                <Option key="open" value="open">Открыто</Option>
                                <Option key="inProcess" value="inProcess">В процессе</Option>
                                <Option key="done" value="done">Выполнено</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                        name={"priority"}
                        label="Приоритет"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <Select
                            placeholder="Выберите приоритет"
                            onChange={onPriorityChange}
                            allowClear
                            // defaultValue="low"
                            >
                                <Option key="high" value="high">Срочно</Option>
                                <Option key="medium" value="medium">Средний</Option>
                                <Option key="low" value="low">Стандартно</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                        label={"Трудозатраты"}
                        name={"hourWork"}
                        style={{marginBottom: "15px"}}
                        >
                            <Input placeholder="n часов" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Form.Item
                        name={"title"}
                        label="Заголовок тикета"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <Input placeholder={"Опишите вкратце тикет"} />
                        </Form.Item>
                        <Form.Item
                        name={'description'}
                        label="Полное описание тикета"
                        style={{marginBottom: "15px"}}
                        >
                            <Input.TextArea placeholder={"Подробно опишите тикет"} allowClear={true} autoSize={{ minRows: 5, maxRows: 5 }} />
                        </Form.Item>
                        <Form.Item
                        label={"Срок"}
                        name={"deadline"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{marginBottom: "15px"}}
                        >
                            <DatePicker showTime/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item style={{marginBottom: "15px"}}>
                    <Button type="primary" htmlType="submit" size={"middle"}>
                        Создать обращение
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddTicketForm;