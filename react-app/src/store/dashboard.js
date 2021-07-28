// Define action types
const BOOKINGS = 'dashboard/BOOKINGS';
const DELETE_BOOKING = 'dashboard/DELETE_BOOKING';
const WATCHLISTS = 'dashboard/WATCHLISTS';


// Action Creators
const getBookings = (bookings) => ({
    type: BOOKINGS,
    payload: bookings
})

const deleteBooking = (confirmation) => ({
    type: DELETE_BOOKING,
    payload: confirmation
})

const getWatchlists = (watchlists) => ({
    type: WATCHLISTS,
    payload: watchlists
})


export const bookingDetails = (userId) => async(dispatch) => {
    const response = await fetch(`/api/bookings/${userId}`)

    if(response.ok) {
        const bookingResult = await response.json()
        dispatch(getBookings(bookingResult))
    }
}

export const deleteOneBooking = () => async(dispatch) => {
    console.log('thunk ======================================')
    const response = await fetch(`/api/bookings/delete`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const confirmation = await response.json()
        dispatch(deleteBooking(confirmation))
    }
}

export const watchlistDetails = (userId) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/${userId}`)

    if(response.ok) {
        const watchlistResult = await response.json()
        dispatch(getWatchlists(watchlistResult))
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
        case WATCHLISTS:
            return {...state, 'watchlists': action.payload }
        default:
            return state;
    };
};
