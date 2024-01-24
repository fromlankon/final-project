import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loading from '../layouts/site/main/components/Loading/Loading';

export default function AuthSiteRoute({ children }) {

    const { user } = useContext(UserContext)

    if (user) return children;
    else if (user === null) return <Loading />
    else if (user === false) {
        return <Navigate to="/login" />
    }
}