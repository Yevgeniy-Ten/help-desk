import { Table, Button } from 'antd';
import { NavLink } from 'react-router-dom';

const TablForm = ({appeals}) => {
    const rowSeleced = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRows);
        }
    };

    const props = {
    bordered: true,
    pagination: { position: "bottom" },
    size: "middle",
    showHeader: true,
    rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows);
        }
    },
    scroll: { x: 400 }
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
        // size="middle"
        // rowSelection={{...rowSelection}}
        columns={columns} 
        dataSource={data} 
        // pagination
        // scroll={{ x: 400 }}
        // pagination={{ position: [state.top, state.bottom] }}
        />
    );
}

export default TablForm;