import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Drawer } from "antd";
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
  fetchPutAppeal
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

const AdminAppealsTable = ({ appeals }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [appealId, setAppealId] = useState("");
  const [visible, setVisible] = useState(false);
  const topics = useSelector(getTopics);
  const departments = useSelector(getDepartments);
  const { users } = useSelector(getUsersState, shallowEqual);
  const loading = useSelector(getAppealStateLoader);
  const appeal = useSelector(getAppealCurrent);
  const [state, setState] = useState({
    selectedRowKeys: []
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
  };
  const onSaveAppeal = async (appeal) => {
    await dispatch(fetchPutAppeal(appealId, appeal));
    setVisible(false);
    await dispatch(fetchAppeals());
  };
  const onSelectRowChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    setState({ selectedRowKeys });
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
      render: (createdAt) => {
        return new Date(createdAt).toLocaleDateString();
      }
    },
    {
      title: "ID заявки",
      dataIndex: "id",
      key: "id"
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
      key: "status"
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
      title: "Ответствейнный сотрудник",
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
            <Button danger={true}>Удалить</Button>
          </Space>
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
