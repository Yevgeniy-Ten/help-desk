import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { instance as axios } from "../constants";
import appealsReducer from "../containers/Appeals/redux/reducer/appealsReducer";
import ticketsReducer from "../containers/Tickets/redux/reducer/ticketsReducer";
import userReducer from "../containers/Auth/redux/reducer/userReducer";
import topicsReducer from "../containers/Appeals/redux/reducer/topicsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    user: userReducer,
    topics: topicsReducer,
    appeals: appealsReducer,
    tickets: ticketsReducer,
});
const middlewares = [reduxThunk.withExtraArgument(axios)];


const enhancers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancers);
// axios.interceptors.request.use(config => {
//     try {
//         config.headers["Authorization"] = store.getState().user.user.token;
//     } catch (e) {
//         // user non authorized
//     }
//     return config;
// });

export default store;