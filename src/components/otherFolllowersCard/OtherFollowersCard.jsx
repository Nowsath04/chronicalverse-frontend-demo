import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/userConstants'
import { toast } from 'react-toastify'

const OtherFollowersCard = ({ data,setUpadte }) => {
    const [logedUser, setLogedUser] = useState(false)
    const { user } = useSelector((selector) => selector.auth);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        if (user?._id == data?._id) {
            setLogedUser(true)
        }
    }, [user, data])

    const handleUnFollowing = async () => {
        const data2 = {
            userid: user._id,
            unfollowerid: data._id
        }
        try {
            const data1 = await axios.post(`${API_URL}/unfollowing/${user._id}/${data._id}`, data2, { withCredentials: true })
            setUpadte(data1)
            setFollowing(false)
            toast.success(`you unfollow ${data.name}`)
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowers = async () => {
        try {
            const following = await axios.get(`${API_URL}/getfollowing/${user?._id}`, { withCredentials: true })
            following.data.following.map((value) => {
                if (value._id == data._id) {
                    setFollowing(true)
                }
            })

        } catch (error) {
            console.log(error);
        }
    }


       // handle following
       const handleFollowing = async () => {
        const data1 = {
            follower: user._id,
            following: data._id
        }
        try {
            const following = await axios.post(`${API_URL}/following/${user._id}/${data._id}`, data1, { withCredentials: true })
            setUpadte(following)
            setFollowing(true)
            toast.success(`you following ${data.name}`)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFollowers()
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
                   !user?"": logedUser ? "" :following? <button onClick={handleUnFollowing}>unfollow</button>: <button onClick={handleFollowing}>follow</button>
                }
            </div>
        </div>
    )
}

export default OtherFollowersCard
