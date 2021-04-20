import React from "react";
import { Button } from "antd";

const AuthMenu = ({ onLogout }) => {
  return (
    <div>
      <Button type="default" size={"middle"} onClick={onLogout}>
        Log out
      </Button>
    </div>
  );
};

export default AuthMenu;
