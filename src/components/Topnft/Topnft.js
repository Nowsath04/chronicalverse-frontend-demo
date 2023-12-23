import "./Topnft.css";
import { PiArrowCircleLeftBold, PiArrowCircleRightBold } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card1 from "../Card-1/Card1";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cardDetails } from "./data1";
import { useEffect, useRef, useState } from "react";
import React from "react";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import { useSelector } from "react-redux";

export default function Topnft() {
  const { userid } = useSelector((selector) => selector.auth);
  console.log(userid);
  const slider = useRef(null);
  const [allUser, setAllUser] = useState([])
  const [headingContent, setHeadingContent] = useState("This Week");
  const [filter1, setFilter1] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [filterTrue, setFilterTrue] = useState(false);
  const filter1div = () => {
    setFilter1(!filter1);
    setFilterTrue(!false);
  };
  const getAllUser = async() => {
    try {
      const {data}  = await axios.get(`${API_URL}/getalluser`)
      const otherUser=data.allUser.filter(data=>data.userid ===Number(userid)) 
      console.log("otherUser",otherUser);
       setAllUser(data.allUser)
    } catch (error) {
      console.log(error);
    }
    }
  
    useEffect(() => {
      getAllUser()
    },[])
  const handleDropdownItemClick = (newContent) => {
    setHeadingContent(newContent);
    setDropDown(false);
    // Close the dropdown when an item is clicked
  };

  const handleSubmit = () => {
    setDropDown(!dropdown);
    setFilterTrue(!filterTrue);
  };

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 928,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "100px",
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 610,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "100px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "45px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "35px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "30px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 415,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "25px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 410,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "35px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "30px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };


  return (
    <>
      <div className="TopNft">
        <div className="TopNft_div">
          <div className="TopNft_header_Div">
            <div className="TopNft_grident"></div>
            <h1 className="TopNft_header">
              Out top <span>NFT</span> artists
            </h1>
          </div>
          <div className="dropdown_div">
            <div class="dropdown">
              <RiArrowDropDownLine
                className={filterTrue ? "dropicon_up" : "dropicon"}
                onClick={handleSubmit}
              />
              <div className="dropbtn" onClick={filter1div}>
                {headingContent}
              </div>
              {dropdown && (
                <div className="Thisweek_dropdown">
                  <div
                    className="Thisweek_dropdown_option"
                    onClick={() => handleDropdownItemClick("This week")}
                  >
                    This week
                  </div>
                  <div
                    className="Thisweek_dropdown_option"
                    onClick={() => handleDropdownItemClick("This month")}
                  >
                    This month
                  </div>
                  <div
                    className="Thisweek_dropdown_option"
                    onClick={() => handleDropdownItemClick("This year")}
                  >
                    This year
                  </div>
                </div>
              )}
            </div>
            <button className="leftarrow">
              <PiArrowCircleLeftBold
                className="leftarrowIcon"
                onClick={() => slider?.current?.slickPrev()}
              />
            </button>
            <button className="rightarrow">
              <PiArrowCircleRightBold
                className="rightarrowIcon"
                onClick={() => slider?.current?.slickNext()}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="card_1box">
        <Slider ref={slider} {...settings}>
          {allUser && allUser.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card1 item={item} />
              </React.Fragment>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
