import React, { useEffect, useState } from "react";
import "./Followers.css";

import axios from "axios";
import { API_URL } from "../../../constants/userConstants";
import { useSelector } from "react-redux";
import Followers2 from "../../../components/followers2/Followers2";
const Followers = () => {

  const { user } = useSelector((selector) => selector.auth);
  const [followers, setFollowers] = useState([])
  const [update,setupdate]=useState([])
  const getFollowers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getfollowers/${user?._id}`, { withCredentials: true })
      setFollowers(data.followers)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getFollowers()
    }
  }, [user,update])
  return (
    <div className="followers">
      {followers.map((data, index) => {
        return <Followers2 key={index} data={data} setupdate={setupdate} />;
      })}
    </div>
  );
};

export default Followers;
