import React from "react";
import {Table} from "antd";
import {usersColumns} from "./userColumns";

const UsersTable = ({users}) => {
    return (
        <Table columns={usersColumns} dataSource={users}/>
    );
};

export default UsersTable;
