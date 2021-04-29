import React, { useEffect } from "react";
import { Table, Form, Typography, Popconfirm, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditableElement,
  getPositions,
  getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import {
  clearEditalbleElement,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../containers/Settings/redux/settingsActions";
import Spinner from "../Spinner/Spinner";
import EditableCell from "../UI/EditableCeil";
import { getMergedColumns } from "./tableConstants";

const PositionTable = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const positions = useSelector(getPositions);
  const isLoad = useSelector(getSettingsLoader);

  useEffect(() => {
    dispatch(fetchSettings("position"));
  }, [dispatch]);

  const columns = [
    {
      title: "Идентификатор",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      editable: true // дает определять редактируемое поле или нет
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button onClick={saveEditablePosition}>Сохранить изменения</Button>
            <Popconfirm title="Вы уверены?" onConfirm={cancel}>
              <Button danger={true}>Отмена</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Typography.Link
            disabled={editableElement}
            onClick={() => {
              return edit(record);
            }}
          >
            Редактировать
          </Typography.Link>
        );
      }
    }
  ];

  const mergedColumns = getMergedColumns(columns, isEditing);
  return (
    <>
      {isLoad ? (
        <Spinner />
      ) : (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            title={() => {
              return <h4>Должности</h4>;
            }}
            bordered={true}
            dataSource={positions}
            columns={mergedColumns}
            pagination={{ onChange: cancel }}
          />
        </Form>
      )}
    </>
  );
};

export default PositionTable;
