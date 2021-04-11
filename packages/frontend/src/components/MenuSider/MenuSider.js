import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { FileTextOutlined, ContactsOutlined, DatabaseOutlined,SettingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getUser } from "../../containers/Auth/redux/getters/getters";

const MenuSider = () => {
    const user = useSelector(getUser)
    return (
        <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<FileTextOutlined style={{fontSize:"24px"}}/>}>
                <NavLink to="/appeals">Заявки</NavLink>
            </Menu.Item>
            {user && user.role && user.role.name==="admin" && 
                <Menu.Item key="5" icon={<ContactsOutlined style={{fontSize:"24px"}}/>}>
                    <NavLink to="/users">Контакты</NavLink>
                </Menu.Item>
            }
            <Menu.Item key="6" icon={<DatabaseOutlined style={{fontSize:"24px"}}/>}>
                <NavLink to="/faq">База знаний</NavLink>
            </Menu.Item>
            {user && user.role && user.role.name==="admin" && 
                <Menu.Item key="7" icon={<SettingOutlined style={{fontSize:"24px"}}/>}>
                    <NavLink to="/settings">Настройки</NavLink>
                </Menu.Item>
            }
        </Menu>
    );
};

export default MenuSider;