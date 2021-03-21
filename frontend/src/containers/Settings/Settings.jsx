import React, {useState} from "react";
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

const Settings = () => {

    return (
        <Row style={{padding: "10px 20px"}}>
            <Col span={24} className={"mb-sm"}>
                <Breadcrumb>
                    <Breadcrumb.Item>Справочники:</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={17}>
                <Switch>
                    <Route path={"/settings/topics"} component={TopicsTable}/>
                    <Route path={"/settings/companies"} component={CompanyTables}/>
                    <Route path={"/settings/reglaments"} component={ReglamentsTable}/>
                    <Route path={"/settings/departments"} component={DepartmentTable}/>
                    <Redirect to={"/settings/topics"}/>
                </Switch>
            </Col>
            <Col push={1} span={5}>
                <SettingsFilter/>
            </Col>
            <Col span={24}>
                <Switch>
                    <Route path={"/settings/topics"} component={TopicForm}/>
                    <Route path={"/settings/companies"} component={CompanyForm}/>
                    <Route path={"/settings/reglaments"} component={ReglamentForm}/>
                    <Route path={"/settings/departments"} component={DepartmentForm}/>
                    <Redirect to={"/settings/topics"}/>
                </Switch>
            </Col>
        </Row>
    );
};

export default Settings;