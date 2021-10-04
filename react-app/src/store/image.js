const CREATE = 'images/CREATE'
const GET_ALL = 'images/GET_ALL'

const all = (data) => ({
    type: GET_ALL,
    data
})

const add = (form) => ({
    type: CREATE,
    form
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
        default:
            return state
    }
}
