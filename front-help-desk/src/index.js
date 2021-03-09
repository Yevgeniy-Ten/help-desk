import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import store, {history} from "./store/configStore";
import 'antd/dist/antd.css';

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
)
ReactDOM.render(
    app,
    document.getElementById("root")
);