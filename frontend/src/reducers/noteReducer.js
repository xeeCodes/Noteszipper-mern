import {
  NOTES_LIST_FAIL,
  NOTES_LIST_SUCCESS,
  NOTES_LIST_REQUEST,
  NOTES_LIST_RESET,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
} from "../constants/NoteConstants";

/**
 * NOTE: `allNotes` in your store should point to this reducer
 * (see combineReducers example below).
 */

/* 1) list reducer — this owns the notes array */
export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { loading: true, notes: [] };

    case NOTES_LIST_SUCCESS:
      return { loading: false, notes: action.payload };

    case NOTES_LIST_FAIL:
      return { loading: false, error: action.payload, notes: [] };

    case NOTES_LIST_RESET:
      return { notes: [] };

    default:
      return state;
  }
};

/* 2) create reducer — does NOT hold notes array */
export const createNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTE_REQUEST:
      return { loading: true };

    case CREATE_NOTE_SUCCESS:
      return { loading: false, success: true, note: action.payload };

    case CREATE_NOTE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

/* 3) delete reducer — should not manage notes[], only statuses */
export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { loading: true };

    case NOTES_DELETE_SUCCESS:
      return { loading: false, success: true };

    case NOTES_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

/* 4) update reducer */
export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { loading: true };

    case NOTES_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case NOTES_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
