import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { saveNoteData, updateNoteData, fetchNoteDetail } from './store/note.action';

class AddEditModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: props.showModal,
            modalTitle: props.modalTitle,
            noteId: props.noteId,
            title: '',
            description: '',
            errors: {}
        }
    }
    async componentDidMount(){
        if(this.state.noteId){
            const response = await fetchNoteDetail(this.state.noteId);

            if(response && response.data){
                this.setState({
                    title: response.data.title,
                    description: response.data.description
                })
            }
        }
    }
    handleChangeTitle = (event) => {
        this.setState({ title: event.target.value });
    }
    handleChangeDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    //validate form for add/edit
    validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!this.state.title.length) {
            formIsValid = false;
            errors['title'] = `Title can't be empty`;
        }

        if (!this.state.description.length) {
            formIsValid = false;
            errors['description'] = `Description can't be empty`;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    //handle form submit event
    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validateForm()) {
            const formData = { title: this.state.title, description: this.state.description };

            if(this.state.noteId){
                const response = await updateNoteData(formData, this.state.noteId);
                if(response){
                    this.props.onModalClose(true);
                }
            } else {
                const response = await saveNoteData(formData);
                if(response){
                    this.props.onModalClose(true);
                }
            }      
        }
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={() => this.props.onModalClose(false)}>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Title:</label>
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChangeTitle} className="form-control" />
                                {this.state.errors.title && (
                                    <div className="error-label"> {this.state.errors['title']}</div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Description:</label>
                                <input type="text" name="description" value={this.state.description} onChange={this.handleChangeDescription} className="form-control" />
                                {this.state.errors.description && (
                                    <div className="error-label"> {this.state.errors['description']}</div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onModalClose(false)}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

const mapDispatchToProps = {
    saveNoteData,
    updateNoteData,
    fetchNoteDetail
}

export default connect(null, mapDispatchToProps)(AddEditModal);