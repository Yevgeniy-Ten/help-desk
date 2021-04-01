import React from "react";
import {Button, Col, Form, Input, Row} from "antd";

const AppealChat = () => {

    const chat = [
        {
            name: "Yevgeniy",
            msg: "Добрый ден как дела!",
            role: "client"
        },
        {
            name: "Yevgeniy",
            msg: "Добрый ден как дела!",
            role: "client"
        },
        {
            name: "Yevgeniy",
            msg: "Добрый ден как дела!",
            role: "client"
        },
        {
            name: "Юля",
            msg: "Добрый ден как дела! всё хорошо",
            role: "Служба поддерки"
        },
    ];

    return (
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
                    {/*<Form*/}
                    {/*    form={form}*/}
                    {/*    name="send-message"*/}
                    {/*    size={"default"}*/}
                    {/*    layout={"vertical"}*/}
                    {/*    onFinish={submitFormHandler}*/}
                    {/*>*/}
                    {/*    <Row*/}
                    {/*        justify="space-between"*/}
                    {/*        align="middle"*/}
                    {/*        wrap={true}*/}
                    {/*    >*/}
                    {/*        <Col xs={{ span: 24 }} lg={{ span: 20 }}>*/}
                    {/*            <Form.Item*/}
                    {/*                name={'message'}*/}
                    {/*                style={{marginBottom: "0"}}*/}
                    {/*            >*/}
                    {/*                <Input.TextArea placeholder={"Напишите сообщение"} allowClear={true} autoSize={{ minRows: 2, maxRows: 2 }} />*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*        <Col xs={{ span: 24 }} lg={{ span: 4 }}>*/}
                    {/*            <Form.Item*/}
                    {/*                style={{marginLeft: "15px", marginBottom: "0"}}*/}
                    {/*            >*/}
                    {/*                <Button type="primary" htmlType="submit" size={"middle"}>*/}
                    {/*                    Отправить*/}
                    {/*                </Button>*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</Form>*/}
                </div>
            </Col>
        </Row>
    );
};

export default AppealChat;
