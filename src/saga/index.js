import { all } from "@redux-saga/core/effects";
import { authWatcher } from "./authSaga";
import { taskWatcher } from "./taskSaga";

export function* rootWatcher() {
  yield all([authWatcher(), taskWatcher()]);
}
