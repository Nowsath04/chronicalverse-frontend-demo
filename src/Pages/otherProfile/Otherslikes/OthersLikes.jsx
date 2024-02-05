import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { API_URL } from '../../../constants/userConstants';
import { useParams } from 'react-router-dom';
import ProfileCard from '../../../components/profileCard/ProfileCard';
import Slider from 'react-slick';

const OthersLikes = () => {
  const [likedNft, setLikedNft] = useState([])
  const { id } = useParams()
  const slider = useRef(null);
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
    window.scrollTo(0, 0);
  }, []);

  const getLikedNft = async (userid) => {
    try {
      const { data } = await axios.get(`${API_URL}/likeNft/${userid}`)
      console.log(data);
      const nftdata = data.likedNft
      setLikedNft(nftdata)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${id}`)
      getLikedNft(data.user._id)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
    <div className="OnSale">
      {likedNft?likedNft?.map((data, index) => {
        return <ProfileCard data={data} />;
      }):<div>
        No likes found
      </div>}
    </div>
    <div className="onsale_responsive">
      <Slider ref={slider}  {...settings}>
        {likedNft?likedNft?.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <ProfileCard  data={data} />
            </React.Fragment>
          );
        }):<div>
          No likes found
        </div>}
      </Slider>
    </div>
  </>
  )
}

export default OthersLikes