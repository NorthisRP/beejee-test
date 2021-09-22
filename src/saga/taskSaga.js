import { put, takeEvery, call } from "redux-saga/effects";
import { getTasks, ASYNC_ADD_TASK, FETCH_TASKS } from "../store/taskReducer";
import { addTask } from "./../store/taskReducer";
import axios from "axios";
import { url } from "./config";

function* fetchTasksWorker(action) {
  const get = "/?developer=Roman";
  const page = action.payload.page ? `&page=${action.payload.page}` : "";
  const sortField = action.payload.sortField
    ? `&sort_field=${action.payload.sortField}`
    : "";
  const sortDir = action.payload.sortDir
    ? "&sort_direction=asc"
    : "&sort_direction=desc";
  const res = yield call(axios.get, url + get + page + sortField + sortDir);
  yield put(getTasks(res.data.message));
}

function* addTaskWorker(action) {
  let form = new FormData();
  form.append("email", action.payload.email);
  form.append("username", action.payload.username);
  form.append("text", action.payload.text);
  const res = yield call(axios.post, url + "/create?developer=Roman", form);
  yield put(addTask(res.data.message));
}

export function* taskWatcher() {
  yield takeEvery(FETCH_TASKS, fetchTasksWorker);
  yield takeEvery(ASYNC_ADD_TASK, addTaskWorker);
}
