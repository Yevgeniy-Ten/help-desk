import React from "react";
import {Route, Switch} from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import {Row, Col} from "antd"

const Auth = () => {

    return (
        <Row style={{padding: "40px 0"}}>
            <Col span={16} push={4}>
                <Switch>
                    <Route exact path="/auth" component={Login}/>
                    <Route exact path="/auth/register" component={Register}/>
                </Switch>
            </Col>
        </Row>
    );
};

export default Auth;
