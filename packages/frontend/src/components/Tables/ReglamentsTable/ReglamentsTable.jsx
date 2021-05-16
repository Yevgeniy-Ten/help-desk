import React, { useEffect, useState, useMemo } from "react";
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
  getCompanies,
  getDepartments,
  getTopics,
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
  const companies = useSelector(getCompanies);
  const departments = useSelector(getDepartments);
  const topics = useSelector(getTopics);
  const isLoad = useSelector(getSettingsLoader);
  const [filtersCompany, setFiltersCompany] = useState([]);
  const [filtersDepartment, setFiltersDepartment] = useState([]);
  const [filtersTopics, setFiltersTopics] = useState([]);
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
      key: "company",
      filters: filtersCompany,
      // eslint-disable-next-line consistent-return
      onFilter: (value, record) => {
        if (record.company) {
          return record.company.title.indexOf(value) === 0;
        }
        return record.company === null;
      },
      render: (company) => {
        return company ? company.title : "Регламент по умолчанию";
      }
    },
    {
      title: "Тематика",
      dataIndex: "topic",
      key: "topic",
      filters: filtersTopics,
      // eslint-disable-next-line consistent-return
      onFilter: (value, record) => {
        if (record.topic) {
          return record.topic.title.indexOf(value) === 0;
        }
      },
      render: (topic) => {
        return topic ? topic.title : "null";
      }
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      key: "priority",
      filters: [
        {
          text: "Стандартно",
          value: "Стандартно"
        },
        {
          text: "Средний",
          value: "Средний"
        },
        {
          text: "Срочно",
          value: "Срочно"
        },
        {
          text: "Критично",
          value: "Критично"
        }
      ],
      onFilter: (value, record) => {
        return record.priority.indexOf(value) === 0;
      },
      sorter: (a, b) => {
        return a.priority.length - b.priority.length;
      },
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
    dispatch(fetchSettings("companies"));
    dispatch(fetchSettings("departments"));
    dispatch(fetchSettings("topics"));
  }, [dispatch]);
  useMemo(() => {
    if (companies) {
      let companiesCopy = [];
      companiesCopy = companies.map((company) => {
        return { text: company.title, value: company.title };
      });
      companiesCopy.unshift({
        text: "По умолчанию",
        value: "Регламент по умолчанию"
      });
      setFiltersCompany([...companiesCopy]);
    }
    if (departments) {
      const departmentsCopy = departments.map((department) => {
        return { text: department.title, value: department.title };
      });
      setFiltersDepartment([...departmentsCopy]);
    }
    if (topics) {
      const topicsCopy = topics.map((topic) => {
        return { text: topic.title, value: topic.title };
      });
      setFiltersTopics([...topicsCopy]);
    }
  }, [companies, departments, topics]);
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
