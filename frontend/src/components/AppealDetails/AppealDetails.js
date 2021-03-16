import React from "react";
import "./AppealDetails.css";
import {
    Row, 
    Col, 
    Button, 
    Form, 
    Input
    } from "antd"

const AppealDetails = ({chat, appeal}) => {
    const [form] = Form.useForm();

    const submitFormHandler = (values) => {

    }

    return (
        <div className="detail-block">
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <h2><strong>Детали обращения</strong></h2>

                    <h3><strong>Тематика:</strong></h3>
                    <p>{appeal ? appeal.topicId : null}</p>

                    <h3><strong>Заголовок:</strong></h3>
                    <p>{appeal ? appeal.title : null}</p>

                    <h3><strong>Описание:</strong></h3>
                    <p>{appeal ? appeal.description : null}</p>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Button type="danger" size={"middle"}>
                        Отозвать
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h2><strong>Переписка:</strong></h2>
                    <div className="detail-block__chat">
                        {chat.map((message) => {
                            const isClient = message.role === "client"
                            return (
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: isClient ? "flex-start" : "flex-end"
                                }}>
                                    <div>
                                        <h5>
                                            {isClient ? "Вы" : "Служба поддержки"}
                                        </h5>
                                        <p>
                                            {message.msg}
                                        </p>
                                    </div>
                                </Col>)
                        })}
                        <Form
                        form={form}
                        name="send-message"
                        size={"default"}
                        layout={"vertical"}
                        onFinish={submitFormHandler}
                        >
                            <Row
                            justify="space-between"
                            align="middle"
                            wrap={true}
                            >
                                <Col xs={{ span: 24 }} lg={{ span: 20 }}>
                                    <Form.Item
                                    name={'message'}
                                    style={{marginBottom: "0"}}
                                    >
                                        <Input.TextArea placeholder={"Напишите сообщение"} allowClear={true} autoSize={{ minRows: 2, maxRows: 2 }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                                    <Form.Item 
                                    style={{marginLeft: "15px", marginBottom: "0"}}
                                    >
                                        <Button type="primary" htmlType="submit" size={"middle"}>
                                            Отправить
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AppealDetails;
