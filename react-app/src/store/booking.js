const CREATE = 'bookings/CREATE'
const GET_ALL = 'bookings/GET_ALL'
// const GET_ONE = 'bookings/GET_ONE'
const EDIT = 'bookings/EDIT'
const REMOVE = 'bookings/REMOVE'
const GET_ALL_R_B = 'bookings/GET_ALL_R_B'

const all = (data) => ({
    type: GET_ALL,
    data
})

// const one = (form) => ({
//     type: GET_ONE,
//     form
// })

const add = (form) => ({
    type: CREATE,
    form
})
// const edit = (form) => ({
//     type: EDIT,
//     form
// })

// const remove = (id) => ({
//     type: REMOVE,
//     id
// })

const allRestaurantBooking = (data) => ({
    type: GET_ALL_R_B,
    data
})

export const getRestaurantBookings = (id) => async dispatch => {
    const response = await fetch(`/api/restaurants/${id}/getbookings`)

    if(response.ok){
        const data = await response.json()
        dispatch(allRestaurantBooking(data))
    }
}



export const getUserBookings = (id) => async(dispatch)=>{

    const response = await fetch(`/api/users/${id}/one`)

    if(response.ok){
        const data = await response.json()
        dispatch(all(data))
    }
}

export const makeBooking = (form) => async (dispatch) => {
    const { size, startDate, startTime, user_id, restaurant_id } = form;

    // console.log(form)

    const response = await fetch(`/api/restaurants/${restaurant_id}/newbooking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            size, startTime, startDate, user_id, restaurant_id
        })
    })

    // console.log(response)


    if(response.ok){
        const data = response.json()
        dispatch(add(data))
        return null
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}



const initialState = {};

export default function bookings(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return { ...state, ...action.data }
        case CREATE:
            return { ...state, [action.form.id]: action.form }
        case EDIT:
            return { ...state, [action.form.id]: action.form }
        case GET_ALL_R_B:
            return {...action.data}
        case REMOVE:
            const newState = { ...state }
            delete newState[action.id]
            return newState;
        default:
            return state
    }
}
