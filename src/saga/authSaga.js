import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import { saveToken, FETCH_TOKEN } from "../store/authReducer";
import { getError } from "../store/errorReducer";
import { url } from "./config";

function* fetchTokenWorker(action) {
  let form = new FormData();
  form.append("username", action.payload.login);
  form.append("password", action.payload.password);
  const res = yield call(axios.post, url + "/login?developer=Roman", form);
  if (res.data.status === "ok") {
    localStorage.setItem(
      "taskData",
      JSON.stringify({ token: res.data.message })
    );
    yield put(saveToken(res.data.message));
  }
  yield put(getError(res.data.message.password));
}

export function* authWatcher() {
  yield takeEvery(FETCH_TOKEN, fetchTokenWorker);
}
