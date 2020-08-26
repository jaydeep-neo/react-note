import { FETCH_NOTE_START, FETCH_NOTE_SUCCESS, FETCH_NOTE_FAILURE } from './note.types';

const initialState = {
    isProcessing: false,
    noteList: null,
    error: null
}

// Note reducer
export const noteReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_NOTE_START:
        case FETCH_NOTE_SUCCESS:
        case FETCH_NOTE_FAILURE:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}