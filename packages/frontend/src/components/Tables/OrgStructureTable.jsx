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

const OrgStructureTable = ({ onShowEditor }) => {
  const dispatch = useDispatch();
  const orgStructures = useSelector(getOrgStructures);
  const isLoad = useSelector(getSettingsLoader);

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
          <Typography.Link onClick={() => onShowEditor(record.id)}>
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
              <h4>Орг структура</h4>
              <Button type={"primary"} onClick={onShowEditor}>
                Новая орг структура
              </Button>
            </div>
          )}
          bordered={true}
          dataSource={orgStructures}
          columns={columns}
        />
      )}
    </>
  );
};

export default OrgStructureTable;
