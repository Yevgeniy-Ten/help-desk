import React from "react";
import {Table} from "antd"
import {appealColumns} from "./appealColumns";

const AppealsTable = ({appeals}) => {
    return (
        <Table columns={appealColumns} dataSource={appeals}/>
    )

};

export default AppealsTable;
