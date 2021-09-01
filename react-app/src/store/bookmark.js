const GET_ALL = 'bookmark/GET_ALL'



const all = (data) => ({
    type: GET_ALL,
    data
})




export const getUserBookmarks = (id) => async(dispatch)=>{

    const response = await fetch(`/api/users/${id}/bookmarks`)

    if(response.ok){
        const data = await response.json()
        dispatch(all(data))
    }
}



const initialState = {};

export default function bookmarks(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return { ...state, ...action.data }
        // case CREATE:
        //     return { ...state, [action.form.id]: action.form }
        // case EDIT:
        //     return { ...state, [action.form.id]: action.form }
        // case GET_ALL_R_B:
        //     return {...action.data}
        // case REMOVE:
        //     const newState = { ...state }
        //     delete newState[action.data.id]
        //     return newState;
        default:
            return state
    }
}
