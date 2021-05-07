import React, { useEffect } from "react";
import { Button, Table, Typography } from "antd";
import { fetchSettings } from "../../../containers/Settings/redux/settingsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  getEditableElement,
  getSettingsLoader
} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";
import EditableCell from "../../UI/EditableCeil";
import { getMergedColumns } from "../tableConstants";

const CompanyTables = ({ onShowEditor }) => {
  const dispatch = useDispatch();
  const companies = useSelector(getCompanies);
  const isLoad = useSelector(getSettingsLoader);

  useEffect(() => {
    dispatch(fetchSettings("companies"));
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
      editable: true
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
              <h4>Компании</h4>
              <Button type={"primary"} onClick={onShowEditor}>
                Новая компания
              </Button>
            </div>
          )}
          columns={columns}
          bordered={true}
          dataSource={companies}
        />
      )}
    </>
  );
};

export default CompanyTables;
