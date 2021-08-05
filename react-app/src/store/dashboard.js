// Define action types
const BOOKINGS = 'dashboard/BOOKINGS';
const DELETE_BOOKING = 'dashboard/DELETE_BOOKING';
const CREATE_BOOKING = 'dashboard/CREATE_BOOKING';
const WATCHLISTS = 'dashboard/WATCHLISTS';
const DELETE_WATCHLIST = 'dashboard/DELETE_WATCHLIST';
const CREATE_WATCHLIST = 'dashboard/CREATE_WATCHLIST';
const EDIT_WATCHLIST = 'dashboard/EDIT_WATCHLIST';


// Action Creators
const getBookings = (bookings) => ({
    type: BOOKINGS,
    payload: bookings
})

const deleteBooking = (confirmation) => ({
    type: DELETE_BOOKING,
    payload: confirmation
})

const createBooking = (details) => ({
    type: CREATE_BOOKING,
    payload: details
})

const getWatchlists = (watchlists) => ({
    type: WATCHLISTS,
    payload: watchlists
})

const deleteWatchlist = (confirmation) => ({
    type: DELETE_WATCHLIST,
    payload: confirmation
})

const createWatchlist = (watchlistResults) => ({
    type: CREATE_WATCHLIST,
    payload: watchlistResults
})

const editeWatchlist = (watchlistResults) => ({
    type: EDIT_WATCHLIST,
    payload: watchlistResults
})


export const bookingDetails = (userId) => async(dispatch) => {
    const response = await fetch(`/api/bookings/${userId}`)

    if(response.ok) {
        const bookingResult = await response.json()
        dispatch(getBookings(bookingResult))
    }
}

export const deleteOneBooking = (payload) => async(dispatch) => {
    const response = await fetch(`/api/bookings/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const confirmation = await response.json()
        dispatch(deleteBooking(confirmation))
    }
}

export const createOneBooking = (payload) => async(dispatch) => {
    const response = await fetch(`/api/bookings/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const confirmBooking = await response.json()
        dispatch(createBooking(confirmBooking))
    }
}

export const watchlistDetails = (userId) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/${userId}`)

    if(response.ok) {
        const watchlistResult = await response.json()
        dispatch(getWatchlists(watchlistResult))
    }
}

export const deleteOneWatchlist = (payload) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const confirmation = await response.json()
        dispatch(deleteWatchlist(confirmation))
    }
}

export const createOneWatchlist = (payload) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const addConfirmation = await response.json()
        dispatch(createWatchlist(addConfirmation))
    }
}

export const editOneWatchlist = (payload) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/edit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const payload = await response.json()
        dispatch(editeWatchlist(payload))
    }
}


// Define initial state
const initialState = {}

  // Define reducer
export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case BOOKINGS:
            return {...state, 'bookings': action.payload }
        case DELETE_BOOKING:
            return {...state, 'confirmation': action.payload }
        case CREATE_BOOKING:
            return {...state, 'confirmBooking': action.payload }
        case WATCHLISTS:
            return {...state, 'watchlists': action.payload }
        case DELETE_WATCHLIST:
            return {...state, 'confirmation': action.payload }
        case CREATE_WATCHLIST:
            return {...state, 'confirmWatchlist': action.payload }
        case EDIT_WATCHLIST:
            return {...state, 'confirmEditWatchlist': action.payload }
        default:
            return state;
    };
};
