import React, {useEffect} from "react";
import {Table, Form, Typography, Popconfirm, Button, Space} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {getEditableElement, getPositions, getSettingsLoader} from "../../containers/Settings/redux/settingGetters";
import {
    clearEditalbleElement,
    fetchPositions, fetchSettingUpdate,
    setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import Spinner from "../Spinner/Spinner";
import EditableCell from "../UI/EditableCeil";
import {getMergedColumns} from "./tableConstants";


const PositionTable = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const positions = useSelector(getPositions);
    const isLoad = useSelector(getSettingsLoader)
    const editableElement = useSelector(getEditableElement)
    const isEditing = (record) => editableElement ? record.id === editableElement.id : false;
    const edit = (record) => {
        form.setFieldsValue({...record})
        dispatch(setEditableSetting(record))
    }
    const cancel = () => dispatch(clearEditalbleElement())
    useEffect(() => {
        dispatch(fetchPositions())
    }, [dispatch]);
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
            editable: true, // дает определять редактируемое поле или нет
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
            <Button onClick={saveEditablePosition}>
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

    const saveEditablePosition = async () => {
        try {
            const values = await form.validateFields(); // храняться данные о редактируемых полях
            dispatch(fetchSettingUpdate("position", {...values}))
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
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
                        dataSource={positions}
                        columns={mergedColumns}
                        pagination={{onChange: cancel}}
                    />
                </Form>}
        </>
    );
}

export default PositionTable;
