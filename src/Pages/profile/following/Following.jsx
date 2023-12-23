import React, { useEffect, useState } from 'react'
import { Follower } from '../Data'
import FollowersCards from '../../../components/followers_card/FollowersCards'
import "./Following.css"
import { API_URL } from '../../../constants/userConstants'
import axios from 'axios'
import { useSelector } from 'react-redux'
const Following = () => {
  const { user } = useSelector((selector) => selector.auth);
  const [followingData, setFollowingData] = useState([])
  const [update,setUpadte]=useState("")
  const getFollowing = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getfollowing/${user?._id}`, { withCredentials: true })
      setFollowingData(data.following)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowing()
  }, [user,update])
  return (
    <div className='following'>
      {
        followingData.map((data, index) => {
          return (
            <FollowersCards key={index} data={data} user={user} setUpadte={setUpadte}/>
          )
        })
      }
    </div>
  )
}

export default Following