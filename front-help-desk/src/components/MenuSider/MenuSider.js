import React from "react";
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import "antd/dist/antd.css";

const {SubMenu} = Menu;

const MenuSider = () => {
    return (
        <Menu theme="dark" mode="inline">
            <SubMenu key="sub1" title="Обращение" >
                <Menu.Item key="1">
                    <NavLink to="/users/appeals">Обращение</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/users/add-appeal">Создать обращение</NavLink>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Тикеты">
                <Menu.Item key="3">
                    <NavLink to="/users/tikets">Тикеты</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/users/add-tiket">Создать тикет</NavLink>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
                База знаний
            </Menu.Item>
            <Menu.Item key="6">
                Настройки
            </Menu.Item>
        </Menu>
    );
};

export default MenuSider;