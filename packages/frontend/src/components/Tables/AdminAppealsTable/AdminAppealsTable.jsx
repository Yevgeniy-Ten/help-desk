import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Drawer, Popconfirm } from "antd";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getHourWork } from "../../../helpers/helpers";
import EditAppealForm from "../../CreateForms/EditAppealForm";
import {
  getTopics,
  getDepartments
} from "../../../containers/Settings/redux/settingGetters";
import {
  fetchAppeal,
  fetchPutAppeal,
  fetchDeleteAppeal
} from "../../../containers/Appeals/redux/appealActions";
import {
  getAppealCurrent,
  getAppealStateLoader
} from "../../../containers/Appeals/redux/appealGetters";
import { fetchAllUsers } from "../../../containers/AllUsers/redux/usersAction/usersActions";
import { getUsersState } from "../../../containers/AllUsers/redux/usersGetters/usersGetters";
import { fetchSettings } from "../../../containers/Settings/redux/settingsActions";
import { fetchAppeals } from "../../../containers/Appeals/redux/action/appealsAction";
import Spinner from "../../Spinner/Spinner";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const AdminAppealsTable = ({ appeals }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [appealId, setAppealId] = useState("");
  const [visible, setVisible] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const topics = useSelector(getTopics);
  const departments = useSelector(getDepartments);
  const { users } = useSelector(getUsersState, shallowEqual);
  const loading = useSelector(getAppealStateLoader);
  const appeal = useSelector(getAppealCurrent);
  const [state, setState] = useState({
    selectedRowKeys: [],
    selectedRows: []
  });
  const [dataEdit, setDataEdit] = useState({
    topics: null,
    appeal: null,
    departments: null,
    users: null
  });
  const editAppeal = (id) => {
    setAppealId(id);
    dispatch(fetchAppeal(id));
    const dataAppeal = {
      topics: topics,
      appeal: appeal,
      departments: departments,
      users: users
    };
    setDataEdit({ dataAppeal });
    setVisible(true);
    history.push(`/appeals/${id}/edit`);
  };
  const onChangeFields = (value) => {
    if (value.departmentId) {
      if (dataEdit.appeal && dataEdit.appeal.departmentId) {
        dispatch(fetchAllUsers({ departmentId: dataEdit.appeal.departmentId }));
      }
    }
  };
  const closeEditAppealFormDrawer = () => {
    setVisible(false);
    history.push(`/appeals`);
  };
  const onSaveAppeal = async (appeal) => {
    await dispatch(fetchPutAppeal(appealId, appeal));
    setVisible(false);
    await dispatch(fetchAppeals());
  };
  const onSelectRowChange = (selectedRowKeys, selectedRows) => {
    setState({ selectedRowKeys, selectedRows });
    if (selectedRows.length > 1) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  // eslint-disable-next-line consistent-return
  const handleDeleteAppeals = async (appeal) => {
    let appealsIdArray = [];
    if (appeal === "CheckedAppeals") {
      appealsIdArray = state.selectedRows;
      await dispatch(fetchDeleteAppeal(null, appealsIdArray));
      await dispatch(fetchAppeals());
      setBtnDisabled(true);
      // eslint-disable-next-line no-return-await
      return;
    }
    await dispatch(fetchDeleteAppeal(appeal.id, null));
    await dispatch(fetchAppeals());
  };
  useEffect(() => {
    dispatch(fetchSettings("topics"));
    dispatch(fetchSettings("departments"));
    if (appeal && appeal.departmentId) {
      dispatch(fetchAllUsers({ departmentId: appeal.departmentId }));
    }
  }, [dispatch]);
  const appealColumns = [
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        return a.createdAt.valueOf() > b.createdAt.valueOf();
      },
      render: (createdAt) => {
        return new Date(createdAt).toLocaleDateString();
      }
    },
    {
      title: "ID заявки",
      dataIndex: "id",
      key: "id",
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        return a.id - b.id;
      }
    },
    {
      title: "Заявка от",
      dataIndex: "clientRequest",
      key: "clientRequest",
      render: (creator) => {
        return `${creator.firstName} ${creator.lastName}`;
      }
    },
    {
      title: "От компании",
      dataIndex: "clientRequest",
      key: "clientRequest",
      // onFilter: (value, record) => {
      //   return record.clientRequest.company.indexOf(value) === 0;
      // },
      render: (clientRequest) => {
        return clientRequest.company ? clientRequest.company.title : null;
      }
    },
    {
      title: "Тематика",
      dataIndex: "topic",
      key: "topic",
      render: (topic) => {
        return topic.title;
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
      title: "Статус",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Открыто",
          value: "Открыто"
        },
        {
          text: "Выполняется",
          value: "Выполняется"
        },
        {
          text: "Приостановлено",
          value: "Приостановлено"
        },
        {
          text: "Выполнено",
          value: "Выполнено"
        }
      ],
      onFilter: (value, record) => {
        return record.status.indexOf(value) === 0;
      }
    },
    {
      title: "Ответственный отдел",
      dataIndex: "department",
      key: "department",
      render: (department) => {
        return department.title;
      }
    },
    {
      title: "Ответственный сотрудник",
      dataIndex: "employeeRequest",
      key: "employeeRequest",
      render: (employeeRequest) => {
        return employeeRequest
          ? `${employeeRequest.firstName} ${employeeRequest.lastName}`
          : null;
      }
    },
    {
      title: "Срок исполнения (часов)",
      dataIndex: "deadline",
      key: "deadline"
    },
    {
      title: "Затрачено (часов)",
      dataIndex: "hourWork",
      key: "hourWork",
      render: (hourWork) => {
        return getHourWork(hourWork);
      }
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <NavLink to={`/appeals/${record.id}`}>Детали</NavLink>
            <Button
              type="link"
              onClick={(id) => {
                return editAppeal(record.id);
              }}
            >
              Редактировать
            </Button>
            <Popconfirm
              title="Удалить, вы уверены?"
              onConfirm={() => {
                return handleDeleteAppeals(record);
              }}
            >
              <Button danger={true}>Удалить</Button>
            </Popconfirm>
          </Space>
        );
      }
    },
    {
      title: "Просмотрено",
      dataIndex: "isViewed",
      key: "isViewed",
      render: (isViewed) => {
        return isViewed ? (
          <EyeOutlined style={{ fontSize: "24px", color: "#99c578" }} />
        ) : (
          <EyeInvisibleOutlined
            style={{ fontSize: "24px", color: "#ff4d4f" }}
          />
        );
      }
    }
  ];
  const { selectedRowKeys } = state;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectRowChange
  };
  return (
    <>
      <Table
        rowSelection={rowSelection}
        scroll={{ x: 1100 }}
        columns={appealColumns}
        dataSource={appeals}
        rowKey={(record) => {
          return record.id;
        }}
        title={() => {
          return (
            <Popconfirm
              title="Удалить выбранные, вы уверены?"
              onConfirm={() => {
                return handleDeleteAppeals("CheckedAppeals");
              }}
              disabled={btnDisabled}
            >
              <Button danger={true} disabled={btnDisabled}>
                Удалить выбранные
              </Button>
            </Popconfirm>
          );
        }}
      />
      <Drawer
        width={640}
        title={`Заявка #${appealId}`}
        placement="right"
        closable={false}
        onClose={closeEditAppealFormDrawer}
        visible={visible}
        key="right"
        footer={
          <div
            style={{
              textAlign: "right"
            }}
          >
            <Button
              onClick={closeEditAppealFormDrawer}
              style={{ marginRight: 8 }}
              type="primary"
            >
              Отмена
            </Button>
          </div>
        }
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {appeal ? (
              <EditAppealForm
                appealFields={appeal}
                topics={topics}
                departments={departments}
                employees={users}
                onCloseEditAppealForm={closeEditAppealFormDrawer}
                onChangeFields={onChangeFields}
                onSaveAppeal={onSaveAppeal}
              />
            ) : (
              <p>Заявка не найдена</p>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default AdminAppealsTable;
