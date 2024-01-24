import React, { useContext, useEffect, useState } from 'react'
import "./AdminHeader.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../../context/AuthContext'

export default function AdminHeader() {

  const { user } = useContext(UserContext)
  const [settings, setSettings] = useState(false)
  const navigate = useNavigate();

  const openSettings = () => {
    setSettings(!settings)
  }

  const closeSettings = () => {
    setSettings(false);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate('/adminlogin');
    }, 1500);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      const headerSettings = document.querySelector('.headerSettings');
      if (headerSettings && !headerSettings.contains(e.target)) {
        closeSettings();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='adminHeader'>
      <div className='headerSettings' onClick={openSettings}>
        <img className='adminUserImage' src="../../../../src/images/Admin User.png" />
        <div className={`headerSettingsBlock ${settings ? "visible" : ""}`}>
          <Link className='dashboardSettings'>
            <div className="blockTriangle"></div>
            <img className='adminUserImage' src="../../../../src/images/Category.png" />
            <p> Dashboard </p>
          </Link>
          <Link to={"/admin/users"} className='profileSettings'>
            <img className='adminUserImage' src="../../../../src/images/Settings.png" />
            <p> Edit Profile </p>
          </Link>
          <div className='logOut' onClick={logout}>
            <img className='adminUserImage' src="../../../../src/images/Log Out.png" />
            <p> Log Out </p>
          </div>
          <div className='userEmail'>
            <p style={{ color: "red" }}> {user.email} </p> </div>
        </div>
      </div>
    </div>
  )
}