import'./UserRightContainer.css'
import { useState, useEffect } from 'react';


const UserBookingPage = ({loggedInUser}) => {

    // const [users, setUsers] = useState([]);



//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('/api/users/');
//       const responseData = await response.json();
//       setUsers(responseData.users);
//     }
//     fetchData();
//   }, []);


    return (
        <div className='user-right__container'>
            <div>
                <h1> all reservation</h1>
            </div>
        </div>
    )
}
export default UserBookingPage;
