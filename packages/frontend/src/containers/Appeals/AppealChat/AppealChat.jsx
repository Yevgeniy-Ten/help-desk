import React from "react";
import { Button, Col, Form, Input, Row, Card } from "antd";

const AppealChat = ({ messages, onCreateMessage }) => {
  const [form] = Form.useForm();
  const onFinishHandler = (message) => {
    onCreateMessage(message);
    form.resetFields();
  };
  return (
    <Row>
      <Col span={24}>
        <h2>
          <strong>Переписка:</strong>
        </h2>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            background: "#fff",
            padding: "15px"
          }}
        >
          {messages.map((message) => {
            const isClient = !!message.clientId;
            return (
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: isClient ? "flex-start" : "flex-end"
                }}
              >
                <Card
                  title={isClient ? "Вы" : "Служба поддержки"}
                  style={{
                    width: 300,
                    background: isClient ? "#d3adf7" : "#e6fffb",
                    marginTop: "5px"
                  }}
                >
                  <span>{message.message}</span>
                </Card>
              </Col>
            );
          })}
        </div>
        <Form
          onFinish={onFinishHandler}
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
      </Col>
    </Row>
  );
};

export default AppealChat;
