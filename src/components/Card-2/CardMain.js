import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { PiArrowCircleLeftBold, PiArrowCircleRightBold } from "react-icons/pi";
import Card2 from "./Card2";
import { cardDetails2 } from "./data2";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import ProfileCard from "../profileCard/ProfileCard";
import HotCollectionCard from "../hotCollectionCard/HotCollectionCard";

export default function CardMain() {
  const slider = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardLength, setCardLength] = useState(0)

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
  const [hotCollection, setHotCollection] = useState([])

  useEffect(() => {
    geTopCollection()
  }, [])

  const geTopCollection = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/hot-collection`)
      setHotCollection(data.topCollection)
      setCardLength(data.topCollection.length)

    } catch (error) {
      console.log(error);
    }
  }
  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', updateWindowDimensions);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="TopNft_header_Div2">
        <div className="TopNft_header_content">
          <h1 className="TopNft_header2">Top collections</h1>
          <div className="cardnftarrowbutton">
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

      <div className="card_2box">

        {
          (cardLength < 4 && windowWidth > 530) ? <div className="artistcard_len">
             {hotCollection && hotCollection.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <HotCollectionCard data={item} />
                </React.Fragment>
              );
            })}
          </div> : <Slider ref={slider} {...settings}>
            {hotCollection && hotCollection.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <HotCollectionCard data={item} />
                </React.Fragment>
              );
            })}
          </Slider>
        }

      </div>
    </>
  );
}
