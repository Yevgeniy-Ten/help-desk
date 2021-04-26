import React, { useEffect } from "react";
import { Button, Form, Popconfirm, Space, Table, Typography, Tag } from "antd";
import {
  clearEditalbleElement,
  fetchReglaments,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditableElement,
  getReglaments,
  getSettingsLoader
} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";
import EditableCell from "../../UI/EditableCeil";
import { getMergedColumns } from "../tableConstants";

const ReglamentsTable = () => {
  const dispatch = useDispatch();
  const reglaments = useSelector(getReglaments);
  const isLoad = useSelector(getSettingsLoader);
  const editableElement = useSelector(getEditableElement);
  const isEditing = (record) => {
    return editableElement ? record.id === editableElement.id : false;
  };
  const [form] = Form.useForm();
  const edit = (record) => {
    form.setFieldsValue({ ...record });
    dispatch(setEditableSetting(record));
  };
  const cancel = () => {
    return dispatch(clearEditalbleElement());
  };
  const saveEditableReglament = async () => {
    try {
      const values = await form.validateFields(); // храняться данные о редактируемых полях
      console.log(values);
      dispatch(fetchSettingUpdate("reglaments", { ...values }));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
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
      editable: true
    },
    {
      title: "Компания",
      dataIndex: "copmany",
      key: "copmany",
      render: (copmany) => {
        return copmany ? copmany.title : "null";
      }
    },
    {
      title: "Тематика",
      dataIndex: "topic",
      key: "topic",
      render: (topic) => {
        return topic ? topic.title : "null";
      }
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let color = "green";
        if (priority === "Срочно") {
          color = "gold";
        } else if (priority === "Средний") {
          color = "cyan";
        } else if (priority === "Критично") {
          color = "red";
        }
        // eslint-disable-next-line react/destructuring-assignment
        return <Tag color={color}>{priority.toUpperCase()}</Tag>;
      }
    },
    {
      title: "Ответственный отдел",
      dataIndex: "department",
      key: "department",
      render: (department) => {
        return department ? department.title : "null";
      }
    },

    {
      title: "Срок исполнения (часов)",
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
            <Button onClick={saveEditableReglament}>Сохранить изменения</Button>
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
  useEffect(() => {
    dispatch(fetchSettings("reglaments"));
  }, [dispatch]);
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
              return <h4>Регламенты</h4>;
            }}
            bordered={true}
            columns={mergedColumns}
            dataSource={reglaments}
            scroll={{ x: 1000 }}
            pagination={{ onChange: cancel }}
          />
        </Form>
      )}
    </>
  );
};

export default ReglamentsTable;
