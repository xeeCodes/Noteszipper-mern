import {all} from 'redux-saga/effects';
import noteSaga from './noteSaga';
import userSaga from './userSaga';


//entry point of alll saga in the app

export default function* rootSaga() {
  yield all([noteSaga(),userSaga()]);
}