import React, { useEffect } from "react";
import { Table, Button, Typography } from "antd";
import {
  getSettingsLoader,
  getTopics
} from "../../../containers/Settings/redux/settingGetters";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../../containers/Settings/redux/settingsActions";
import Spinner from "../../Spinner/Spinner";

const TopicsTable = ({ onShowEditor }) => {
  const dispatch = useDispatch();
  const topics = useSelector(getTopics);
  const isLoad = useSelector(getSettingsLoader);
  useEffect(() => {
    dispatch(fetchSettings("topics"));
  }, [dispatch]);
  // const saveEditableTopic = async () => {
  //   try {
  //     const values = await form.validateFields(); // храняться данные о редактируемых полях
  //     dispatch(fetchSettingUpdate("topics", { ...values }));
  //   } catch (errInfo) {
  //     console.log("Validate Failed:", errInfo);
  //   }
  // };
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
              <h4>Тематики</h4>
              <Button type={"primary"} onClick={onShowEditor}>
                Новая тематика
              </Button>
            </div>
          )}
          columns={columns}
          bordered={true}
          dataSource={topics}
        />
      )}
    </>
  );
};
export default TopicsTable;
