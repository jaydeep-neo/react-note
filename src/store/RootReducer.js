import { combineReducers } from 'redux';
import { noteReducer } from '../components/Notes/store/note.reducer';

export const rootReducer =  combineReducers({
    noteList: noteReducer
});
