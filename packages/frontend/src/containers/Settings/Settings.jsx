import React, { useState } from "react";
import { Breadcrumb, Col, Drawer, Row } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import TopicForm from "../../components/SettingsForm/TopicForm";
import CompanyForm from "../../components/SettingsForm/CompanyForm";
import ReglamentForm from "../../components/SettingsForm/ReglamentForm";
import DepartmentForm from "../../components/SettingsForm/DepartmentForm";
import TopicsTable from "../../components/Tables/TopicsTable/TopicsTable";
import CompanyTables from "../../components/Tables/CompanyTables/CompanyTables";
import ReglamentsTable from "../../components/Tables/ReglamentsTable/ReglamentsTable";
import DepartmentTable from "../../components/Tables/DepartmentTable/DepartmentTable";
import SettingsFilter from "../../components/SettingsFilter/SettingsFilter";
import PositionTable from "../../components/Tables/PositionTable";
import PositionForm from "../../components/SettingsForm/PositionForm";
import OrgStructureTable from "../../components/Tables/OrgStructureTable";
import OrgStructureForm from "../../components/SettingsForm/OrgStructureForm";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useToggle } from "../../hooks/useToggle";
import { clearEditalbleElement } from "./redux/settingsActions";
import { useDispatch } from "react-redux";

const Settings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [settingTypeIsOpen, setSettingTypeIsOpen] = useState({
    type: null,
    idForEdit: null
  });
  const [drawerIsOpen, toggleDrawerIsOpen] = useToggle(false);
  const onShowSettingEditor = (type, idForEdit) => {
    setSettingTypeIsOpen({
      type,
      idForEdit
    });
    toggleDrawerIsOpen();
  };
  const closeDrawerWithResetSettingFields = () => {
    dispatch(clearEditalbleElement());
    setSettingTypeIsOpen({
      type: null,
      idForEdit: null
    });
    toggleDrawerIsOpen();
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Row style={{ padding: "10px 20px" }}>
      <Col span={24} className="mb-sm">
        <Breadcrumb>
          <Breadcrumb.Item>Справочники:</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col span={!collapsed ? 23 : 18}>
        <Switch>
          <Route
            path="/settings/topics"
            render={(props) => (
              <TopicsTable
                {...props}
                onShowEditor={(idForEdit) =>
                  onShowSettingEditor("topics", idForEdit)
                }
              />
            )}
          />
          <Route
            path="/settings/companies"
            render={(props) => (
              <CompanyTables
                {...props}
                onShowEditor={(idForEdit) =>
                  onShowSettingEditor("companies", idForEdit)
                }
              />
            )}
          />
          <Route
            path="/settings/reglaments"
            render={(props) => (
              <ReglamentsTable
                {...props}
                onShowEditor={(idForEdit) =>
                  onShowSettingEditor("reglaments", idForEdit)
                }
              />
            )}
          />
          <Route
            path="/settings/departments"
            render={(props) => (
              <DepartmentTable
                {...props}
                onShowEditor={(idForEdit) =>
                  onShowSettingEditor("departments", idForEdit)
                }
              />
            )}
          />
          <Route
            path="/settings/positions"
            render={(props) => (
              <PositionTable
                {...props}
                onShowEditor={(idForEdit) =>
                  onShowSettingEditor("positions", idForEdit)
                }
              />
            )}
          />
          <Route
            path="/settings/orgstructure"
            render={(props) => (
              <OrgStructureTable
                {...props}
                onShowEditor={(idForEdit) =>
                  onShowSettingEditor("orgstructures", idForEdit)
                }
              />
            )}
          />
          <Redirect to="/settings/topics" />
        </Switch>
      </Col>
      <Col span={0.5} className="p-2">
        {collapsed ? (
          <MenuUnfoldOutlined onClick={toggle} className="filter-icon" />
        ) : (
          <MenuFoldOutlined onClick={toggle} className="filter-icon" />
        )}
      </Col>
      <Col span={!collapsed ? 0 : 5}>
        <SettingsFilter />
      </Col>
      <Col span={24}>
        <Drawer
          title="Форма"
          width={500}
          placement="right"
          closable={true}
          onClose={closeDrawerWithResetSettingFields}
          visible={drawerIsOpen}
        >
          {settingTypeIsOpen.type === "topics" && (
            <TopicForm
              onCloseEditor={toggleDrawerIsOpen}
              topicId={settingTypeIsOpen.idForEdit}
            />
          )}
          {settingTypeIsOpen.type === "companies" && (
            <CompanyForm
              onCloseEditor={toggleDrawerIsOpen}
              companyId={settingTypeIsOpen.idForEdit}
            />
          )}
          {settingTypeIsOpen.type === "positions" && (
            <PositionForm
              onCloseEditor={toggleDrawerIsOpen}
              positionId={settingTypeIsOpen.idForEdit}
            />
          )}
          {settingTypeIsOpen.type === "departments" && (
            <DepartmentForm
              onCloseEditor={toggleDrawerIsOpen}
              departmentId={settingTypeIsOpen.idForEdit}
            />
          )}
          {settingTypeIsOpen.type === "reglaments" && (
            <ReglamentForm
              onCloseEditor={toggleDrawerIsOpen}
              reglamentId={settingTypeIsOpen.idForEdit}
            />
          )}
          {settingTypeIsOpen.type === "orgstructures" && (
            <OrgStructureForm
              onCloseEditor={toggleDrawerIsOpen}
              orgstructureId={settingTypeIsOpen.idForEdit}
            />
          )}
        </Drawer>
      </Col>
    </Row>
  );
};

export default Settings;
