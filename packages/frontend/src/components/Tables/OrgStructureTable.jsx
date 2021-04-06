import React, {useEffect} from "react";
import Spinner from "../Spinner/Spinner";
import {Button, Form, Popconfirm, Space, Table, Typography} from "antd";
import EditableCell from "../UI/EditableCeil";
import {useDispatch, useSelector} from "react-redux";
import {
    getEditableElement,
    getOrgStructures,
    getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import {
    fetchSettings,
} from "../../containers/Settings/redux/settingsActions";

const OrgStructureTable = () => {
    const dispatch = useDispatch();
    const orgStructures = useSelector(getOrgStructures);
    const isLoad = useSelector(getSettingsLoader)
    console.log(orgStructures)
    useEffect(() => {
        dispatch(fetchSettings("orgstructure"))
    }, [dispatch]);
    const columns = [
        {
            title: "Идентификатор",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Должность",
            dataIndex: "position",
            key: "position",
        },
        {
            title: "Отдел",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Главный",
            dataIndex: "isMain",
            key: "isMain",
            render: (isMain) => isMain ? "Да" : "Нет"
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => {
                return (
                    <Space>
                        <Button danger>Удалить</Button>
                    </Space>
                )
            },
        },
    ];

    return (
        <>
            {isLoad ? <Spinner/> :
                <Table
                    title={() => <h4>Орг структура</h4>}
                    bordered
                    dataSource={orgStructures}
                    columns={columns}
                />}
        </>
    );
};

export default OrgStructureTable;
