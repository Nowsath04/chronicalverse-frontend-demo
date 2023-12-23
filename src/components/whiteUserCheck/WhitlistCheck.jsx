import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WhitlistCheck = ({children}) => {
    const { user } = useSelector((selector) => selector.auth);
    if (user?.whiteListUser == false) {
        toast.error("You not WhiteListed")
        return <Navigate to="/" />
    }

    return children
}

export default WhitlistCheck
