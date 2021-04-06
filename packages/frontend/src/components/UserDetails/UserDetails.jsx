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
import {PhoneOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {imageStub, apiURL} from "../../constants";

const {Text} = Typography;
const {Panel} = Collapse;
const {Option} = Select;
const UserDetails = ({
                         userInfo,
                         companies,
                         departments,
                         form,
                         onFinish,
                         onChangeFields,
                         settingIsLoader,
                         isLoading, orgStructures
                     }) => {
    console.log(orgStructures)
    return (
        <>
            {userInfo && (
                <Space
                    direction="horizontal"
                    align="start"
                    wrap
                    size={100}
                >
                    <Form onValuesChange={onChangeFields}
                          form={form}
                          name="edit-user"
                          layout={"vertical"}
                          onFinish={onFinish}>
                        <Space direction="vertical">
                            <Collapse>
                                <Panel header="Контакты" key="1">
                                    <Form.Item name={"email"} initialValue={userInfo.email}>
                                        <Input prefix={<MailOutlined/>} disabled/>
                                    </Form.Item>
                                    <Form.Item name={"phoneNumber"} initialValue={userInfo.phoneNumber}>
                                        <Input prefix={<PhoneOutlined/>}/>
                                    </Form.Item>
                                </Panel>
                                <Panel header="Основная информация" key="2">
                                    <Form.Item
                                        name={"firstName"}
                                        label="Имя"
                                        initialValue={userInfo.firstName}>
                                        <Input prefix={<UserOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={"lastName"}
                                        label="Фамилия"
                                        initialValue={userInfo.lastName}>
                                        <Input prefix={<UserOutlined/>}/>
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
                                        className={"mb-sm"}>
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
                                    <Form.Item
                                        name={"departmentId"}
                                        label="Отдел"
                                        className={"mb-sm"}>
                                        <Select placeholder="Выберите отдел" allowClear>
                                            {departments.map((department) => {
                                                return (
                                                    <Option key={department.id + department.title}
                                                            value={department.id}>
                                                        {department.title}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={"orgstructureId"}
                                        label="Должность"
                                        className={"mb-sm"}>
                                        <Select placeholder="Выберите должность" allowClear>
                                            {orgStructures.map((orgstructure) => {
                                                return (
                                                    <Option key={orgstructure.id}
                                                            value={orgstructure.id}>
                                                        {orgstructure.position.title}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Panel>
                            </Collapse>
                            <Button disabled={isLoading || settingIsLoader} type="primary" htmlType="submit">
                                Обновить данные
                            </Button>
                        </Space>
                    </Form>
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
