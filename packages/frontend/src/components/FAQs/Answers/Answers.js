import React, { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Breadcrumb, Col, Row, Collapse, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { getUser } from "../../../containers/Auth/redux/getters/getters";
import {
  getFaqs,
  getFaqsLoader
} from "../../../containers/FAQ/redux/faqsGetters";
import Spinner from "../../Spinner/Spinner";

const { Panel } = Collapse;

const Answers = ({ onShowEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const faqs = useSelector(getFaqs);
  const isLoading = useSelector(getFaqsLoader);
  console.log(faqs);
  // eslint-disable-next-line consistent-return
  const genExtra = () => {
    if (user && user.roleId === 1) {
      return (
        <EditOutlined
          style={{ marginLeft: "10px" }}
          onClick={(event) => {
            event.stopPropagation();
            onShowEditor();
          }}
        />
      );
    }
  };
  useEffect(() => {});
  return (
    <Row style={{ padding: "10px 20px" }}>
      <Col span={24} className="mb-sm">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Form name="faqs" layout="vertical">
              <Collapse accordion={false}>
                {faqs &&
                  faqs.map((faq, i) => {
                    return (
                      <Panel
                        header={`${faq.questionTitle}`}
                        key={i}
                        extra={genExtra()}
                      >
                        <p>
                          <b>Ответ: </b> {faq.answer}
                        </p>
                        {faq.videoPath && (
                          <p>
                            <b>Видео: </b>{" "}
                            <a
                              href={`${faq.videoPath}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Ссылка на решение
                            </a>
                          </p>
                        )}
                      </Panel>
                    );
                  })}
              </Collapse>
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Answers;
