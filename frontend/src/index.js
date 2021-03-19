import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { store, history } from "./store/configStore";
import App from "./containers/App/App";
import AnonymMenu from "./containers/Header/AnonymMenu/AnonymMenu";
import AuthMenu from "./containers/Header/AuthMenu/AuthMenu";

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

