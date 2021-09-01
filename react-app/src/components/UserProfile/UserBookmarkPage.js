import { useParams } from "react-router-dom";


const UserBookmarkPage = () => {
    const {userId} = useParams()
    console.log(userId)


    return (
        <div className='user-right__container'>
            <div>all saved Restaurants</div>
        </div>
    )
}
export default UserBookmarkPage;
