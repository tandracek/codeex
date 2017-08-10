import React from 'react';
import Modal from 'react-responsive-modal';

export default ({ open, onClose, title, descr }) => {
    return (
        <Modal open={open} onClose={onClose} little>
            <h5>{title}</h5>
            <div>{descr}</div>
        </Modal>
    )
}