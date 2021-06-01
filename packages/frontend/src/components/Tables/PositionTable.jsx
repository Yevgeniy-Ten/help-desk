import React, { useEffect } from "react";
import { Table, Form, Typography, Popconfirm, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getPositions,
  getSettingsLoader
} from "../../containers/Settings/redux/settingGetters";
import { fetchSettings } from "../../containers/Settings/redux/settingsActions";
import Spinner from "../Spinner/Spinner";

const PositionTable = ({ onShowEditor }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const positions = useSelector(getPositions);
  const isLoad = useSelector(getSettingsLoader);

  useEffect(() => {
    dispatch(fetchSettings("position"));
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
      editable: true // дает определять редактируемое поле или нет
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => {
        return (
          <Typography.Link
            title={record.title}
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
        <Form form={form} component={false}>
          <Table
            title={() => {
              return (
                <div className="flex-between">
                  <h4>Должности</h4>
                  <Button type="primary" onClick={onShowEditor}>
                    Новая должность
                  </Button>
                </div>
              );
            }}
            columns={columns}
            bordered={true}
            dataSource={positions}
          />
        </Form>
      )}
    </>
  );
};

export default PositionTable;
