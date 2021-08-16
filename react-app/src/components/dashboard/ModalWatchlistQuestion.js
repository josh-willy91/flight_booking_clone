import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneWatchlist } from '../../store/dashboard';
import ReactDOM from 'react-dom';
import '../../styles/modalWatchlistForm.css'


function ModalWatchlistQuestion({openModal, closeModal}) {


    if(!openModal) {
        return null;
    }

    return(
        <div className='modal_wrapper'>
            <div className='modal_background' onClick={closeModal}/>
            <div className='modal_content'>
                <p className='watchlistsP'>What is a watchlist?... It's a convinient way to track flights you may be interested in.
                    Simply create a watchlist for a destination you'd like to go to.
                    Search filters, such as price, will only show flights that meet all criteria.</p>
            </div>
        </div>
    )
}

export default ModalWatchlistQuestion;
