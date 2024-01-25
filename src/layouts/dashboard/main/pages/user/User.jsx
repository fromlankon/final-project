import React, { useEffect, useState } from 'react';
import "./User.css";
import { API } from '../../../../../config/axios';
import UserTable from './UserTable';
import UserAddModal from './UserAddModal';

export default function User() {

  const [userModal, setUserModal] = useState(false);

  const userModalOpen = () => {
    setUserModal(!userModal);
  };

  const [user, setUser] = useState({ data: [] });

  const getUser = () => {
    API.get("/dashboard/users")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='userMain'>
      <div className='userOptions'>
        <button className='userButtonMain' onClick={userModalOpen}> <i className="fa-solid fa-plus"></i> Add user </button>
      </div>
      <UserAddModal userModalOpen={userModalOpen} userModal={userModal} getUser={getUser} />
      <UserTable data={user.data} getUser={getUser} />
    </div>
  );
}