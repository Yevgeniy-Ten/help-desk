import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  FileTextOutlined,
  ContactsOutlined,
  DatabaseOutlined,
  SettingOutlined,
  HistoryOutlined,
  AuditOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getUser } from "../../containers/Auth/redux/getters/getters";

const MenuSider = () => {
  const user = useSelector(getUser);
  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item
        key="1"
        icon={<FileTextOutlined style={{ fontSize: "24px" }} />}
      >
        <NavLink to="/appeals">Заявки</NavLink>
      </Menu.Item>
      {user && user.role && user.role.name === "admin" && (
        <Menu.Item
          key="2"
          icon={<HistoryOutlined style={{ fontSize: "24px" }} />}
        >
          <NavLink to="/requests/history">История заявок</NavLink>
        </Menu.Item>
      )}
      {user && user.role && user.role.name === "admin" && (
        <Menu.Item
          key="3"
          icon={<AuditOutlined style={{ fontSize: "24px" }} />}
        >
          <NavLink to="/requests/audit">Аудит</NavLink>
        </Menu.Item>
      )}
      {user && user.role && user.role.name === "admin" && (
        <Menu.Item
          key="7"
          icon={<InfoCircleOutlined style={{ fontSize: "24px" }} />}
        >
          <NavLink to="/logs">Логи</NavLink>
        </Menu.Item>
      )}
      {user && user.role && user.role.name === "admin" && (
        <Menu.Item
          key="4"
          icon={<ContactsOutlined style={{ fontSize: "24px" }} />}
        >
          <NavLink to="/users">Контакты</NavLink>
        </Menu.Item>
      )}
      <Menu.Item
        key="5"
        icon={<DatabaseOutlined style={{ fontSize: "24px" }} />}
      >
        <NavLink to="/faq">База знаний</NavLink>
      </Menu.Item>
      {user && user.role && user.role.name === "admin" && (
        <Menu.Item
          key="6"
          icon={<SettingOutlined style={{ fontSize: "24px" }} />}
        >
          <NavLink to="/settings">Настройки</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MenuSider;
