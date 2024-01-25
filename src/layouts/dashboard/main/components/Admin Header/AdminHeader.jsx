import React, { useContext, useEffect, useRef, useState } from 'react'
import "./AdminHeader.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../../context/AuthContext'

export default function AdminHeader() {

  const { user } = useContext(UserContext)
  const [settings, setSettings] = useState(false)
  const navigate = useNavigate();
  const settingsRef = useRef(null);

  const toggleSettings = () => {
    setSettings((prevVisible) => !prevVisible);
  };

  const closeSettings = (e) => {
    if (settingsRef.current && !settingsRef.current.contains(e.target)) {
      setSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeSettings);
    return () => {
      document.removeEventListener('click', closeSettings);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate('/adminlogin');
    }, 1500);
  }

  return (
    <div className='adminHeader'>
      <div className='headerSettings' onClick={toggleSettings} ref={settingsRef}>
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
          <div className='logOut' onClick={logOut}>
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