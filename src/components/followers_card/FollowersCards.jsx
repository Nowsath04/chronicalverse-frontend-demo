import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import user from "../../asserts/images/followers_user.png";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FollowersCards = ({ data, setUpadte }) => {
  const [logedUser, setLogedUser] = useState(false)
  const { user } = useSelector((selector) => selector.auth);

  const handleUnFollowing = async () => {
    const data2 = {
      userid: user._id,
      unfollowerid: data._id
    }
    try {
      const data1 = await axios.post(`${API_URL}/unfollowing/${user._id}/${data._id}`, data2, { withCredentials: true })
      setUpadte(data1)
      toast.success(`you unfollow ${data.name}`)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user?._id == data?._id) {
      setLogedUser(true)
    }
  }, [user, data])
  return (
    <div className="followers_card">
      <div className="followers_card_left">
        <img src={data.imgpath} alt="" />
        <BsFillCheckCircleFill className="followers_check_icon" />
        <div>
          <Link to={logedUser ? "/profile/onsale" : `/otherprofile/onsale/${data.userid}`}>{data.name}</Link>
          <p>{data.followers.length}</p>
        </div>
      </div>
      <div className="followers_card_right">
        {
          logedUser ? "" : <button onClick={handleUnFollowing}>unfollow</button>
        }
      </div>
    </div>
  );
};

export default FollowersCards;
