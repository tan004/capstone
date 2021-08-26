import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";




const RestaurantPage = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getOne(id))
    }, [])

    return (
        <div> details </div>
    )
}


export default RestaurantPage;
