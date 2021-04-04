import React from "react";
import {
  Collapse,
  Form,
  Input,
  Button,
  Space,
  Select,
  Typography,
} from "antd";
import { PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { imageStub, apiURL } from "../../constants";
import { useDispatch } from "react-redux";
import { fetchUpdatedUser } from "../../containers/AllUsers/redux/usersAction/usersActions";
const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const UserDetails = ({ userInfo, companies }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (value) => {
    console.log(value);
    if (value) dispatch(fetchUpdatedUser(value, userInfo.id));
  };
  let formItems;
  if (userInfo) {
    formItems = (
      <Form form={form} name="edit-user" layout={"vertical"} onFinish={onFinish}>
        <Space direction="vertical">
          <Collapse>
            <Panel header="Контакты" key="1">
              <Form.Item name={"email"} initialValue={userInfo.email}>
                <Input prefix={<MailOutlined />} disabled />
              </Form.Item>
              <Form.Item name={"phoneNumber"} initialValue={userInfo.phoneNumber}>
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Panel>
            <Panel header="Основная информация" key="2">
              <Form.Item
                name={"firstName"}
                label="Имя"
                initialValue={userInfo.firstName}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name={"lastName"}
                label="Фамилия"
                initialValue={userInfo.lastName}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Panel>
            <Panel header="Дополнительная информация" key="3">
              <Space direction="vertical">
                <Text>ID: {userInfo.id}</Text>
                <Text>
                  {userInfo.company &&
                    `${userInfo.company.title} ID : ${userInfo.id} `}
                </Text>
              </Space>
              <Form.Item
                name={"companyId"}
                label="Компания :"
                className={"mb-sm"}
              >
                <Select placeholder="Выберите компанию" allowClear>
                  {companies.map((company) => {
                    return (
                      <Option key={company.id + company.title} value={company.id}>
                        {company.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Panel>
          </Collapse>
          <Button type="primary" htmlType="submit">
            Обновить данные
        </Button>
        </Space>
      </Form>
    );
  }
  return (
    <>
      {userInfo && (
        <Space
          direction="horizontal"
          align="start"
          wrap
          size={100}
          style={{ margin: 15 }}
        >
          {formItems}
          <Space direction="vertical">
            <img
              src={
                userInfo.photo
                  ? `apiURL/public/uploads/users/${userInfo.photo}`
                  : imageStub
              }
            />
          </Space>
        </Space>
      )}
    </>
  );
};

export default UserDetails;
