import React, {useEffect} from "react";
import {Table, Space, Button, Form, Popconfirm, Typography} from "antd"
import {getEditableElement, getSettingsLoader, getTopics} from "../../../containers/Settings/redux/settingGetters";
import {useDispatch, useSelector} from "react-redux";
import {
    clearEditalbleElement,
    fetchSettingUpdate,
    fetchTopics,
    setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import Spinner from "../../Spinner/Spinner";
import EditableCell from "../../UI/EditableCeil";
import {getMergedColumns} from "../tableConstants";


const TopicsTable = () => {
    const dispatch = useDispatch();
    const topics = useSelector(getTopics);
    const isLoad = useSelector(getSettingsLoader)
    const [form] = Form.useForm();
    const editableElement = useSelector(getEditableElement)
    const isEditing = (record) => editableElement ? record.id === editableElement.id : false;
    const edit = (record) => {
        form.setFieldsValue({...record})
        dispatch(setEditableSetting(record))
    }
    const cancel = () => dispatch(clearEditalbleElement())
    useEffect(() => {
        dispatch(fetchTopics());
    }, [dispatch]);
    const saveEditableTopic = async () => {
        try {
            const values = await form.validateFields(); // храняться данные о редактируемых полях
            dispatch(fetchSettingUpdate("topics", {...values}))
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
            title: "Действия",
            key: "actions",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={saveEditableTopic}>
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
                        title={() => <h4>Должности</h4>}
                        bordered
                        dataSource={topics}
                        columns={mergedColumns}
                        pagination={{onChange: cancel}}
                    />
                </Form>}
        </>
    );
};

export default TopicsTable;
