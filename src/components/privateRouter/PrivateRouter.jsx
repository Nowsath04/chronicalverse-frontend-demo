import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRouter = ({ children }) => {
    const { isAuthentication } = useSelector((selector) => selector.auth);
    const navigator = useNavigate()
    useEffect(() => {
        const delay = 600; // 5 seconds delay
        const timeoutId = setTimeout(() => {
            if (!isAuthentication) {
                toast.error('Please connect wallet');
                navigator("/");
            }
        }, delay);

        return () => clearTimeout(timeoutId); // Clear the timeout on component unmount

    }, [isAuthentication]);
    return children;
};

export default PrivateRouter;