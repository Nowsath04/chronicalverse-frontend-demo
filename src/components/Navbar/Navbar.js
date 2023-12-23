import React, { useState } from "react";
import "./Navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBarsStaggered } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import notification from "../../Assets/notification.png";
import NotificationCard from "./NotificationCard";
import { BiSolidPlusCircle } from "react-icons/bi";
import Group_187 from "../../Assets/Group 187.png";
import { Link, useNavigate } from "react-router-dom";
import metamask from "../../Assets/MetaMask_Fox 1.png";
import cancel from "../../Assets/x-circle (1) 1.png";
import { RiArrowDropUpLine } from "react-icons/ri";
import buttonImg from "../../Assets/20230729083313__fpdl_in__young-man-avatar-character-vector-illustration-design_24877-18516_large-transformed 1.png";
import image from "../../Assets/image.png";
import LightBulb from "../../Assets/LightBulb.png";
import profile from "../../Assets/profile.png";
import Signout from "../../Assets/Signout.png";
import menubar from "../../Assets/burger-list-menu-navigation 1.png";
import { FiCopy } from "react-icons/fi";
import eth from "../../Assets/eth 1.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import UserDropDown from "../UserDropDown/UserDropDown";
import { logoutUser } from "../../actions/userAction";
import { loginError, loginRequest, loginSuccess } from "../../Slices/authSlice";
import { toast } from "react-toastify";
import Web3 from "web3";
import expand from "../../Assets/expand_more_FILL0_wght300_GRAD0_opsz24 4.png";
import card_arrow from "../../Assets/card_arrow.png";
import { API_URL } from "../../constants/userConstants";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthentication } = useSelector((selector) => selector.auth);
  const [userActive, setuserActive] = useState(false);
  const [currentAcc, setcurrectAcc] = useState("");
  const [profileImg, setProfileImage] = useState("");
  const [balances, setBalance] = useState("");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const [popup, setpopup] = useState(false);
  const [showConnectSecondButton, setConnectShowSecondButton] = useState(false);
  const [notificationCount, setNotificationCount] = useState("")
  const [notifications, setNotifications] = useState([])
  // update notification when click the notification
  const [updateNoti,setUpdateNoti]=useState("")
  const web3 = new Web3(window.ethereum);
  // connect wallet function
  const connectWallets = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const networkId = await web3.eth.net.getId();
        if (networkId !== "0x13881") {
          try {
            await web3.currentProvider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x13881" }], // Mumbai Testnet chain ID
            });
          } catch (error) {
            console.error("Error switching to Mumbai network:", error);
          }
        }
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = account[0];
        setcurrectAcc(address);
        try {
          const { data } = await axios.post(
            `${API_URL}/generate-nonce`,
            { userid: address },
            { withCredentials: true }
          );
          const nonce = data.user.nonce;
          // create sign  and  send  sign nonce and userid to BE
          const msg = `Welcome to Iwc\n\nThis request will not trigger a blockchain\ntransaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet address:${address}\nNonce:${nonce}`;
          const signature = await web3.eth.personal.sign(msg, address, nonce);
          dispatch(loginUser(address, nonce, signature));
          getUserBalance(address);
          setuserActive(true);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      window.open =
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
    }
  };
  // send user address and get nonce from backend

  // login redux
  const loginUser = (address, nonce, signature) => async (dispatch) => {
    try {
      dispatch(loginRequest());
      const { data } = await axios.post(
        `${API_URL}/verify-login`,
        { userid: address, nonce: nonce, signature: signature },
        { withCredentials: true }
      );
      dispatch(loginSuccess(data.user));
      if (data.user.name.length !== 0) {
        toast.success("login successfull", { theme: "dark" });
        navigate("/profile");
      } else {
        navigate("/editprofile");
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };

  useEffect(() => async () => {
    if (isAuthentication) {
      getUserBalance(user?.userid);
      setuserActive(true);
    } else {
      setuserActive(false);
    }
  });


  useEffect(() => {
    if (user) {
      setProfileImage(user.imgpath);
    }
  
  }, [user]);

  useEffect(()=>{
    getNotificaton()
  },[user,updateNoti])

  // getbalance

  const getUserBalance = async (userAddress) => {
    try {
      const balance = await web3.eth.getBalance(userAddress);
      const balances = balance.toString();
      setBalance(balances.substring(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  // user logout
  const userlogout = () => {
    setuserActive(false);
    setUserDropDown(false);
    dispatch(logoutUser);
    window.location.href = "/";
  };

  const getNotificaton = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/notification/${user._id}`)
      setNotifications(data.draft.reverse())
      const notificatonCount = data.draft.filter(data => data.viewed === false).length
      setNotificationCount(notificatonCount)
    } catch (error) {
      console.log(error);
    }
  }

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(user.userid);
      // Optionally, you can provide user feedback that the text has been copied
      toast.success('Text copied the wallet Address');
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }
  };
  // update notification
  const updateNotification = async () => {
    try {
      const data = await axios.put(`${API_URL}/notification/${user._id}`)
      setUpdateNoti(data)
    } catch (error) {
      console.log();
    }
  }
  
  console.log(isAuthentication);

  return (
    <>
      <header>
        <div className="Navbar_Div">
          <Link className="logo" to={"/"}>
            Logo
          </Link>
          <ul className="Navbar">
            <Link to={"/searchallcard"} className="Link">
              <a>Market place</a>
            </Link>
            <Link to={"/about_us"} className="Link">
              <a>About as</a>
            </Link>
            <Link to={"/contact"} className="Link">
              <a>Contact as</a>
            </Link>
          </ul>
          <div className="search">
            <div className="search_relative">
              <div id="grad_input">
                <input
                  type="text"
                  className="search_input"
                  placeholder="search"
                />
              </div>
              <button className="search_absolute">
                <AiOutlineSearch />
              </button>
            </div>
            <div className="bell_relative">
              <GoBell className="bell_icon" onClick={() => setOpen(!open)} />
              {
                notificationCount == "0" ? "" : <div className="bell_absolute">{notificationCount}</div>
              }

              {open && (
                <div className="notification_mainCard">
                  <div className="bell_arrowbar">
                    <img src={card_arrow} />
                  </div>
                  <div className="bell_notification">
                    <div className="div_notification">
                      <div className="bell_notification_header">
                        <h3>Notification</h3>
                        <button>See all</button>
                      </div>
                      {notifications.map((item, index) => {
                        return <NotificationCard item={item}  user={user} setUpdateNoti={setUpdateNoti} updateNotification={updateNotification} />;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to={"/create_collection"} className="darkbutton1">
              Create
            </Link>
            {userActive ? (
              <div className="nav_userbtn_div">
                <div
                  className="nav_loginuser_div"
                // UserDropDown //
                >
                  <img
                    src={profileImg ? profileImg : buttonImg}
                    alt="im"
                    className="navprofile_img"
                  />
                  <p>
                    0.{balances} <span>MATIC</span>
                  </p>
                  <div className="nav_user_dropdown_btn">
                    <img
                      src={expand}
                      alt="icon"
                      onClick={() => setUserDropDown(!userDropDown)}
                    />
                    {userDropDown && (
                      <div className="UserDropDown_ManuBar">
                        <div className="UserDropDown_ManuBar_div">
                          <div className="Menu_arrowbar_userdropdown">
                            <img src={card_arrow} />
                          </div>
                          <div className="UserDropDown_Heading">
                            <h3>{user ? user.name : ""}</h3>
                            <p>
                             { `${(user.userid).substring(0,20)}....${(user.userid).substring(32)}`}
                              <FiCopy className="Copy_Icon" onClick={handleCopyClick} />
                            </p>
                          </div>
                          <div className="UserDropDown_Box_div">
                            <div className="UserDropDown_Box">
                              <div className="UserDropDown_Box_Content_div">
                                <img src={eth} />
                                <div className="UserDropDown_Box_Content">
                                  <p>Balance</p>
                                  <h3>0.{balances} MATIC</h3>
                                </div>
                              </div>
                              <div className="UserDropDown_Box_button">
                                <button>Manage Metamask</button>
                              </div>
                            </div>
                          </div>
                          <div className="UserDropDown_list_div">
                            <div className="UserDropDown_list">
                              <ul>
                                <li onClick={() => setUserDropDown(false)}>
                                  <img src={profile} />
                                  <Link
                                    className="mypofile_link"
                                    to={"/profile"}
                                  >
                                    My profile
                                  </Link>
                                </li>
                                <hr />
                                <li onClick={() => setUserDropDown(false)}>
                                  <img src={image} />
                                  <Link
                                    className="mypofile_link"
                                    to={"/itemdetails"}
                                  >
                                    My items
                                  </Link>
                                </li>
                                <hr />
                                <li>
                                  <img src={LightBulb} />
                                  Dark theme
                                  <label className="toggle_btn_dropdown">
                                    <input type="checkbox" />
                                    <span className="toggle_btn_dropdown_slider"></span>
                                  </label>
                                </li>
                                <hr />
                                <li onClick={userlogout}>
                                  <img src={Signout} />
                                  Disconnect
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <button
                className={"darkbutton2"}
                onClick={connectWallets}

              >
                Connect wallet
              </button>
            )}

          </div>
        </div>
        {popup && (
          <div className="home_popup_background">
            <div
              className="home_popup"
              style={{ display: popup ? "flex" : "none" }}
            >
              <div className="home_popup_top">
                <div className="home_popup_top_content">
                  <h3>Connect your wallet</h3>
                  <img src={cancel} alt="" onClick={() => setpopup(false)} />
                </div>
                <p>Connect with Metamask Wallet</p>
              </div>
              <div className="home_popup_bottom">
                <div className="home_popup_bottom_content">
                  <img src={metamask} alt="" />
                  <h3>Metamask</h3>
                </div>
                <p>
                  We do not own your private keys and cannot access your funds
                  without your confirmation
                </p>
              </div>
            </div>
          </div>
        )}

      </header>
      <div className="Navbar_header2">
        <div className="Navbar_div2">
          <div className="responsive_Navbar_1">
            <div className="responsive_Navbar_1_heading">
              <Link className="logo" to={"/"}>
                Logo
              </Link>
            </div>
            <Link className="search_navbar" to={"/searchallcard"}>
              <AiOutlineSearch />
            </Link>
          </div>
          <div className="responsive_Navbar_2">
            <Link className="create_link" to={"/create_collection_Page"}>
              <BiSolidPlusCircle className="pluscircle" />
              <span className="create_link_span">Create</span>
            </Link>
            <div className="bell_relative">
              <GoBell className="bell_icon" onClick={() => setOpen(!open)} />
              <div className="bell_absolute"></div>
              {open && (
                <div className="notification_mainCard">
                  <div className="bell_arrowbar_2">
                    <img src={Group_187} />
                  </div>
                  <div className="bell_notification_2">
                    <div className="div_notification">
                      <div className="bell_notification_header">
                        <h3>Notification</h3>
                        <button>See all</button>
                      </div>
                      {notifications.map((item) => {
                        return <NotificationCard item={item} />;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="navbar_responsivebar">
              <img src={menubar} onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && (
                <div className="notification_ManuBar">
                  <div className="notification_ManuBar_div">
                    <div className="Menu_arrowbar">
                      <img src={Group_187} />
                    </div>
                    <ul className="Menu_bar">
                      <a>
                        <li className="Menu_list">Market place</li>
                      </a>
                      <a>
                        <li className="Menu_list">About as</li>
                      </a>
                      <a>
                        <li className="Menu_list">Contact as</li>
                      </a>
                      <a style={{ width: "100%" }}>
                        {showConnectSecondButton ? (
                          <button
                            onClick={() =>
                              setConnectShowSecondButton(
                                !showConnectSecondButton
                              )
                            }
                            className="Menu_list_button"
                          >
                            Connect wallet
                          </button>
                        ) : (
                          <div>
                            <button
                              className="Menu_list_button_responsive"
                              onClick={() =>
                                setConnectShowSecondButton(
                                  !showConnectSecondButton
                                )
                              }
                            >
                              <img src={buttonImg} className="buttonImg" />
                              <p>7.00879</p> <span>ETH</span>
                              <RiArrowDropUpLine className="updropdown" />
                            </button>
                            <div className="hidden_dropdown_div">
                              <div className="UserDropDown_Heading_responsive">
                                <h3>Rabindra de alwiz</h3>
                                <p>
                                  0GFHRYTIU...Y647UHFG
                                  <FiCopy className="Copy_Icon" />
                                </p>
                              </div>
                              <div className="UserDropDown_Box_div_responsive">
                                <div className="UserDropDown_Box_responsive">
                                  <div className="UserDropDown_Box_Content_div_responsive">
                                    <img src={eth} />
                                    <div className="UserDropDown_Box_Content_responsive">
                                      <p>Balance</p>
                                      <h3>7.00879 ETH</h3>
                                    </div>
                                  </div>
                                  <div className="UserDropDown_responsive_Box_button">
                                    <button>Manage Metamask</button>
                                  </div>
                                </div>
                              </div>
                              <div className="UserDropDown_list_div">
                                <div className="UserDropDown_list_responsive">
                                  <ul>
                                    <li>
                                      <img src={profile} />
                                      My profile
                                    </li>
                                    <hr />
                                    <li>
                                      <img src={image} />
                                      My items
                                    </li>
                                    <hr />
                                    <li>
                                      <img src={LightBulb} />
                                      Dark theme
                                      <label className="toggle_btn_responsive_dropdown">
                                        <input type="checkbox" />
                                        <span className="toggle_btn_responsive_dropdown_slider"></span>
                                      </label>
                                    </li>
                                    <hr />
                                    <li>
                                      <img src={Signout} />
                                      Disconnect
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </a>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}