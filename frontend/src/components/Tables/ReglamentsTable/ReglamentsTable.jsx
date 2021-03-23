import React, {useEffect} from "react";
import {Button, Space, Table} from "antd";
import {NavLink} from "react-router-dom";
import {fetchReglaments} from "../../../containers/Settings/redux/settingsActions";
import {useDispatch, useSelector} from "react-redux";
import {getReglaments, getSettingsLoader} from "../../../containers/Settings/redux/settingGetters";
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
        title: "Тематика",
        dataIndex: "topicRules",
        key: "topicRules",
        render: topicRules => topicRules.title
    },
    {
        title: "Ответсвенный отдел",
        dataIndex: "departmentRules",
        key: "departmentRules",
        render: departmentRules => departmentRules.title
    },
    {
        title: "Срок исполнения",
        dataIndex: "deadline",
        key: "deadline",
    },
    {
        title: "Действия",
        key: "actions",
        render: (text, record) => (
            <Space size="middle">
                <NavLink to={`/settings/topics/${record.id}`}>Редактировать</NavLink>
                <Button danger>Удалить</Button>
            </Space>
        ),
    },
];
const ReglamentsTable = () => {
    const dispatch = useDispatch();
    const reglaments = useSelector(getReglaments);
    const isLoad = useSelector(getSettingsLoader)
    useEffect(() => {
        dispatch(fetchReglaments());
    }, [dispatch]);
    return (
        <>
            {isLoad ? <Spinner/> :
                <Table title={() => <h4>Регламенты</h4>} columns={columns} dataSource={reglaments}/>}
        </>
    );
};

export default ReglamentsTable;
