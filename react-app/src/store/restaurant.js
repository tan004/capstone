const CREATE = 'restaurants/CREATE'


const add = (form) => ({
    type: CREATE,
    form
})




export const newRestaurant = (form) => async(dispatch) =>  {

    const { title,phone,description,address,city,state,zip_code,lat,lng} = form


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
            city, state, zip_code, lat, lng}),
    })

    console.log(response)

    if(response.ok){
        const data = await response.json()
        console.log(data)
        dispatch(add(data))

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


export default function restaurant(state=initialState, action) {
    switch(action.type){
        case CREATE:
            console.log(action.form)
            return {...state, ...action.form}

        default:
            return state
    }
}
