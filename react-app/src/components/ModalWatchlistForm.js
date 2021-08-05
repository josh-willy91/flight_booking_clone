import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


function ModalWatchlistForm({ openModal, closeModal, children}) {



    if(!openModal) {
        return null;
    }

    // ReactDOM.createPortal
    return ReactDOM.createPortal(
        <>
            <div>
                Open Modal
                <button onClick={closeModal}>Close Modal</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ModalWatchlistForm;
