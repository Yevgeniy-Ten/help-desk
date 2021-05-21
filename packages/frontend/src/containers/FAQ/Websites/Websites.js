import React from "react";
import { Breadcrumb, Col, Row, Collapse, Form, Input, Button } from "antd";

const { Panel } = Collapse;

const Websites = () => {
  const loading = false;
  return (
    <Row style={{ padding: "10px 20px" }}>
      <Col span={24} className="mb-sm">
        <Breadcrumb>
          <Button
            onClick={() => {
              console.log("test");
              // dispatch(fetchGetFile());
            }}
          >
            Создать решение
          </Button>
        </Breadcrumb>
      </Col>
      <Col span={24}>
        {loading ? null : ( // <Spinner />
          <>
            <Form name="audit" layout="vertical">
              <Collapse>
                <Panel header={0} key={0 + 2}>
                  <Form.Item
                    name="item.name}count"
                    label="Количество заявок"
                    initialValue={0}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </Panel>
              </Collapse>
              <Collapse>
                <Panel header="По статусу" key="status">
                  <Form.Item
                    name="item.name}status-open"
                    label="Открыто"
                    initialValue={0}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </Panel>
              </Collapse>
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Websites;
