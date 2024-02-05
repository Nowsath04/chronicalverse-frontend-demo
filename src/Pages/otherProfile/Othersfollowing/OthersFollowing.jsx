import React, { useState } from 'react'
import { Follower } from '../Data'
import FollowersCards from '../../../components/followers_card/FollowersCards'
import "./OthersFollowing.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../constants/userConstants'
import OtherFollowingCard from '../../../components/otherFollowingCard/OtherFollowingCard'
const OthersFollowing = () => {

  const { id } = useParams()
  const [otherUser, setOtherUser] = useState([])
  const [following,setFollowing]=useState([])
  const [update,setUpadte]=useState("")

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${id}`)
      getFollwing(data.user._id)
      setOtherUser(data.user)
    } catch (error) {
      console.log(error);
    }
  }

  const getFollwing = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/getfollowing/${id}`, { withCredentials: true })
      setFollowing(data.following)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useState(() => {
    if(id){
      getUserData()
    }
  }, [update,id])
  return (
    <div className='following'>
      {
        following.map((data, index) => {
          return (
            <OtherFollowingCard key={index} data={data} setUpadte={setUpadte} />
          )
        })
      }
    </div>
  )
}

export default OthersFollowing