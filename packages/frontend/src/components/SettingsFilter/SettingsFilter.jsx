import React, { useEffect, useMemo } from "react";
import { Button, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { fetchSettings } from "../../containers/Settings/redux/settingsActions";
import { getTopics } from "../../containers/Settings/redux/settingGetters";
import { getUser } from "../../containers/Auth/redux/getters/getters";

const { Option } = Select;
const SettingsFilter = ({ paramFilter, onShowEditor }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [form] = Form.useForm();
  const topics = useSelector(getTopics);

  useEffect(() => {
    dispatch(fetchSettings("topics"));
  }, [dispatch]);

  // eslint-disable-next-line consistent-return
  const onChangeSelect = (value) => {
    const strIncludes = String(value);
    if (strIncludes.includes("settings")) {
      return setTimeout(() => {
        dispatch(push(value));
      }, 700);
    }
  };
  return (
    <Form form={form} name="form-filter" layout="vertical">
      {!paramFilter && <h3>Фильтр</h3>}
      {!paramFilter && <hr />}
      <div style={{ marginBottom: "20px" }}>
        {user && user.roleId === 1 && (
          <Button
            onClick={() => {
              console.log("test");
              onShowEditor();
              // dispatch(fetchGetFile());
            }}
          >
            Создать решение
          </Button>
        )}
      </div>
      <Form.Item name="status" label={paramFilter ? "Фильтр: " : "По статусу"}>
        {paramFilter ? (
          <>
            <div>
              <Select
                placeholder="Тематика FAQ"
                defaultValue={1}
                name="topics"
                onChange={onChangeSelect}
              >
                {topics &&
                  topics.map((topic) => {
                    return <Option value={topic.id}>{topic.title}</Option>;
                  })}
              </Select>
            </div>
          </>
        ) : (
          <Select
            placeholder="Справочник"
            defaultValue="/settings/topics"
            name="setting"
            onChange={onChangeSelect}
          >
            <Option value="/settings/topics">По тематикам</Option>
            <Option value="/settings/companies">По компаниям</Option>
            <Option value="/settings/reglaments">По регламенту</Option>
            <Option value="/settings/departments">По отделу</Option>
            <Option value="/settings/positions">По должностям</Option>
            <Option value="/settings/orgstructure">По орг. структуре</Option>
            <Option value="/settings/mailmessage">По рассылкам</Option>
          </Select>
        )}
      </Form.Item>
    </Form>
  );
};

export default SettingsFilter;
