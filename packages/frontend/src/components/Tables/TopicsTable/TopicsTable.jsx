import React, {useEffect} from "react";
import {Table, Space, Button} from "antd"
import {NavLink} from "react-router-dom";
import {getSettingsLoader, getTopics} from "../../../containers/Settings/redux/settingGetters";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopics} from "../../../containers/Settings/redux/settingsActions";
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
const TopicsTable = () => {
    const dispatch = useDispatch();
    const topics = useSelector(getTopics);
    const isLoad = useSelector(getSettingsLoader)
    useEffect(() => {
        dispatch(fetchTopics());
    }, [dispatch]);
    return (
        <>
            {isLoad ? <Spinner/> :
                <Table bordered title={() => <h4>Тематики</h4>} columns={columns} dataSource={topics}/>}
        </>
    );
};

export default TopicsTable;
