import axios from 'axios';
import React from 'react'
import { API_URL } from '../../../constants/userConstants';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileCard from '../../../components/profileCard/ProfileCard';
import Slider from 'react-slick';
import { useRef } from 'react';

const Created = () => {
  const [createdNft, setCreatedNft] = useState([])
  const slider = useRef(null);
  const { user } = useSelector((selector) => selector.auth);
  console.log(user);
  const settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerMode: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
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
  const getUserAllNft = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user-creatednft/${user.userid}`)
      console.log(data);
      setCreatedNft(data.getnft)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getUserAllNft()
  }, [])
  return (
    <>
      <div className="OnSale">
        {createdNft.length !==0 ? createdNft?.map((data, index) => {
          return <ProfileCard data={data} />;
        }) : <div>
          No NFT in Create
        </div>}
      </div>
      <div className="onsale_responsive">
        <Slider ref={slider}  {...settings}>
          {createdNft.length !==0 ? createdNft?.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <ProfileCard data={data} />
              </React.Fragment>
            );
          }) : <div>
            No NFT in Create
          </div>}
        </Slider>
      </div>
    </>
  )
}

export default Created
