import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loading from '../layouts/site/main/components/Loading/Loading';

export default function ProtectRoute({ children }) {

    const { user } = useContext(UserContext)

    if (user.role === "superadmin" || user.role === "admin") return <> {children} </>
    else if (user.role === null) return <Loading />
    else {
        return <Navigate to="/adminlogin" />
    }
}