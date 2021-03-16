import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./App";
import "antd/dist/antd.css";
import { store, history } from "./store/configStore";
import 'antd/dist/antd.css';
import { ConnectedRouter } from "connected-react-router";

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
)
ReactDOM.render(
    <React.StrictMode>
        {app}
    </React.StrictMode>,
    document.getElementById("root")
);

