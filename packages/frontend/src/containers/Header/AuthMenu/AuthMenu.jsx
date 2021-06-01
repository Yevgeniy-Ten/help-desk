import React from "react";
import { Button } from "antd";

const AuthMenu = ({ onLogout }) => {
  return (
    <div>
      <Button type="default" size={"middle"} onClick={onLogout}>
        Выйти из системы
      </Button>
    </div>
  );
};

export default AuthMenu;
