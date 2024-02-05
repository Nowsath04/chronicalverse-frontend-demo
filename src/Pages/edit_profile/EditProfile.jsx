import React from "react";
import "./EditProfile.css";
import edit from "../../asserts/images/edit (3) 1.png";
import arrow from "../../asserts/images/arrow-left (1) 1.png";
import profile_ from "../../asserts/images/profile.png";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons//io";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";

const EditProfile = () => {
  const [image, setimage] = useState("");
  const [userProfile, setUserProfile] = useState([])
  const [content, setContent] = useState("Verify account");
  const [profileimg, setProfileImg] = useState(null);

  const navigate = useNavigate();
  // get user data from redux if user login
  const { user, isAuthentication } = useSelector((selector) => selector.auth);
  // userinitial data
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    email: "",
    url: "",
  });

  // change  content in  ui
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setContent("Verify");
      } else {
        setContent("Verify account");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //get userimge from input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
      setProfileImg(imageUrl);
      console.log(imageUrl);
    }
  };

  // validation for the email
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  // when submit button is cliked this function is on
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!isAuthentication) {
      navigate("/");
      return toast.error("pls connect the metamsk", { theme: "dark" });
    }
    if (!userData.name) {
      return toast.error("pls enter the name", { theme: "dark" });
    }
    if (!userData.email) {
      return toast.error("pls enter the email", { theme: "dark" });
    }
    if (userData.bio.length <50 ) {
      return toast.error("pls enter the bio minimum 50 words", { theme: "dark" });
    }
    if (!userData.bio  ) {
      return toast.error("pls enter the bio", { theme: "dark" });
    }
    if (!validateEmail(userData.email)) {
      return toast.error("pls enter the validate email", { theme: "dark" });
    }
    if (!user) {
      return toast.error("pls select the image", { theme: "dark" });
    }
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("bio", userData.bio);
    formData.append("url", userData.url);
    formData.append("image", image);
    console.log(...formData);
    try {
      const updateUser = await axios.post(
        `${API_URL}/update-user`,
        formData,
        { withCredentials: true }
      );
      toast.success("successfuly Updated", { theme: "dark" });
      navigate("/profile/collectibles");
    } catch (error) {
      console.log(error);
    }
  };

  // the handle change for input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // this one to update value  if user data is present and  set the value in inputfield
  const updateMultipleValues = (updatedValues) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...updatedValues,
    }));
  };

  useEffect(() => {
    if (userProfile) {
      updateMultipleValues({
        name: userProfile.name,
        bio: userProfile.bio,
        email: userProfile.email,
        url: userProfile.url,
      });
      setProfileImg(userProfile.imgpath);
    }
  }, [userProfile]);

  console.log(profileimg, "hi");
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/myprofile`, { withCredentials: true })
      setUserProfile(data.user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const clearFunction=()=>{
    updateMultipleValues({
      name: "",
      bio: "",
      email: "",
      url: "",
    });
    setimage("")
    setProfileImg("")
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="editprofile">
      <div className="editprofile_container">
        <div className="editprofile_heading">
          <img src={arrow} alt="" onClick={goBack} />
          <AiOutlineLeft className="editprofile_responsive_arrowbar"  />
          <div>
            <h4>Edit profile</h4>
            <p>
              You can set preferred display name, create your profile URL and
              manage other personal setting
            </p>
          </div>
        </div>
        <form className="editprofile_section" onSubmit={handlesubmit}>
          <div className="editprofile_section_left">
            <div className="editprofile_section_icon_section">
              <img
                src={profileimg ? profileimg : profile_}
                alt=""
                className="editprofile_image"
              />
              <img src={edit} alt="" className="edit_icon" />
            </div>

            <div>
              <p className="editprofile_section_left_heading">Profile photo</p>
              <p>We recommend an image of at least 400x400. Gifts work too </p>
              <div>
                <label for="pic_edit">Upload</label>
              </div>
              <input type="file" id="pic_edit" onChange={handleImageChange} />
            </div>
          </div>
          <div className="editprofile_section_right">
            <div className="editprofile_section_right_acc_ifo">
              <p>Account info</p>
              <div className="editprofile_section_right_input">
                <p>Display name</p>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="editprofile_section_right_input">
                <p>Custom URL</p>
                <div>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={userData.url}
                    name="url"
                  />
                </div>
              </div>{" "}
              <div class="editprofile_section_right_input">
                <p>Email *</p>
                <div>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={userData.email}
                    name="email"
                  />
                </div>
              </div>
              <div className="editprofile_section_right_input_area">
                <p>Bio</p>
                <div>
                  <textarea
                    type="text"
                    onChange={handleChange}
                    value={userData.bio}
                    name="bio"
                  ></textarea>
                </div>
              </div>
              <p>Social</p>
              <div className="editprofile_section_right_input">
                <p>Portfolio or website</p>
                <div>
                  <input type="text" />
                </div>
              </div>
              <div className="editprofile_section_right_input">
                <p>Twitter</p>
                <div>
                  <button type="button">{content}</button>
                  <input type="text" />
                </div>
              </div>
              <div className="add_more">
                <button type="button">{<AiOutlinePlus />}Add more social account</button>
              </div>
              <div className="editprofile_section_right_input_submit">
                <div>
                  <p onClick={clearFunction}>
                    Clear all
                    <IoMdCloseCircleOutline />
                  </p>
                  <input type="submit" value="Update profile" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
