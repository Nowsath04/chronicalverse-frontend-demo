import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRouter({ children }) {

    const {isAuthentication}=useSelector((selector)=>selector.auth)
    console.log(isAuthentication);
    if (!isAuthentication) {
        return <Navigate to="/" />
    }

    return children
}