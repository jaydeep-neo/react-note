import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Moment from 'moment';

const NoteDetailsModal = (props) => {

    return (
        <Modal show={props.selectedNote ? true : false} onHide={() => props.onModalClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Note Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <b>Description</b>: {props.selectedNote.noteDescription}
                </div>
                <div>
                    <b>Note Date</b>: { Moment(props.selectedNote.noteDate).isValid() ? Moment(props.selectedNote.noteDate).format('Do MMMM, YYYY'): ''}
                </div>
                <div>
                    <b>Note Time</b>: { Moment(props.selectedNote.noteTime).isValid() ? Moment(props.selectedNote.noteTime).format('LT'): ''}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onModalClose(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default NoteDetailsModal;