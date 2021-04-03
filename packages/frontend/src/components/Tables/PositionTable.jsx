import React, {useEffect} from "react";
import {Table, Space, Button} from "antd"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSettingsLoader} from "../../containers/Settings/redux/settingGetters";
import {fetchPositions} from "../../containers/Settings/redux/settingsActions";
import Spinner from "../Spinner/Spinner";

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
                <NavLink to={`/settings/position/${record.id}`}>Редактировать</NavLink>
                <Button danger>Удалить</Button>
            </Space>
        ),
    },
];
const PositionTable = () => {
    const dispatch = useDispatch();
    const positions = useSelector();
    const isLoad = useSelector(getSettingsLoader)
    useEffect(() => {
        dispatch(fetchPositions())
    }, [dispatch]);
    return (
        <>
            {isLoad ? <Spinner/> :
                <Table bordered title={() => <h4>Тематики</h4>} columns={columns} dataSource={positions}/>}
        </>
    );
};

export default PositionTable;
