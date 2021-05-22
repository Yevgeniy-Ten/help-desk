import React, { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Breadcrumb, Col, Row, Collapse, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { getUser } from "../../../containers/Auth/redux/getters/getters";

const { Panel } = Collapse;

const Websites = () => {
  const loading = false;
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  // eslint-disable-next-line consistent-return
  const genExtra = () => {
    if (user && user.roleId === 1) {
      return (
        <EditOutlined
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      );
    }
  };
  useEffect(() => {});
  return (
    <Row style={{ padding: "10px 20px" }}>
      {user && user.roleId === 1 && (
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
      )}
      <Col span={24}>
        {loading ? null : ( // <Spinner />
          <>
            <Form name="faqs" layout="vertical">
              <Collapse accordion={false}>
                <Panel header="Как обновить браузер" key={2} extra={genExtra()}>
                  <p>
                    <b>Ответ: </b> Нажмите F5
                  </p>
                  <p>
                    <b>Видео: </b>{" "}
                    <a
                      href="http://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      You tube
                    </a>
                  </p>
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
