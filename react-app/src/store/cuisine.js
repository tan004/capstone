const CREATE = 'cuisines/CREATE'
const GET_ALL = 'cuisines/GET_ALL'
// const GET_ONE = 'cuisines/GET_ONE'
const EDIT = 'cuisines/EDIT'
const REMOVE = 'cuisines/REMOVE'

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

export const cuisineForOne = (id) => async(dispatch)=>{

    const response = await fetch(`/api/restaurants/${id}/one`)

    if(response.ok){
        const data = await response.json()
        dispatch(all(data))
    }
}


export const addCuisineType = (form) => async(dispatch) => {
    const {restaurant_id, type} = form
    const response = await fetch(`/api/restaurants/${restaurant_id}/addcuisine`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ restaurant_id, type})
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(add(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

const initialState = {};

export default function cuisines(state = initialState, action) {
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
