import React, {useEffect} from "react";
import {Button, Space, Table} from "antd";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments} from "../../../containers/Settings/redux/settingsActions";
import {getDepartments, getSettingsLoader} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";

const columns = [
    {
        title: "Идентификатор",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Название",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Сотрудников",
        dataIndex: "employees",
        key: "employees",
        render: (employess) => employess ? employess : 0
    },
    {
        title: "Действия",
        key: "actions",
        render: (text, record) => (
            <Space size="middle">
                <NavLink to={`/settings/departments/${record.id}`}>Редактировать</NavLink>
                <Button danger>Удалить</Button>
            </Space>
        ),
    },
];
const DepartmentTable = () => {
    const dispatch = useDispatch();
    const departments = useSelector(getDepartments);
    const isLoad = useSelector(getSettingsLoader)
    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);
    return (
        <>
            {isLoad ? <Spinner/> :
                <Table bordered title={() => <h4>Отделы</h4>} columns={columns} dataSource={departments}/>}
        </>
    );
};

export default DepartmentTable;
