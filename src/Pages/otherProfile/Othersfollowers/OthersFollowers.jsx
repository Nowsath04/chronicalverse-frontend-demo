import React, { useEffect, useState } from "react";
import "./Followers.css";
import FollowersCards from "../../../components/followers_card/FollowersCards";
import { API_URL } from "../../../constants/userConstants";
import axios from "axios";
import { useParams } from "react-router-dom";
import OtherFollowersCard from "../../../components/otherFolllowersCard/OtherFollowersCard";
const OthersFollowers = () => {
  const { id } = useParams()
  const [follower, setFollowers] = useState([])
  const [update,setUpadte]=useState("")
  const getFollowers = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/getfollowers/${id}`, { withCredentials: true })
      setFollowers(data.followers)
    } catch (error) {
      console.log(error);
    }
  }
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${id}`)
      getFollowers(data.user._id)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserData()
  },[update])

  return (
    <div className="followers">
      {follower.map((data, index) => {
        return <OtherFollowersCard key={index} data={data} setUpadte={setUpadte} />;
      })}
    </div>
  );
};

export default OthersFollowers;
