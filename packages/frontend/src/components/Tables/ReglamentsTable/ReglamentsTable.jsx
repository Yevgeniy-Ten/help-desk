import React, { useEffect, useState } from "react";
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

const ReglamentsTable = ({
  onShowEditor,
  onChangeCurrentPage,
  currentPage
}) => {
  const dispatch = useDispatch();
  const reglaments = useSelector(getReglaments);
  const isLoad = useSelector(getSettingsLoader);
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
      dataIndex: "company",
      render: (company) => {
        return company ? company.title : "Регламент по умолчанию";
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
        return (
          <Typography.Link
            id={record.id}
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
  useEffect(() => {
    dispatch(fetchSettings("reglaments"));
  }, [dispatch]);
  return (
    <>
      {isLoad ? (
        <Spinner />
      ) : (
        <Table
          title={() => {
            return (
              <div className="flex-between">
                <h4>Регламенты</h4>
                <Button type="primary" onClick={onShowEditor}>
                  Новый регламент
                </Button>
              </div>
            );
          }}
          bordered={true}
          columns={columns}
          pagination={{
            defaultCurrent: currentPage,
            onChange: (current) => {
              return onChangeCurrentPage(current);
            }
          }}
          dataSource={reglaments}
          scroll={{ x: 1000 }}
        />
      )}
    </>
  );
};
export default ReglamentsTable;
