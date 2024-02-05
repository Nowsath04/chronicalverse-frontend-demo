import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircleSpinner } from 'react-spinners-kit';
import { toast } from 'react-toastify';
import "./privateRouter.css"

const PrivateRouter = ({ children }) => {
    const { isAuthentication, loading } = useSelector((selector) => selector.auth);
    const navigator = useNavigate()
    useEffect(() => {
        const delay = 4000; // 5 seconds delay
        const timeoutId = setTimeout(() => {
            if (!isAuthentication) {
                toast.error('Please connect wallet');
                navigator("/");
            }
        }, delay);

        return () => clearTimeout(timeoutId); // Clear the timeout on component unmount

    }, [isAuthentication]);
    return loading ? <div className='privateRouteLoading'>
       <CircleSpinner size={50} color="#9700c1" /></div> : children;
};

export default PrivateRouter;