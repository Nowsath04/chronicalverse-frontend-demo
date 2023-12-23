import axios from "axios";
import { LoadinUserError, LoadingUserRequest, LoadingUserSucccess, loginError, loginRequest, loginSuccess, logoutError, logoutSuccess } from "../Slices/authSlice"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/userConstants";

// login user
export const loginUser = (address, nonce, signature) => async (dispatch) => {
  const navigate = useNavigate();
  try {
    dispatch(loginRequest())
    const { data } = await axios.post(`${API_URL}/verify-login`, { "userid": address, "nonce": nonce, "signature": signature }, { withCredentials: true })
    dispatch(loginSuccess(data.user))
    if (data.user.name.length !== 0) {
      toast.success("login successfull",{theme: "dark",})
      navigate("/profile")
    } else {
      navigate("/editprofile")
    }

  } catch (error) {
    dispatch(loginError(error))
  }
}

// check user is login or not
export const LoadingUser =async (dispatch) => {
  try {
      dispatch(LoadingUserRequest())
      const { data } = await axios.get(`${API_URL}/myprofile`,{ withCredentials: true })
      console.log(data);
      dispatch(LoadingUserSucccess(data))
  } catch (error) {
      dispatch(LoadinUserError(error.response ?error.response.data.message :"Server error"))
  }
}

// logout user

export const logoutUser = async (dispatch) => {
  try {

    await axios.get(`${API_URL}/logout`, { withCredentials: true })
    dispatch(logoutSuccess())
  } catch (error) {
    dispatch(logoutError(error))
  }
}

