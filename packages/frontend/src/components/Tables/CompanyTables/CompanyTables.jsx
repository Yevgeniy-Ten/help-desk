import React, { useEffect } from "react";
import { Button, Form, Popconfirm, Space, Table, Typography } from "antd";
import {
  clearEditalbleElement,
  fetchCompanies,
  fetchSettings,
  fetchSettingUpdate,
  setEditableSetting
} from "../../../containers/Settings/redux/settingsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  getEditableElement,
  getSettingsLoader
} from "../../../containers/Settings/redux/settingGetters";
import Spinner from "../../Spinner/Spinner";
import EditableCell from "../../UI/EditableCeil";
import { getMergedColumns } from "../tableConstants";

const CompanyTables = () => {
  const dispatch = useDispatch();
  const companies = useSelector(getCompanies);
  const isLoad = useSelector(getSettingsLoader);
  const editableElement = useSelector(getEditableElement);
  const isEditing = (record) => {
    return editableElement ? record.id === editableElement.id : false;
  };
  const [form] = Form.useForm();
  const edit = (record) => {
    form.setFieldsValue({ ...record });
    dispatch(setEditableSetting(record));
  };
  const cancel = () => {
    return dispatch(clearEditalbleElement());
  };
  useEffect(() => {
    dispatch(fetchSettings("companies"));
  }, [dispatch]);
  const saveEditableCompany = async () => {
    try {
      const values = await form.validateFields(); // храняться данные о редактируемых полях
      dispatch(fetchSettingUpdate("companies", { ...values }));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
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
    // {
    //     title: "Сотрудников",
    //     dataIndex: "employees",
    //     key: "employees",
    //     render: (employess) => employess ? employess : 0
    // },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button onClick={saveEditableCompany}>Сохранить изменения</Button>
            <Popconfirm title="Вы уверены?" onConfirm={cancel}>
              <Button danger={true}>Отмена</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Typography.Link
            disabled={editableElement}
            onClick={() => {
              return edit(record);
            }}
          >
            Редактировать
          </Typography.Link>
        );
      }
    }
  ];
  const mergedColumns = getMergedColumns(columns, isEditing);
  return (
    <>
      {isLoad ? (
        <Spinner />
      ) : (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            title={() => {
              return <h4>Компании</h4>;
            }}
            bordered={true}
            dataSource={companies}
            columns={mergedColumns}
            pagination={{ onChange: cancel }}
          />
        </Form>
      )}
    </>
  );
};

export default CompanyTables;
