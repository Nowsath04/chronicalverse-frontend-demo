import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import profilebanner from "../../Assets/OIP (6).jpeg";
import profile_pic from "../../asserts/images/propile_pic.png";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import copy from "../../asserts/images/copy (2) 1.png";
import share from "../../asserts/images/share-2 1.png";
import dots from "../../asserts/images/dots.png";
import { Headings } from "./Data";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import { toast } from "react-toastify";

const OthersProfile = () => {

  const { id } = useParams()
  const [sameProfile, setSameProfile] = useState(false)
  const [image, setImage] = useState("");
  const [bannerImg, setBannerImg] = useState(null);
  const [otherUser, setOtherUser] = useState([])
  const [allreadyFollow, setAllreadyFollow] = useState(false)
  const { user } = useSelector((selector) => selector.auth);

  //get userimge from input
  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   console.log(file);
  //   // Get the selected file
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
  //     console.log(imageUrl);
  //     setBannerImg(imageUrl);
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     try {
  //       const data = await axios.post(
  //         "http://localhost:5000/update-avatar",
  //         formData,
  //         { withCredentials: true }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // request for ipfs

  // rendering for user



  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${id}`)
      console.log(data);
      if (user?._id === data.user?._id) {
        setSameProfile(true)
      }
      setOtherUser(data.user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData()

  }, [user])

  useEffect(() => {
    if (otherUser) {
      getFollwing()
    }
  }, [otherUser])

  const handleFollowing = async () => {
    const data1 = {
      follower: user._id,
      following: otherUser._id
    }
    try {
      const { data } = await axios.post(`${API_URL}/following/${user._id}/${otherUser._id}`, data1, { withCredentials: true })
      setAllreadyFollow(true)
      toast.success(`you following ${otherUser.name}`)
    } catch (error) {
      console.log(error);
    }
  }

  // get folowing for button showing
  const getFollwing = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getfollowing/${user?._id}`, { withCredentials: true })
      data.following.map((data) => {
        if (data._id == otherUser?._id) {
          console.log("yes");
          setAllreadyFollow(true)
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  // unfollow 

  const handleUnFollowing = async () => {
    const data2 = {
      userid: user._id,
      unfollowerid: otherUser._id
    }
    try {
      const { data } = await axios.post(`${API_URL}/unfollowing/${user._id}/${otherUser._id}`, data2, { withCredentials: true })
      setAllreadyFollow(false)
      toast.success(`you unfollow ${otherUser.name}`)

    } catch (error) {
      console.log(error);
    }
  }
  const userProfileCopy = () => {
    var currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
    toast.success('User URL copied');
  }


  const handleCopyClick =() => {
      navigator.clipboard.writeText(otherUser?.userid);
      toast.success('wallet Address copied');
  };
  return (
    <div className="profile">
      <div className="profile_section">
        <div className="profilebanner_bg">
          <div></div>
          <img src={(otherUser.coverimg ? otherUser.coverimg : profilebanner)} alt="banner_img" />
        </div>
        <div className="profile_pic">
          <img src={otherUser ? otherUser.imgpath : ""} alt="" />
          <div className="profile_pic_link">
          </div>
        </div>
        <div className="profile_container">
          <h3>{otherUser ? otherUser.name : ""}</h3>
          <div className="profile_link">
            <div className="profile_link_left">
              <div className="profile_link_content">
                <div>{`${otherUser?.userid?.substring(0, 28)}...${otherUser?.userid?.substring(32)}`}</div>
                <img src={copy} alt="" onClick={handleCopyClick} />
              </div>
            </div>
            <div className="profile_link_right">
              {(!user || sameProfile) ? "" : allreadyFollow ? <button className="follow_btn" onClick={handleUnFollowing}>unFollow</button> :
                <button className="follow_btn" onClick={handleFollowing}>Follow</button>}


              <div className="profile_share">
                <button onClick={userProfileCopy}>
                  <img src={share} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="profile_dec">


            {otherUser.bio}
          </div>
          <div className="profile_link_right_responsive">
            <button className="follow_btn">Follow</button>
            <div className="profile_share">
              <button>
                <img src={share} alt="" />
              </button>
            </div>
          </div>
          <div className="profile_nav">
            {Headings.map((data, index) => {
              return (
                <NavLink
                  to={`${data.to}/${id}`}
                  className={({ isActive }) =>
                    isActive ? "profile_active" : ""
                  }
                >
                  {data.heading}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      <div className="profile_nav_router">
        <Outlet />
      </div>
    </div>
  );
};

export default OthersProfile;
