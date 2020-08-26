import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchNotes, deleteNoteData } from './store/note.action';
import NoteDetailsModal from './NoteDetailsModal';
import AddEditModal from './AddEditModal';
import { Loader } from '../../utils/Loader';

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm:'',
            filteredNotes: [],
            showModal: false,
            noteId: null,
            selectedNote: null
        }
    }

    async componentDidMount() {
        await this.props.fetchNotes();
    }

    //search notes from list
    onSearch = (event, notes) => {
        const target = event.target;
        const searchTerm = target.value.toLowerCase();

        let filteredNotes = [];

        if(notes && notes.length && searchTerm.length){
            filteredNotes = notes.filter(note => {
                const title = note.title.toLowerCase();
                const description = note.description.toLowerCase();

                return title.includes(searchTerm) || description.includes(searchTerm);
            })
        }

        if(!searchTerm.length){
            filteredNotes = [];
        }
        this.setState({
            searchTerm: searchTerm,
            filteredNotes
        });
    }

    //for notes detail modal
    onNoteSelect = (note) =>{
        this.setState({
            selectedNote: note
        });
    }

    //when modal close from add/edit/details
    onModalClose = async (isRefresh) => {
        if(isRefresh){
            await this.props.fetchNotes();
        }

        this.setState({
            showModal: false,
            modalTitle: '',
            noteId: null,
            selectedNote: null
        });
    }
    
    //open add/edit note modal
    addEditNote = (noteId) => {
        this.setState({
            showModal: true,
            modalTitle: noteId ? 'Edit Note': 'Add Note',
            noteId: noteId,
            selectedNote: null
        });
    }

    //delete note function
    deleteNote = async(noteId) => {
        const response = await deleteNoteData(noteId);

        if(response){
            await this.props.fetchNotes();
        }
    }

    render() {
        
        //set filtered notes list if user search from list
        let noteList = [];

        if(this.state.searchTerm.length){
            noteList = this.state.filteredNotes
        } else {
            noteList = this.props.noteList;
        }
        
        //set table list for dynamically rendered
        let tableList = noteList && noteList.length ? noteList.map((note, index) => {
            return (
                <tr key={index}>
                    <td>{note.title}</td>
                    <td>{note.description}</td>
                    <td>
                        <button type="button" className="btn btn-info btn-sm mr-2" onClick={() => this.onNoteSelect(note)}>View</button>
                        <button type="button" className="btn btn-warning btn-sm mr-2" onClick={() => this.addEditNote(note.id)}>Edit</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteNote(note.id)}>Delete</button>
                    </td>
                </tr>
            )
        }): <tr><td colSpan="3">No Records Found</td></tr>;

        return (
            <div>
                <h2>Notes List</h2>
                <div className="mt-4">
                    <Form>
                        <Form.Group controlId="searchTerm">
                            <Form.Control className="col-md-4" type="text" placeholder="Search by title or description"
                            onChange={(event) => this.onSearch(event, this.props.noteList)}
                            value={this.state.searchTerm}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <button type="button" className="btn btn-success float-right mb-4" onClick={() => this.addEditNote('')}>Add Note</button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="20%">Title</th>
                            <th width="60%">Description</th>
                            <th width="20%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.isProcessing ? <tr><td colSpan="3"><Loader /></td></tr>: tableList}
                    </tbody>
                </Table>

                {/* Note Details Modal */}
                {this.state.selectedNote ? (
                    <NoteDetailsModal selectedNote={this.state.selectedNote} onModalClose={this.onModalClose.bind(this)} />
                ) : null}

                {/* Note Add/Edit Modal */}
                {this.state.showModal ? (
                    <AddEditModal showModal={this.state.showModal} modalTitle={this.state.modalTitle} noteId={this.state.noteId} onModalClose={this.onModalClose.bind(this)} />
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.noteList
    };
}

const mapDispatchToProps = {
    fetchNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
