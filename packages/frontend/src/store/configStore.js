import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { instance as axios } from "../constants";
import appealReducer from "../containers/Appeals/redux/appealReducer";
import appealsReducer from "../containers/Appeals/redux/reducer/appealsReducer";
import userReducer from "../containers/Auth/redux/reducer/userReducer";
import settingsReducer from "../containers/Settings/redux/settingsReducer";
import usersReducer from "../containers/AllUsers/redux/usersReducer/usersReducer";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import historyReducer from "../containers/History/redux/historyReducer";
import auditReducer from "../containers/Audit/redux/auditReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  user: userReducer,
  appeals: appealsReducer,
  users: usersReducer,
  settings: settingsReducer,
  appeal: appealReducer,
  history: historyReducer,
  audit: auditReducer,
  router: connectRouter(history)
});

const middlewares = [
  reduxThunk.withExtraArgument(axios),
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, enhancers);
