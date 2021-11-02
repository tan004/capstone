const GET_ALL = 'SEARCH/GET_ALL'



const all = (data) => ({
    type: GET_ALL,
    data
})

export const searchRestaurant = (query) => async(dispatch)=>{

    const response = await fetch(`/api/search/${query}`)

    if(response.ok){
        const data = await response.json()
        dispatch(all(data))
    }
}

const initialState = {};

export default function search(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return { ...state, ...action.data }
        default:
            return state
    }
}
