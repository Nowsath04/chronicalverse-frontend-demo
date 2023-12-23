import React, { useEffect, useState } from "react";
import "./Home.css";
import monalisa from "../../Assets/mona-lisa.png";
import UploadNotification from "../../components/Upload/UploadNotification";
import axios from "axios";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/userConstants";

export default function Home() {

  const [popup, setPopup] = useState(false);
  const [data,setData]=useState([])
  const [count, setCount] = useState(0)
  const [disabledBack, setDisableBack] = useState(false)
  const [disabledFront, setDisableFront] = useState(false)
  const [filterData, setfilterData] = useState([])
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

const fetchDataFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-auction`);
    const data = response.data.draft;
    setData(data)
    return data;
  } catch (error) {
    console.error("Error fetching auction data:", error);
    return [];
  }
};

useEffect(()=>{
   fetchDataFromBackend();
},[])

const fetchAuctionEndTime = async () => {


  if (data.length > 0) {
    const currentTime = Math.floor(Date.now() / 1000);
    const filterData = data.filter(item => item.endTime > currentTime);

    if (filterData.length > 0) {
      filterData.sort((a, b) => a.endTime - b.endTime);
      setfilterData(filterData);

      const endTimeTimestamp = parseInt(filterData[count].endTime, 10); // Use index 0
      const timeRemaining = Math.max(0, endTimeTimestamp - currentTime);

      const remainingHours = Math.floor(timeRemaining / 3600);
      const remainingMinutes = Math.floor((timeRemaining % 3600) / 60);
      const remainingSeconds = timeRemaining % 60;

      setTime({ hours: remainingHours, minutes: remainingMinutes, seconds: remainingSeconds });
    } else {
      setTime({ hours: 0, minutes: 0, seconds: 0 });
    }
  }
};

useEffect(() => {
  const fetchDataAndUpdateTime = async () => {
    await fetchAuctionEndTime();
  };

  fetchDataAndUpdateTime(); // Initial fetch

  const intervalId = setInterval(fetchDataAndUpdateTime, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, [data,count]);


  const togglePopup = () => {
    setPopup(!popup);
  };
  const handleBackward = () => {
    if (count <= 0 || count === 0) {
      setDisableBack(true)
    } else {
      setCount(count - 1)
      setDisableFront(false)

    }

  }
  const handleForward = () => {
    const arrayCount=filterData.length-1
    if (count > arrayCount ||(arrayCount) ===count) {
      setCount(arrayCount)
     return setDisableFront(true);
      
    }
    setCount(count + 1);
    setDisableBack(false);
  };



  // update more nft

  return (
    <>
      <div className="Home">
        <div className="Home_content">
          <div className="responsive_home_content">
            <div className="Home_heading">
              {
                filterData ? filterData[count]?.collectionName : ""
              }
            </div>
            <p className="Home_paragraph">
             {filterData ? filterData[count]?.description.substring(0,150)+"..." : ""}
            </p>
          </div>
          <div className="Image_Page_responsive">
            <div className="rounded_div">
              <div className="rounded_div_all">
                <img src={filterData ? filterData[count]?.image : ""} className="Monalisa_Img_responsive" alt="" />
                <div className="round_div1_responsive"></div>
                <div className="round_div2_responsive"></div>
                <div className="round_div3_responsive"></div>
                <div className="Home_backroundGrident1"></div>
                <div className="Home_backroundGrident2"></div>
              </div>
            </div>
          </div>
          <div className="Home_timebox">
            <div className="Home_timeContent">
              <div className="Home_RightContent">
                <div
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    color: "#FFFFFF",
                  }}
                  className="currentbid_timebox_content"
                >
                  Current bid
                </div>
                <div
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                  className="eth_timebox_content"
                >
                  {filterData ? filterData[count]?.auctionPrice : ""} MATIC
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    marginTop: "12px",
                    color: "#B8B8B8",
                  }}
                  className="amount_timebox_content"
                >

                </div>
              </div>
              <span>
                <div className="spandiv"></div>
              </span>
              <span>
                <div className="Home_LeftContent">
                  <div
                    style={{
                      marginBottom: "12px",
                      color: "#FFFFFF",
                      fontSize: "16px",
                    }}
                    className="action_timebox_content"
                  >
                    Auction ends in
                  </div>
                  <div
                    className="Time_duration"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    <div>{time.hours}</div>
                    <div>{time.minutes}</div>
                    <div>{time.seconds}</div>
                  </div>
                  <div
                    className="Time_stamp"
                    style={{
                      fontSize: "16px",
                      marginTop: "12px",
                      color: "#B8B8B8",
                    }}
                  >
                    <div>hr</div>
                    <div>sec</div>
                    <div>min</div>
                  </div>
                </div>
              </span>
            </div>
            <div className="HomeDownButton_div">
              <button onClick={togglePopup} className="HomeDownButton">
                Place bid
              </button>

              <Link to={filterData ? filterData[count]?.pathname : "/"} className="HomeDownButton link" >View detail</Link>
            </div>
            <div className="home_left_btn_group">
              <button onClick={handleBackward} disabled={disabledBack}  ><FaRegArrowAltCircleLeft className="icon" /></button>

              <button onClick={handleForward} disabled={disabledFront}><FaRegArrowAltCircleRight className="icon" /></button>
            </div>
          </div>
        </div>
        <div className="Image_Page">
          {/* <div className="rounded_div"> */}
          <div className="rounded_div_all">
            <img src={filterData ? filterData[count]?.image : ""} className="Monalisa_Img" alt="" />
            <div className="Home_backroundGrident1"></div>
            <div className="Home_backroundGrident2"></div>
            <div className="round_div1"></div>
            <div className="round_div2"></div>
            <div className="round_div3"></div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* GRADIENT BAR */}
      <div className="Main_Bar">
        <div className="Bar_div">
          <div className="Bar_count">
            <div>1050+</div>
            <div>500+</div>
            <div>200+</div>
          </div>
          <div className="Bar_passion">
            <div>User’s</div>
            <div className="bar_artist">Artists</div>
            <div className="bar_artwork">Artworks</div>
          </div>
        </div>
      </div>
    </>
  );
}
