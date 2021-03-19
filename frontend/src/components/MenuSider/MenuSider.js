import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu;

const MenuSider = () => {
    return (
        <Menu theme="dark" mode="inline">
            <SubMenu key="sub1" title="Заявки">
                <Menu.Item key="1">
                    <NavLink to="/appeals">Заявки</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/appeals/add">Новая заявка</NavLink>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
                <NavLink to="/users">Контакты</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
                <NavLink to="/faq">База знаний</NavLink>
            </Menu.Item>
            <Menu.Item key="7">
                Настройки
            </Menu.Item>
        </Menu>
    );
};

export default MenuSider;