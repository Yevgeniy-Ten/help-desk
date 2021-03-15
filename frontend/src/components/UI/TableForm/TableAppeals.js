import { Table, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const TableAppeals = ({appeals, saveSelectedAppealsHandler}) => {
    const [selectAppeals, setSelectAppeals] = useState([]);

    const props = {
    bordered: true,
    pagination: { position: "bottom" },
    size: "middle",
    showHeader: true,
    rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectAppeals(selectedRows);
        }
    },
    scroll: { x: 400 },
    footer: () => {

        return (
            <>
                <Button type="primary" size={"middle"} onClick={() => saveSelectedAppealsHandler(selectAppeals)} >
                    <NavLink to={`/tickets/add`}>Создать тикет</NavLink>
                </Button>
            </>
        );
    }
    };

    const columns = [
        {
            key: "title",
            title: 'Заголовок обращения',
            dataIndex: 'title',
            align: "center",
            width: "50%"
        },
        {
            key: "status",
            title: 'Статус',
            dataIndex: 'status',
            align: "center",
            width: "30%"
        },
        {
            key: "action",
            title: 'Просмотр',
            dataIndex: 'action',
            align: "center",
            width: "15%"
        },
    ];

    let data = [];
    for (let index = 0; index < appeals.length; index++) {
        data.push({
            key: index,
            id: appeals[index].id,
            title: appeals[index].title,
            status: appeals[index].status,
            description: appeals[index].description,
            action: (
                <>
                    <Button type="default" size={"middle"}>
                        <NavLink to={`/appeals/${appeals[index].id}`}>Detail</NavLink>
                    </Button>
                </>
            ),
        });
    }

    

    return (
        <Table 
        {...props}
        columns={columns} 
        dataSource={data} 
        />
    );
}

export default TableAppeals;