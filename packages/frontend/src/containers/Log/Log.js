import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "./redux/logActions";
import { getLog } from "./redux/logGetter";
import { Table } from "antd";
import Spinner from "../../components/Spinner/Spinner";

const Log = () => {
  const dispatch = useDispatch();
  const { logs, loading } = useSelector(getLog, shallowEqual);
  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);
  const logsColumns = [
    {
      title: "Тип активности",
      dataIndex: "actionType",
      key: "actionType"
    },
    {
      title: "Пользователь",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description"
    }
  ];
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Table
          title={() => {
            return (
              <>
                <h3>Логи</h3>
              </>
            );
          }}
          style={{ padding: "10px 20px" }}
          bordered={true}
          columns={logsColumns}
          dataSource={logs}
        />
      )}
    </>
  );
};

export default Log;
