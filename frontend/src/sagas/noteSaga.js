// src/sagas/notesSaga.js
import { call, put, takeLatest, all, select } from "redux-saga/effects";
import api from "../api/axios";
import {
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_LIST_FAIL,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_FAIL,
} from "../constants/NoteConstants";

// selector to get userInfo from state
const getUserInfo = (state) => state.userLogin?.userInfo;

// Worker: fetch all notes
function* fetchNotesWorker() {
  try {
    const userInfo = yield select(getUserInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    const response = yield call(api.get, "/api/notes", config);
    yield put({ type: NOTES_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    yield put({ type: NOTES_LIST_FAIL, payload: message });
  }
}

// Worker: create note
function* createNoteWorker(action) {
  try {
    const { title, content, category } = action.payload;
    yield put({ type: CREATE_NOTE_REQUEST }); // optional: can be redundant if already dispatched by component
    const userInfo = yield select(getUserInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    const response = yield call(api.post, "/api/notes/create", { title, content, category }, config);
    yield put({ type: CREATE_NOTE_SUCCESS, payload: response.data });

    // Refresh the notes list after creating a note
    yield put({ type: NOTES_LIST_REQUEST });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    yield put({ type: CREATE_NOTE_FAIL, payload: message });
  }
}

// Worker: delete note
function* deleteNoteWorker(action) {
  try {
    const id = action.payload;
    yield put({ type: NOTES_DELETE_REQUEST });
    const userInfo = yield select(getUserInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    const response = yield call(api.delete, `/api/notes/${id}`, config);
    yield put({ type: NOTES_DELETE_SUCCESS, payload: response.data });

    // Refresh list after delete
    yield put({ type: NOTES_LIST_REQUEST });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    yield put({ type: NOTES_DELETE_FAIL, payload: message });
  }
}

// Worker: update note
function* updateNoteWorker(action) {
  try {
    const { id, title, content, category } = action.payload;
    yield put({ type: NOTES_UPDATE_REQUEST });
    const userInfo = yield select(getUserInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    const response = yield call(api.put, `/api/notes/${id}`, { title, content, category }, config);
    yield put({ type: NOTES_UPDATE_SUCCESS, payload: response.data });

    // Refresh the list after update or navigate from component
    yield put({ type: NOTES_LIST_REQUEST });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    yield put({ type: NOTES_UPDATE_FAIL, payload: message });
  }
}

// Watchers
function* watchFetchNotes() {
  yield takeLatest(NOTES_LIST_REQUEST, fetchNotesWorker);
}
function* watchCreateNote() {
  yield takeLatest(CREATE_NOTE_REQUEST, createNoteWorker);
}
function* watchDeleteNote() {
  yield takeLatest(NOTES_DELETE_REQUEST, deleteNoteWorker);
}
function* watchUpdateNote() {
  yield takeLatest(NOTES_UPDATE_REQUEST, updateNoteWorker);
}

export default function* notesSaga() {
  yield all([watchFetchNotes(), watchCreateNote(), watchDeleteNote(), watchUpdateNote()]);
}
