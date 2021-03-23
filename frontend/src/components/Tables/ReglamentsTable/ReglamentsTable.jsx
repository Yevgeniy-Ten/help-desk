import React, {useEffect} from "react";
import {Button, Space, Table} from "antd";
import {NavLink} from "react-router-dom";
import {fetchReglaments} from "../../../containers/Settings/redux/settingsActions";
import {useDispatch, useSelector} from "react-redux";
import {getReglaments} from "../../../containers/Settings/redux/settingGetters";

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
        dataIndex: "topicId",
        key: "topicId",
    },
    {
        title: "Ответсвенный отдел",
        dataIndex: "departmentId",
        key: "departmentId",
    },
    {
        title: "Срок исполнения",
        dataIndex: "deadline",
        key: "deadline",
        render: (text) => `${text} часов`,
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
    useEffect(() => {
        dispatch(fetchReglaments());
    }, [dispatch]);
    return (
        <Table bordered title={() => <h4>Регламенты</h4>} columns={columns} dataSource={reglaments}/>
    );
};

export default ReglamentsTable;
