import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import profilebanner from "../../asserts/images/profileBanner.png";
import profile_pic from "../../asserts/images/propile_pic.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import copy from "../../asserts/images/copy (2) 1.png";
import share from "../../asserts/images/share-2 1.png";
import dots from "../../asserts/images/dots.png";
import { Headings } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import { LoadingUser } from "../../actions/userAction";

const Profile = () => {
  const { user } = useSelector((selector) => selector.auth);
  const dispatch = useDispatch()
  const [image, setImage] = useState("");
  const [bannerImg, setBannerImg] = useState(null);

  //get userimge from input
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
      console.log(imageUrl);
      setBannerImg(imageUrl);
      const formData = new FormData();
      formData.append("image", file);
      try {
        const data = await axios.post(
          `${API_URL}/update-avatar`,
          formData,
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // request for ipfs

  // rendering for user
  useEffect(() => {
    if (user) {
      setBannerImg(user.coverimg);
    }
  }, [user]);
  useEffect(() => {
    dispatch(LoadingUser);
  },[]);

  console.log(user);

  return (
    <div className="profile">
      <div className="profile_section">
        <div className="profilebanner_bg">
          <div></div>
          <img src={bannerImg ? bannerImg : profilebanner} alt="banner_img" />
        </div>
        <div className="profile_pic">
          <img src={user ? user.imgpath : profile_pic} alt="" />
          <div className="profile_pic_link">
            <Link to={"/editprofile"}>Edit profile</Link>
            <label for="file" className="edit_cover_button">
              Edit cover
            </label>
            <input type="file" id="file" onChange={handleImageChange} />
          </div>
        </div>
        <div className="profile_container">
          <h3>{user ? user.name : "Name"}</h3>
          <div className="profile_link">
            <div className="profile_link_left">
              <div className="profile_link_content">
                <div>0GFHRYTIU77XJXZNXCJHSJH......TEY647UHFG</div>
                <img src={copy} alt="" />
              </div>
            </div>
            <div className="profile_link_right">
              <div className="profile_share">
                <button>
                  <img src={share} alt="" />
                </button>
              </div>
              <div className="profile_more">
                <button>
                  <img src={dots} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="profile_dec">
            {user
              ? user.bio
              : ` Lorem ipsum dolor sit amet consectetur. Donec ac natoque ac non
            velit. Sed egestas consequat volutpat ac rutrum duis. Euismod massa
            donec dignissim vitae mauris etiam tellus.`}
          </div>
          <div className="profile_link_right_responsive">
            <button className="follow_btn">Follow</button>
            <div className="profile_share">
              <button>
                <img src={share} alt="" />
              </button>
            </div>
            <div className="profile_more">
              <button>
                <img src={dots} alt="" />
              </button>
            </div>
          </div>
          <div className="profile_nav">
            {Headings.map((data, index) => {
              return (
                <NavLink
                  to={data.to}
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

export default Profile;
