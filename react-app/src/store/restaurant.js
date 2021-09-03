const CREATE = 'restaurants/CREATE'
const GET_ALL = 'restaurants/GET_ALL'
const GET_ONE = 'restaurants/GET_ONE'
const EDIT = 'restaurants/EDIT'
const REMOVE = 'restaurants/REMOVE'

const all = (forms) => ({
    type: GET_ALL,
    forms
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


export const getAll = () => async (dispatch) => {
    const response = await fetch('/api/restaurants/all')
    if (response.ok) {
        const data = await response.json();
        dispatch(all(data))
    }
}

export const getOne = (id) => async dispatch => {
    const response = await fetch(`/api/restaurants/${id}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(one(data))
    }
}


export const newRestaurant = (form) => async (dispatch) => {

    const { title, phone, description, address, city, state, zip_code, lat, lng, profile_pic } = form

    const response = await fetch('/api/restaurants/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            phone,
            description,
            address,
            city, state, zip_code, lat, lng, profile_pic
        }),
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

export const editRestaurant = (form) => async dispatch => {
    const { id, title, phone, description, address, city, state, zip_code, lat, lng, profile_pic } = form

    const response = await fetch(`/api/restaurants/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            title,
            phone,
            description,
            address,
            city, state, zip_code, lat, lng, profile_pic
        }),
    })


    if (response.ok) {
        const data = await response.json()
        dispatch(edit(data))
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

export const deleteRestaurant = (id) => async dispatch => {
    const response = await fetch(`/api/restaurants/${+id}`,{
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(id))
    }
    return response.json()
}

export const addBookmark = (id) => async dispatch => {

    const response = await fetch(`/api/restaurants/${id}/bookmark`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })

    if(response.ok){
        const data = await response.json()
        dispatch(edit(data))
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


const initialState = {}

export default function restaurants(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return { ...state, ...action.forms }
        case CREATE:
            return { ...state, [action.form.id]: action.form }
        case EDIT:
            return { ...state, [action.form.id]: action.form }
        case GET_ONE:
            return {
                [action.form.id]: action.form
            }
        case REMOVE:
            const newState = { ...state }
            delete newState[action.id]
            return newState;
        default:
            return state
    }
}
