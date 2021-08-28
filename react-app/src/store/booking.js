const CREATE = 'bookings/CREATE'
const GET_ALL = 'bookings/GET_ALL'
const GET_ONE = 'bookings/GET_ONE'
const EDIT = 'bookings/EDIT'
const REMOVE = 'bookings/REMOVE'

const all = (data) => ({
    type: GET_ALL,
    data
})

const one = (form) => ({
    type: GET_ONE,
    form
})

const add = (form) => ({
    type: CREATE,
    form
})
const edit = (form) => ({
    type: EDIT,
    form
})

const remove = (id) => ({
    type: REMOVE,
    id
})


export const getUserBookings = (id) => async(dispatch)=>{

    const response = await fetch(`/api/users/${id}/one`)

    if(response.ok){
        const data = await response.json()
        dispatch(all(data))
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

        case REMOVE:
            const newState = { ...state }
            delete newState[action.id]
            return newState;
        default:
            return state
    }
}
