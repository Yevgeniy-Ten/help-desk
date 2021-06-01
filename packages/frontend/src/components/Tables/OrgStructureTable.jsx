import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { Button, Form, Popconfirm, Space, Table, Typography } from "antd";
import EditableCell from "../UI/EditableCeil";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditableElement,
  getOrgStructures,
  getDepartments,
  getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import { fetchSettings } from "../../containers/Settings/redux/settingsActions";

const OrgStructureTable = ({ onShowEditor }) => {
  const dispatch = useDispatch();
  const orgStructures = useSelector(getOrgStructures);
  const departments = useSelector(getDepartments);
  const isLoad = useSelector(getSettingsLoader);
  const [filtersDepartment, setFiltersDepartment] = useState([]);
  useEffect(() => {
    dispatch(fetchSettings("departments"));
    dispatch(fetchSettings("orgstructure"));
  }, [dispatch]);

  useMemo(() => {
    if (departments) {
      const departmentsCopy = departments.map((department) => {
        return { text: department.title, value: department.title };
      });
      setFiltersDepartment([...departmentsCopy]);
      console.log(filtersDepartment);
    }
  }, [departments]);
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
      filters: filtersDepartment,
      // eslint-disable-next-line consistent-return
      onFilter: (value, record) => {
        if (record.department) {
          return record.department.title.indexOf(value) === 0;
        }
      },
      render: (department) => {
        return department ? department.title : "null";
      }
    },
    {
      title: "Главный",
      dataIndex: "isMain",
      key: "isMain",
      filters: [
        {
          text: "Да",
          value: true
        },
        {
          text: "Нет",
          value: false
        }
      ],
      // eslint-disable-next-line consistent-return
      onFilter: (value, record) => {
        if (record.isMain === value) {
          return true;
        }
      },
      render: (isMain) => {
        return isMain ? "Да" : "Нет";
      }
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => {
        return (
          <Typography.Link
            title={record.position.title}
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
          title={() => {
            return (
              <div className="flex-between">
                <h4>Орг структура</h4>
                <Button type="primary" onClick={onShowEditor}>
                  Новая орг структура
                </Button>
              </div>
            );
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
