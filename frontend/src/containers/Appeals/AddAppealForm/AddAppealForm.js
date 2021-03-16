import React, { useEffect } from "react";
import { Button, Form, Input, Select, Row, Col } from "antd";
import FileInput from "../../../components/UploadFile/FileInput";
import "./AddAppealForm.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addNewAppeals } from "../redux/action/appealsAction";
import { fetchTopics } from "../redux/action/topicsActions";
import { getTopicsState } from "../redux/getters/getters";
const { Option } = Select;

const AddAppealForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { topics } = useSelector(getTopicsState, shallowEqual);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const submitFormHandler = (value) => {
    dispatch(addNewAppeals(value));
  };

  const onTopicChange = (value) => {
    form.setFieldsValue({ topicId: value });
  };

  const onFilesChange = (filesList) => {
    form.setFieldsValue({ upload: filesList });
  };

  return (
    <Form
      form={form}
      name="add-appeal"
      size={"default"}
      layout={"vertical"}
      onFinish={submitFormHandler}
    >
      <Row gutter={{ xs: 8, lg: 10 }}>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <Form.Item
            name={"topicId"}
            label="Тематика обращения"
            rules={[
              {
                required: true,
              },
            ]}
            style={{ marginBottom: "15px" }}
          >
            <Select
              placeholder="Выберите тематику обращения"
              onChange={onTopicChange}
              allowClear
            >
              {topics.map((topic, index) => {
                return (
                  <>
                    <Option key={index} value={topic.id}>
                      {topic.name}
                    </Option>
                  </>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 15 }}>
          <Form.Item
            name={"title"}
            label="Заголовок обращения"
            rules={[
              {
                required: true,
              },
            ]}
            style={{ marginBottom: "15px" }}
          >
            <Input placeholder={"Опишите вкратце обращение"} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 15 }}>
          <Form.Item
            name={"description"}
            label="Полное описание"
            style={{ marginBottom: "15px" }}
          >
            <Input.TextArea
              placeholder={"Подробно опишите проблему"}
              allowClear={true}
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 15 }}>
          <Form.Item name={"upload"} style={{ marginBottom: "15px" }}>
            <FileInput
              name="upload"
              onChange={onFilesChange}
              inputType={false}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item style={{ marginBottom: "0" }}>
            <Button type="primary" htmlType="submit" size={"middle"}>
              Создать обращение
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddAppealForm;
