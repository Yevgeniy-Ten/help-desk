import React, {useEffect} from "react";
import {Button, Form, Popconfirm, Space, Table, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    clearEditalbleElement,
    fetchDepartments,
    fetchSettingUpdate,
    setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import {getDepartments, getEditableElement, getSettingsLoader} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";
import {getMergedColumns} from "../tableConstants";
import EditableCell from "../../UI/EditableCeil";

const DepartmentTable = () => {
    const dispatch = useDispatch();
    const departments = useSelector(getDepartments);
    const isLoad = useSelector(getSettingsLoader)
    const editableElement = useSelector(getEditableElement)
    const isEditing = (record) => editableElement ? record.id === editableElement.id : false;
    const [form] = Form.useForm();
    const edit = (record) => {
        form.setFieldsValue({...record})
        dispatch(setEditableSetting(record))
    }
    const cancel = () => dispatch(clearEditalbleElement())
    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);
    const saveEditableDepartment = async () => {
        try {
            const values = await form.validateFields(); // храняться данные о редактируемых полях
            dispatch(fetchSettingUpdate("departments", {...values}))
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
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
            editable: true
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
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={saveEditableDepartment}>
                            Сохранить изменения
                        </Button>
                        <Popconfirm title="Вы уверены?" onConfirm={cancel}>
                            <Button danger>Отмена</Button>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Typography.Link disabled={editableElement}
                                     onClick={() => edit(record)}>
                        Редактировать
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = getMergedColumns(columns, isEditing)
    return (
        <>
            {isLoad ? <Spinner/> :
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        title={() => <h4>Отделы</h4>}
                        bordered
                        dataSource={departments}
                        columns={mergedColumns}
                        pagination={{onChange: cancel}}
                    />
                </Form>}
        </>
    );
};

export default DepartmentTable;
