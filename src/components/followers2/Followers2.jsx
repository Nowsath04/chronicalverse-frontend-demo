import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { API_URL } from '../../constants/userConstants'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Followers2 = ({ data ,setupdate }) => {

    const { user } = useSelector((selector) => selector.auth);
    const [following, setFollowing] = useState(false)

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

    useEffect(() => {
        getFollowers()
    }, [user, data])
    // handle unfollowing
    const handleUnFollowing = async () => {
        const data2 = {
            userid: user._id,
            unfollowerid: data._id
        }
        try {
            const data1 = await axios.post(`${API_URL}/unfollowing/${user._id}/${data._id}`, data2, { withCredentials: true })
            setFollowing(false)
            setupdate(data1)
            toast.success(`you unfollow ${data.name}`)
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
            setupdate(following)
            setFollowing(true)
            toast.success(`you following ${data.name}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="followers_card">
            <div className="followers_card_left">
                <img src={data.imgpath} alt="" />
                <BsFillCheckCircleFill className="followers_check_icon" />
                <div>
                    <h5>{data.name}</h5>
                    <p>{data.followers.length}</p>
                </div>
            </div>
            <div className="followers_card_right">
                {following ? <button onClick={handleUnFollowing} >unfollow</button > : <button onClick={handleFollowing} >follow</button>}
            </div>
        </div>
    )
}

export default Followers2
