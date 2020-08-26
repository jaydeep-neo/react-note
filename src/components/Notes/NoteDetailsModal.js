import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NoteDetailsModal = (props) => {

    return (
        <Modal show={props.selectedNote ? true : false} onHide={props.onModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Note Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <b>Title</b>: {props.selectedNote.title}
                </div>
                <div>
                    <b>Description</b>: {props.selectedNote.description}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default NoteDetailsModal;