import React from "react";
import {NavLink} from "react-router-dom";
import {Menu} from "antd";

const {SubMenu} = Menu;

const MenuSider = () => {
    return (
        <Menu theme="dark" mode="inline">
            <SubMenu key="sub1" title="Обращение">
                <Menu.Item key="1">
                    <NavLink to="appeals">Обращение</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/appeals/add">Создать обращение</NavLink>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Тикеты">
                <Menu.Item key="3">
                    <NavLink to="/tickets">Тикеты</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/tickets/add">Создать тикет</NavLink>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
                <NavLink to="/faq">FAQ</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
                Настройки
            </Menu.Item>
        </Menu>
    );
};

export default MenuSider;