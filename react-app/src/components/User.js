import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        <strong>User Id</strong> {userId}
      </div>
      <div>
        <strong>Username</strong> {user.username}
      </div>
      <div>
        <strong>Email</strong> {user.email}
      </div>
    </div>
  );
}
export default User;
