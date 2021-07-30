

const SEACH_FLIGHTS = 'home/SEACH_FLIGHTS';


// Action Creators
const searchFlights = (flights) => ({
    type: SEACH_FLIGHTS,
    payload: flights
})


// Define thunk
export const searchAllFlights = (payload) => async(dispatch) => {
    const response = await fetch(`/api/bookyeah/search`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const flights = await response.json()
        dispatch(searchFlights(flights))
    }
}


// Define initial state
const initialState = {}

  // Define reducer
export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SEACH_FLIGHTS:
            return {...state, 'flights': action.payload }
        default:
            return state;
    };
};
