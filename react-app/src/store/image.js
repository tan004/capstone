const CREATE = 'images/CREATE'
const GET_ALL = 'images/GET_ALL'
const REMOVE = 'bookings/REMOVE'

const all = (data) => ({
    type: GET_ALL,
    data
})

const add = (form) => ({
    type: CREATE,
    form
})
const remove = (data) => ({
    type: REMOVE,
    data
})

export const imagesForOne = (id) => async(dispatch)=>{

    const response = await fetch(`/api/restaurants/${id}/images`)

    if(response.ok){
        const data = await response.json()
        dispatch(all(data))
    }
}

// export const getUserImages = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/users/${userId}/images`)
//     if(response.ok){
//         const images = await response.json()
//         console.log(images)
//         dispatch(all(images))
//     }
// }


export const uploadImage = (form, restaurant_id) => async(dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/uploadimage`,{
        method: 'POST',
        body: form
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(add(data))
        return data

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}


export const removeImage = (id, user_id) => async dispatch => {
    const response = await fetch(`/api/users/${user_id}/${id}/removeImage`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, user_id})
    })

    if(response.ok){
        const data = await response.json()
        dispatch(remove(data))
    }
}


const initialState = {};

export default function images(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return { ...state, ...action.data }
        case CREATE:
            return { ...state, [action.form.id]: action.form }
        // case EDIT:
        //     return { ...state, [action.form.id]: action.form }

        // case REMOVE:
        //     const newState = { ...state }
        //     delete newState[action.id]
        //     return newState;

        case REMOVE:
            const newState = { ...state }
            delete newState[action.data.id]
            return newState;
        default:
            return state
    }
}
