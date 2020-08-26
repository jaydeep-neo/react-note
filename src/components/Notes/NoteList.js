import React from 'react';
import { Table } from 'react-bootstrap';

import { connect } from 'react-redux';
import { searchNotes, deleteNoteData } from './store/note.action';
import NoteDetailsModal from './NoteDetailsModal';
import AddEditModal from './AddEditModal';

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            noteId: null,
            selectedNote: null
        }
    }

    async componentDidMount() {
        await this.props.searchNotes();
    }

    onNoteSelect(note) {
        this.setState({
            selectedNote: note
        });
    }

    onModalClose = async (isRefresh) => {
        if(isRefresh){
            await this.props.searchNotes();
        }

        this.setState({
            showModal: false,
            modalTitle: '',
            noteId: null,
            selectedNote: null
        });
    }
    
    addEditNote = (noteId) => {
        this.setState({
            showModal: true,
            modalTitle: noteId ? 'Edit Note': 'Add Note',
            noteId: noteId,
            selectedNote: null
        });
    }

    deleteNote = async(noteId) => {
        const response = await deleteNoteData(noteId);

        if(response){
            await this.props.searchNotes();
        }
    }

    render() {
        let tableList = this.props.noteList && this.props.noteList.map((note, index) => {
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
        });

        return (
            <div>
                <h2>Notes List</h2>
                <div className="mt-4">
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
                        {this.props.isProcessing ? <tr><td colSpan="3">Fetching Records</td></tr>: tableList}
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
    searchNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
