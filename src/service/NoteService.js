import axios from 'axios';

export const getNoteList = () => {
    return axios.get(`${process.env.REACT_APP_NOTE_URL}/api/v1/notes`);
}

export const saveNote = (data) => {
    return axios.post(`${process.env.REACT_APP_NOTE_URL}/api/v1/notes/`, data);
}

export const updateNote = (data, noteId) => {
    return axios.put(`${process.env.REACT_APP_NOTE_URL}/api/v1/notes/`+noteId, data);
}

export const getNoteDetail = (noteId) => {
    return axios.get(`${process.env.REACT_APP_NOTE_URL}/api/v1/notes/`+noteId);
}

export const deleteNote = (noteId) => {
    return axios.delete(`${process.env.REACT_APP_NOTE_URL}/api/v1/notes/`+noteId);
}