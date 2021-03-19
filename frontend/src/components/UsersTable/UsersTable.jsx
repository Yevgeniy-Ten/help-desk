import React from "react";
import {Table} from "antd";
import {usersColumns} from "./userColumns";

const UsersTable = ({users}) => {
    return (
        <div>
            <Table columns={usersColumns} dataSource={users}/>
        </div>
    );
};

export default UsersTable;
