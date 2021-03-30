import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { FileTextOutlined, ContactsOutlined, DatabaseOutlined,SettingOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const MenuSider = () => {
    return (
        <Menu theme="dark" mode="inline">
            <SubMenu key="sub1" title="Заявки" icon={<FileTextOutlined style={{fontSize:"24px"}}/>}>
                <Menu.Item key="1" >
                    <NavLink to="/appeals">Заявки</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/appeals/add">Новая заявка</NavLink>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<ContactsOutlined style={{fontSize:"24px"}}/>}>
                <NavLink to="/users">Контакты</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<DatabaseOutlined style={{fontSize:"24px"}}/>}>
                <NavLink to="/faq">База знаний</NavLink>
            </Menu.Item>
            <Menu.Item key="7" icon={<SettingOutlined style={{fontSize:"24px"}}/>}>
                <NavLink to="/settings">Настройки</NavLink>
            </Menu.Item>
        </Menu>
    );
};

export default MenuSider;