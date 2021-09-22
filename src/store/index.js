import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootWatcher } from "../saga";
import { authReducer } from "./authReducer";
import { taskReducer } from "./taskReducer";
import { errorReducer } from "./errorReducer";

const sagaMiddleware = createSagaMiddleware();
const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const rootReducer = combineReducers({ taskReducer, authReducer, errorReducer });

export const store = createStore(rootReducer, composedEnhancer);

sagaMiddleware.run(rootWatcher);
