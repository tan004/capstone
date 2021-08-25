import { useSelector } from "react-redux";



const RestaurantForm = () => {
    const user = useSelector(state => state.session.user)

   return (<div>
       <h1>Tell us about your Restaurant</h1>
        <form>

        </form>

   </div>)
}

export default RestaurantForm;
