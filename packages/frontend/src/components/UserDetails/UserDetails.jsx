import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Form, Input, Button, Space, Select, Typography } from "antd";
import { PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { imageStub, apiURL, instance } from "../../constants";
import { useDispatch } from "react-redux";

const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const UserDetails = ({
  userInfo,
  companies,
  departments,
  form,
  onFinish,
  onChangeFields,
  settingIsLoader,
  isLoading,
  orgStructures
}) => {
  const [userRoles, setUserRoles] = useState([]);

  const dispatch = useDispatch();
  useEffect(async () => {
    const response = await instance.get("/userRoles");
    setUserRoles(response.data);
  }, [dispatch]);
  console.log(userInfo);
  return (
    <>
      {userInfo && (
        <Space direction="horizontal" align="start" wrap={true} size={100}>
          <Form
            onValuesChange={onChangeFields}
            form={form}
            name="edit-user"
            layout="vertical"
            onFinish={onFinish}
          >
            <Space direction="vertical">
              <Collapse>
                <Panel header="Контакты" key="1">
                  <Form.Item name="email" initialValue={userInfo.email}>
                    <Input prefix={<MailOutlined />} disabled={true} />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    initialValue={userInfo.phoneNumber}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Panel>
                <Panel header="Основная информация" key="2">
                  <Form.Item
                    name="firstName"
                    label="Имя"
                    initialValue={userInfo.firstName}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
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
                    name="companyId"
                    label="Компания :"
                    className="mb-sm"
                    initialValue={userInfo.company && userInfo.company.id}
                  >
                    <Select placeholder="Выберите компанию" allowClear={true}>
                      {companies.map((company) => {
                        return (
                          <Option
                            key={company.id + company.title}
                            value={company.id}
                          >
                            {company.title}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  {userInfo.role && userInfo.role.name !== "client" && (
                    <>
                      <Form.Item
                        name="departmentId"
                        label="Отдел"
                        className="mb-sm"
                        initialValue={
                          userInfo.orgStructure &&
                          userInfo.orgStructure.departmentId
                        }
                      >
                        <Select placeholder="Выберите отдел" allowClear={true}>
                          {departments.map((department) => {
                            return (
                              <Option
                                key={department.id + department.title}
                                value={department.id}
                              >
                                {department.title}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="orgstructureId"
                        label="Должность"
                        className="mb-sm"
                        initialValue={
                          userInfo.orgStructure &&
                          userInfo.orgStructure.positionId
                        }
                      >
                        <Select
                          placeholder="Выберите должность"
                          allowClear={true}
                        >
                          {orgStructures.map((orgstructure) => {
                            console.log(orgstructure);
                            return (
                              <Option
                                key={orgstructure.id}
                                value={orgstructure.id}
                              >
                                {orgstructure.position.title}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </>
                  )}
                  <Form.Item
                    name="userRoleId"
                    label="Роль"
                    className="mb-sm"
                    initialValue={userInfo.role.id}
                  >
                    <Select placeholder="Выберите роль" allowClear={true}>
                      {userRoles.map((userRole) => {
                        console.log(userRole);
                        return (
                          <Option key={userRole.id} value={userRole.id}>
                            {userRole.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Panel>
              </Collapse>
              <Button
                disabled={isLoading || settingIsLoader}
                type="primary"
                htmlType="submit"
              >
                Обновить данные
              </Button>
              <NavLink to="/users">
                <Button type="dashed">Отмена</Button>
              </NavLink>
            </Space>
          </Form>
          <Space direction="vertical">
            {userInfo.photo ? (
              <img
                src={`apiURL/public/uploads/users/${userInfo.photo}`}
                alt=""
              />
            ) : (
              <img src={imageStub} alt="" />
            )}
          </Space>
        </Space>
      )}
    </>
  );
};

export default UserDetails;
