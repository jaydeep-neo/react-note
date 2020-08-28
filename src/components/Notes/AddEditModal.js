import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

import { connect } from 'react-redux';
import { saveNoteData, updateNoteData, fetchNoteDetail } from './store/note.action';
import 'react-datepicker/dist/react-datepicker.css';

class AddEditModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: props.showModal,
            modalTitle: props.modalTitle,
            noteId: props.noteId,
            description: '',
            noteDate: !props.noteId ? new Date(): '',
            noteTime: !props.noteId ? new Date(): '',
            errors: {}
        }
    }
    async componentDidMount(){
        //in edit note modal fetch note details
        if(this.state.noteId){
            const response = await fetchNoteDetail(this.state.noteId);

            if(response && response.data){                
                this.setState({
                    description: response.data.noteDescription,
                    noteDate:  Moment(response.data.noteDate).isValid() ? new Date(response.data.noteDate): '',
                    noteTime: Moment(response.data.noteTime).isValid() ? new Date(response.data.noteTime): ''
                })
            }
        }
    }

    //for input change
    handleUserInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //for input date
    handleDateInput = (date) => {
        this.setState({ noteDate: date });
    }

    //for input time
    handleTimeInput = (time) => {
        this.setState({ noteTime: time });
    }

    //validate form for add/edit
    validateForm = () => {
        let formIsValid = true;
        let errors = {};
        if (!this.state.description.length) {
            formIsValid = false;
            errors['description'] = `Description can't be empty`;
        }

        if (!this.state.noteDate) {
            formIsValid = false;
            errors['noteDate'] = `Note date can't be empty`;
        }

        if (!this.state.noteTime) {
            formIsValid = false;
            errors['noteTime'] = `Note time can't be empty`;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    //handle form submit event
    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validateForm()) {            

            if(this.state.noteId){
                const formData = {'_noteId':this.state.noteId,
                                  '_noteDescription':this.state.description, 
                                  '_noteDate':this.state.noteDate, 
                                  '_noteTime':this.state.noteTime
                                };
                const response = await updateNoteData(formData);
                if(response){
                    this.props.onModalClose(true);
                }
            } else {
                const randomNumber = Math.floor(Math.random() * 10001);
                const formData = {'_noteId': randomNumber.toString(),
                                  '_noteDescription':this.state.description, 
                                  '_noteDate':this.state.noteDate, 
                                  '_noteTime':this.state.noteTime
                                };
                                console.log(formData);              
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
                                <label>Description *:</label>
                                <input type="text" name="description" value={this.state.description} onChange={this.handleUserInput} className="form-control" />
                                {this.state.errors.description && (
                                    <div className="error-label"> {this.state.errors['description']}</div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Note Date *:</label>
                                <div className="clearfix"></div>
                                <DatePicker
                                    className="form-control"                                    
                                    name="noteDate"
                                    id="noteDate"
                                    dateFormat="MM/dd/yyyy"
                                    selected={this.state.noteDate}
                                    onChange={(date) => this.handleDateInput(date)}                                    
                                />
                                {this.state.errors.noteDate && (
                                    <div className="error-label"> {this.state.errors['noteDate']}</div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Note Time *:</label>
                                <DatePicker
                                    className="form-control"
                                    name="noteTime"
                                    id="noteTime"
                                    selected={this.state.noteTime}
                                    onChange={(time) =>this.handleTimeInput(time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                                {this.state.errors.noteTime && (
                                    <div className="error-label"> {this.state.errors['noteTime']}</div>
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