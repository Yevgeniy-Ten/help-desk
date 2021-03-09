import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import reduxThunk from "redux-thunk";
import {instance as axios} from "../constants";
import userReducer from "../containers/Auth/redux/reducer/userReducer";

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({

    user: userReducer,
    router: connectRouter(history),
});
const middlewares = [
    reduxThunk.withExtraArgument(axios),
    routerMiddleware(history),
];


const enhancers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancers);
axios.interceptors.request.use(config => {
    try {
        config.headers["Authorization"] = store.getState().user.user.token;
    } catch (e) {
        // user non authorized
    }
    return config;
});

export default store;