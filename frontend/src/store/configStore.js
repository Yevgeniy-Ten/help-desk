import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { instance as axios } from "../constants";
import appealsReducer from "../containers/Appeals/redux/reducer/appealsReducer";
import ticketsReducer from "../containers/Tickets/redux/reducer/ticketsReducer";
import userReducer from "../containers/Auth/redux/reducer/userReducer";
import topicsReducer from "../containers/Appeals/redux/reducer/topicsReducer";
import errorsReducer from "../containers/ErrorHandler/redux/reducer/errorsReducer";
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    user: userReducer,
    topics: topicsReducer,
    appeals: appealsReducer,
    tickets: ticketsReducer,
    errors:errorsReducer,
    router: connectRouter(history)
});

const middlewares = [
    reduxThunk.withExtraArgument(axios), 
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, enhancers);

// export default store;