import React, { useState } from "react";
import {Breadcrumb, Col, Row} from "antd";
import {Switch, Route, Redirect} from "react-router-dom"
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
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    } from '@ant-design/icons';

const Settings = () => {
    const [collapsed, setCollapsed] = useState(false)
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    
    return (
        <Row style={{padding: "10px 20px"}}>
            <Col span={24} className={"mb-sm"}>
                <Breadcrumb>
                    <Breadcrumb.Item>Справочники:</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            {/* <Col span={17}>
                <Switch>
                    <Route path={"/settings/topics"} component={TopicsTable}/>
                    <Route path={"/settings/companies"} component={CompanyTables}/>
                    <Route path={"/settings/reglaments"} component={ReglamentsTable}/>
                    <Route path={"/settings/departments"} component={DepartmentTable}/>
                    <Route path={"/settings/positions"} component={PositionTable}/>
                    <Route path={"/settings/orgstructure"} component={OrgStructureTable}/>
                    <Redirect to={"/settings/topics"}/>
                </Switch>
            </Col>
            <Col push={1} span={5}>
                <SettingsFilter/>
            </Col> */}
            <Col span={!collapsed ? 23 : 18}>
                <Switch>
                    <Route path={"/settings/topics"} component={TopicsTable}/>
                    <Route path={"/settings/companies"} component={CompanyTables}/>
                    <Route path={"/settings/reglaments"} component={ReglamentsTable}/>
                    <Route path={"/settings/departments"} component={DepartmentTable}/>
                    <Route path={"/settings/positions"} component={PositionTable}/>
                    <Route path={"/settings/orgstructure"} component={OrgStructureTable}/>
                    <Redirect to={"/settings/topics"}/>
                </Switch>
            </Col>
            <Col span={0.5} className="p-2" >
                {collapsed ? 
                <MenuUnfoldOutlined onClick={toggle} className="filter-icon"/> : 
                <MenuFoldOutlined onClick={toggle} className="filter-icon"/>}
            </Col>
            <Col 
            span={!collapsed ? 0 : 5}
            >
                <SettingsFilter/>
            </Col>
            <Col span={24}>
                <Switch>
                    <Route path={"/settings/topics"} component={TopicForm}/>
                    <Route path={"/settings/companies"} component={CompanyForm}/>
                    <Route path={"/settings/reglaments"} component={ReglamentForm}/>
                    <Route path={"/settings/departments"} component={DepartmentForm}/>
                    <Route path={"/settings/positions"} component={PositionForm}/>
                    <Route path={"/settings/orgstructure"} component={OrgStructureForm}/>
                    <Redirect to={"/settings/topics"}/>
                </Switch>
            </Col>
        </Row>
    );
};

export default Settings;
