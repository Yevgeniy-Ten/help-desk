import React, { useEffect } from "react";
import { Button, Form, Popconfirm, Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEditalbleElement,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import {
  getDepartments,
  getEditableElement,
  getSettingsLoader
} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";
import { getMergedColumns } from "../tableConstants";
import EditableCell from "../../UI/EditableCeil";

const DepartmentTable = ({ onShowEditor }) => {
  const dispatch = useDispatch();
  const departments = useSelector(getDepartments);
  const isLoad = useSelector(getSettingsLoader);
  useEffect(() => {
    dispatch(fetchSettings("departments"));
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
      editable: true
    },
    {
      title: "Сотрудников",
      dataIndex: "employees",
      key: "employees",
      render: (employess) => {
        return employess || 0;
      }
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => {
        return (
          <Typography.Link
            onClick={() => {
              return onShowEditor(record.id);
            }}
          >
            Редактировать
          </Typography.Link>
        );
      }
    }
  ];

  return (
    <>
      {isLoad ? (
        <Spinner />
      ) : (
        <Table
          title={() => (
            <div className={"flex-between"}>
              <h4>Отделы</h4>
              <Button type={"primary"} onClick={onShowEditor}>
                Новый отдел
              </Button>
            </div>
          )}
          bordered={true}
          dataSource={departments}
          columns={columns}
        />
      )}
    </>
  );
};

export default DepartmentTable;
