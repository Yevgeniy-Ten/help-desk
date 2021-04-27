import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

const AppealChat = ({ messages, onCreateMessage }) => {
  const [form] = Form.useForm();
  return (
    <Row>
      <Col span={24}>
        <h2>
          <strong>Переписка:</strong>
        </h2>
        <div className="detail-block__chat">
          {messages.map((message) => {
            const isClient = message.role === "client";
            return (
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: isClient ? "flex-start" : "flex-end"
                }}
              >
                <div>
                  <h5>{isClient ? "Вы" : "Служба поддержки"}</h5>
                  <p>{message.message}</p>
                </div>
              </Col>
            );
          })}
          <Form
            onFinish={onCreateMessage}
            form={form}
            name="send-message"
            layout="vertical"
          >
            <Row justify="space-between" align="middle" wrap={true}>
              <Col xs={{ span: 24 }} lg={{ span: 22 }}>
                <Form.Item
                  name="message"
                  label="Сообщение"
                  rules={[
                    {
                      required: true,
                      message: "Напишите сообщение!"
                    }
                  ]}
                >
                  <Input placeholder="Напишите ваше сообщение" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 2 }}>
                <Button type="primary" htmlType="submit" size="middle">
                  Отправить
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default AppealChat;
