import { FETCH_NOTE_START, FETCH_NOTE_SUCCESS, FETCH_NOTE_FAILURE } from './note.types';
import { getNoteList, getNoteDetail, saveNote, updateNote, deleteNote} from '../../../service/NoteService';

//when note fetch start
const fetchNoteStart = (payload) => {
    return {
        type: FETCH_NOTE_START,
        payload
    }
}

//when note fetch successfully
const fetchNoteSuccess = (payload) => {
    return {
        type: FETCH_NOTE_SUCCESS,
        payload
    }
}

// when note fetch error
const fetchNoteFailure = (payload) => {
    return {
        type: FETCH_NOTE_FAILURE,
        payload
    }
}

// action for fetching notes
export const fetchNotes = () => {
    return dispatch => {
        dispatch(fetchNoteStart({
            isProcessing: true,
            noteList: null,
            error: null
        }));

        getNoteList()
        .then(response => {
            if(response  && response.status===200){
                dispatch(fetchNoteSuccess({
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

            dispatch(fetchNoteFailure({
                noteList: null,
                isProcessing: false,
                error: errorMessage
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
export const updateNoteData = async (data) => {
    try{
       const response = await updateNote(data);

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