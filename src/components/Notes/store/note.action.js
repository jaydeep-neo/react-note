import { SEARCH_NOTE_START, SEARCH_NOTE_SUCCESS, SEARCH_NOTE_FAILURE } from './note.types';
import { getNoteList, getNoteDetail, saveNote, updateNote, deleteNote} from '../../../service/NoteService';

const searchNoteStart = (payload) => {
    return {
        type: SEARCH_NOTE_START,
        payload
    }
}

const searchNoteSuccess = (payload) => {
    return {
        type: SEARCH_NOTE_SUCCESS,
        payload
    }
}

const searchNoteFailure = (payload) => {
    return {
        type: SEARCH_NOTE_FAILURE,
        payload
    }
}

export const searchNotes = () => {
    return dispatch => {
        dispatch(searchNoteStart({
            isProcessing: true,
            noteList: null,
            error: null
        }));

        getNoteList()
        .then(response => {
            if(response  && response.status===200){
                dispatch(searchNoteSuccess({
                    noteList: response.data,
                    isProcessing: false,
                    error: null
                }));
            }
        })
        .catch(error => {
            const errorResponse = error.response;

            let errorMessage = 'Unable to process your request, something went wrong, Please try again later.';
            if(errorResponse && errorResponse.status===400){
                errorMessage = 'No record found for notes';
            }

            dispatch(searchNoteFailure({
                noteList: null,
                isProcessing: false,
                error: null
            }));
        });      
    }
}

//get note Details
export const fetchNoteDetail = async (noteId) => {
    try{
        const response = await getNoteDetail(noteId);
 
        return response;
    }
    catch(error){

    }
}

//save note
export const saveNoteData = async (data) => {
    try{
       const response = await saveNote(data);

       return response;
    }
    catch(error){

    }
}

//update note
export const updateNoteData = async (data, noteId) => {
    try{
       const response = await updateNote(data, noteId);

       return response;
    }
    catch(error){

    }
}

//delete note
export const deleteNoteData = async (noteId) => {
    try{
       const response = await deleteNote(noteId);

       return response;
    }
    catch(error){

    }
}