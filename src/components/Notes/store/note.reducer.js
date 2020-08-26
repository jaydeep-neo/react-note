import { SEARCH_NOTE_START, SEARCH_NOTE_SUCCESS, SEARCH_NOTE_FAILURE } from './note.types';

const initialState = {
    isProcessing: false,
    noteList: null,
    error: null
}

export const noteReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SEARCH_NOTE_START:
        case SEARCH_NOTE_SUCCESS:
        case SEARCH_NOTE_FAILURE:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}