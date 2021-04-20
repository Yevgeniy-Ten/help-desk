import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { Button, Form, Popconfirm, Space, Table, Typography } from "antd";
import EditableCell from "../UI/EditableCeil";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditableElement,
  getOrgStructures,
  getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import { fetchSettings } from "../../containers/Settings/redux/settingsActions";

const OrgStructureTable = () => {
  const dispatch = useDispatch();
  const orgStructures = useSelector(getOrgStructures);
  const isLoad = useSelector(getSettingsLoader);
  console.log(orgStructures);
  useEffect(() => {
    dispatch(fetchSettings("orgstructure"));
  }, [dispatch]);
  const columns = [
    {
      title: "Идентификатор",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Должность",
      dataIndex: "position",
      key: "position",
      render: (position) => {
        return position ? position.title : "null";
      }
    },
    {
      title: "Отдел",
      dataIndex: "department",
      key: "department",
      render: (department) => {
        return department ? department.title : "null";
      }
    },
    {
      title: "Главный",
      dataIndex: "isMain",
      key: "isMain",
      render: (isMain) => {
        return isMain ? "Да" : "Нет";
      }
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => {
        return (
          <Space>
            <Button danger={true}>Удалить</Button>
          </Space>
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
          title={() => {
            return <h4>Орг структура</h4>;
          }}
          bordered={true}
          dataSource={orgStructures}
          columns={columns}
        />
      )}
    </>
  );
};

export default OrgStructureTable;
