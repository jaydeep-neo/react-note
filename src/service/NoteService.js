import axios from 'axios';
import { API } from '../constants/api.constants';

export const getNoteList = () => {
    return axios.get(`${process.env.REACT_APP_NOTE_URL}${API.NOTE_LIST}`);
}

export const saveNote = (data) => {
    return axios.post(`${process.env.REACT_APP_NOTE_URL}${API.ADD_NOTE}`, data);
}

export const updateNote = (data) => {    
    return axios.post(`${process.env.REACT_APP_NOTE_URL}${API.UPDATE_NOTE}`, data);
}

export const getNoteDetail = (noteId) => {
    return axios.post(`${process.env.REACT_APP_NOTE_URL}${API.NOTE_DETAILS}`, {'_noteId': noteId});
}

export const deleteNote = (noteId) => {
    return axios.delete(`${process.env.REACT_APP_NOTE_URL}/api/v1/notes/`+noteId);
}