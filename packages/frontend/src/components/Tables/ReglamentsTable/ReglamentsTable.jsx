import React, {useEffect} from "react";
import {Button, Form, Popconfirm, Space, Table, Typography} from "antd";
import {
    clearEditalbleElement,
    fetchReglaments, fetchSettings,
    fetchSettingUpdate,
    setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import {useDispatch, useSelector} from "react-redux";
import {getEditableElement, getReglaments, getSettingsLoader} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";
import EditableCell from "../../UI/EditableCeil";
import {getMergedColumns} from "../tableConstants";


const ReglamentsTable = () => {
    const dispatch = useDispatch();
    const reglaments = useSelector(getReglaments);
    const isLoad = useSelector(getSettingsLoader)
    const editableElement = useSelector(getEditableElement)
    const isEditing = (record) => editableElement ? record.id === editableElement.id : false;
    const [form] = Form.useForm();
    const edit = (record) => {
        form.setFieldsValue({...record})
        dispatch(setEditableSetting(record))
    }
    const cancel = () => dispatch(clearEditalbleElement())
    const saveEditableReglament = async () => {
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
            title: "Компания",
            dataIndex: "copmanyRules",
            key: "copmanyRules",
            render: copmanyRules => copmanyRules.title
        },
        {
            title: "Срок исполнения",
            dataIndex: "deadline",
            key: "deadline",
            editable: true
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={saveEditableReglament}>
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
    useEffect(() => {
        dispatch(fetchSettings("reglaments"));
    }, [dispatch]);
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
                        title={() => <h4>Регламенты</h4>}
                        bordered
                        columns={mergedColumns}
                        dataSource={reglaments}
                        scroll={{x: 1000}}
                        pagination={{onChange: cancel}}
                    />
                </Form>}
        </>
    );
};

export default ReglamentsTable;
