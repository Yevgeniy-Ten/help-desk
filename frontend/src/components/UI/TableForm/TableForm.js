import { Table, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TablForm = ({appeals}) => {
    const [state, setState] = useState({
        selectedRowKeys: []
    })

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setState({ selectedRowKeys });
    };

    const rowSelection = {
        state: state,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];

    let data = [];
    for (let index = 0; index < appeals.length; index++) {
        data.push({
            key: index,
            title: appeals[index].title,
            status: appeals[index].status,
            description: appeals[index].description,
            action: (
                <>
                    <NavLink to={`/appeals/${appeals[index].id}`}>Detail</NavLink>
                </>
            ),
        });
    }
    // appeals.map((appeal, index) => {
    //     return {
    //         key: index,
    //         title: appeal.title,
    //         status: appeal.status,
    //         description: appeal.description,
    //         action: (
    //             <>
    //                 <NavLink to={`/appeals/${appeal.id}`}>Detail</NavLink>
    //             </>
    //         ),
    //     }
    // });
    console.log(data);

    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
}

export default TablForm;