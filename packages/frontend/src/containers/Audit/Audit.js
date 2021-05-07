import React, { useEffect } from "react";
import { Breadcrumb, Col, Row, Collapse, Form, Input, Button } from "antd";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import { getAudit } from "./redux/auditGetters";
import { fetchAudit, fetchGetFile } from "./redux/auditActions";

const { Panel } = Collapse;

const Audit = () => {
  const dispatch = useDispatch();
  const { audit, loading } = useSelector(getAudit, shallowEqual);
  useEffect(() => {
    dispatch(fetchAudit());
  }, [dispatch]);
  let count = 0;
  if (audit) {
    audit.forEach((item) => {
      count += item.requests.count;
    });
  }
  return (
    <Row style={{ padding: "10px 20px" }}>
      <Col span={24} className="mb-sm">
        <Breadcrumb>
          <Button
            onClick={() => {
              dispatch(fetchGetFile());
            }}
          >
            Скачать
          </Button>
        </Breadcrumb>
        <Breadcrumb style={{ marginTop: "18px" }}>
          <h3>Аудит:</h3>
        </Breadcrumb>
      </Col>
      <Col span={24}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Form name="audit" layout="vertical">
              <Collapse defaultActiveKey={["0"]}>
                <Panel header="Общее количество заявок" key="0">
                  <Form.Item name="count" initialValue={count} className="mb-0">
                    <Input disabled={true} />
                  </Form.Item>
                </Panel>
                {audit.map((item, index) => {
                  return (
                    <Panel header={item.name} key={index + 2}>
                      <Form.Item
                        name={`${item.name}count`}
                        label="Количество заявок"
                        initialValue={item.requests.count}
                      >
                        <Input disabled={true} />
                      </Form.Item>
                      <Collapse>
                        <Panel header="По статусу" key="status">
                          <Form.Item
                            name={`${item.name}status-open`}
                            label="Открыто"
                            initialValue={item.requests.status.open}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                          <Form.Item
                            name={`${item.name}status-inProgress`}
                            label="Выполняется"
                            initialValue={item.requests.status.inProgress}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                          <Form.Item
                            name={`${item.name}status-suspend`}
                            label="Приостановлено"
                            initialValue={item.requests.status.suspend}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                          <Form.Item
                            name={`${item.name}status-done`}
                            label="Выполнено"
                            initialValue={item.requests.status.done}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                        </Panel>
                      </Collapse>
                      <Collapse>
                        <Panel header="По приоритету" key="priority">
                          <Form.Item
                            name={`${item.name}priority-standart`}
                            label="Стандартно"
                            initialValue={item.requests.priority.standart}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                          <Form.Item
                            name={`${item.name}priority-medium`}
                            label="Средний"
                            initialValue={item.requests.priority.medium}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                          <Form.Item
                            name={`${item.name}priority-urgent`}
                            label="Срочно"
                            initialValue={item.requests.priority.urgent}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                          <Form.Item
                            name={`${item.name}priority-critical`}
                            label="Критично"
                            initialValue={item.requests.priority.critical}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                        </Panel>
                      </Collapse>
                    </Panel>
                  );
                })}
              </Collapse>
              ,
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Audit;
