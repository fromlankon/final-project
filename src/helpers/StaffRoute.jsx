import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loading from '../layouts/site/main/components/Loading/Loading';
import Prohibit from '../layouts/dashboard/main/components/Prohibit/Prohibit';

export default function StaffRoute({ children }) {

    const { user } = useContext(UserContext)

    if (user.role === "superadmin") return children;
    else if (user.role === null) return <Loading />
    else {
        return <Prohibit />
    }
}