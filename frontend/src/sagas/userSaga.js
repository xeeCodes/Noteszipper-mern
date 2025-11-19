import { call, put, takeLatest, all, select } from "redux-saga/effects";
import api from "../api/axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../constants/UserConstants";

// user login worker 
export function* userLoginWorker(action) {
  try {
    const { payload } = action;

    const response = yield call(api.post, "/login", payload);

    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    const message =
      error.response?.data?.message || error.message;

    yield put({ type: USER_LOGIN_FAIL, payload: message });
  }
}


// user register worker 
export function* userRegisterWorker(action) {
  try {
    const { payload } = action;

    const response = yield call(api.post, "/register", payload);

    yield put({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    const message =
      error.response?.data?.message || error.message;

    yield put({ type: USER_REGISTER_FAIL, payload: message });
  }
}


// watcher functions
function* watchLoginUser() {
  yield takeLatest(USER_LOGIN_REQUEST, userLoginWorker);
}

function* watchRegisterUser() {
  yield takeLatest(USER_REGISTER_REQUEST, userRegisterWorker);
}


export default function* userSaga() {
  yield all([watchLoginUser(), watchRegisterUser()]);
}
