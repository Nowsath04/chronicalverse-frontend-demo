import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileCard from '../../../components/profileCard/ProfileCard';
import Slider from 'react-slick';
import axios from 'axios';
import { API_URL } from '../../../constants/userConstants';

const Likes = () => {
  const slider = useRef(null);
  const { user } = useSelector((selector) => selector.auth);
  const [likedNft, setLikedNft] = useState([])
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

  useEffect(() => {
    getLikedNft()
  }, [user])

  const getLikedNft = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/likeNft/${user?._id}`)
      const nftdata = data.likedNft
      setLikedNft(nftdata)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="OnSale">
        {likedNft ? likedNft?.map((data, index) => {
          return <ProfileCard data={data} />;
        }) : <div>
          No likes found
        </div>}
      </div>
      <div className="onsale_responsive">
        <Slider ref={slider}  {...settings}>
          {likedNft ? likedNft?.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <ProfileCard data={data} />
              </React.Fragment>
            );
          }) : <div>
            No likes found
          </div>}
        </Slider>
      </div>
    </>
  )
}

export default Likes