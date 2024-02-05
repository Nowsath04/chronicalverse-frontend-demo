import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import card1 from "../../asserts/images/card1.png";
import Introductioncard from "../../components/introduction_card/Introductioncard";
import heart from "../../asserts/images/heart.png";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import { Link } from "react-router-dom";

const Aboutus = () => {
  const [nft, setNft] = useState([])
  const [usd, setUsd] = useState("")
  const data = {
    img: card1,
    id: "1",
    likes: "43",
    price: "4.83ETHe",
    price_USD: "$10,000.56",
  };

  const getAllNft = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/nft-all-data`)
      const nfts = data.data.reverse().slice(0, 3)
      setNft(nfts)
      console.log(nfts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNft()
    getUsd()
  }, [])

  const getUsd = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
      const data = await response.json();

      const maticToUSDExchangeRate = data['matic-network'].usd;
      setUsd(maticToUSDExchangeRate)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about">
      <div className="about_use">
        <p>ABOUT US</p>
        <h4>Sustainable Innovation in the Open Digital Economy</h4>
        <div>
          Embracing the Future with NFTs using state-of-the-art technology
          brought us together to Designing the ultimate destination for NFT
          lovers and collectors to connect.
        </div>
      </div>
      <div className="introduction">
        <div className="introduction_container">
          <div className="introduction_container_left">
            <h4>Introduction</h4>
            <p>
              With our inception in 2023, [Your Company Name] is committed to
              revolutionizing the Digital NFT market. We provide a safe and
              intuitive platform for NFT enthusiasts to buy, sell, and securely
              store their NFT-backed digital collections. Our team's expertise
              in the industry and technology drives us to deliver an
              unparalleled Digital market experience worldwide.
            </p>
          </div>
          <div className="introduction_container_right">
            <div className="small_card">
              <div className="introduction_card_big" style={{ zIndex: "5" }}>
                <img src={nft[1]?.image} alt="" />
                <div className="introduction_card_big_name">
                  <p>{`${nft[1]?.nft_name.substring(0, 30)}...`}</p>

                </div>
                <div className="introduction_card_big_bid">
                  <p>price</p>
                  <div>{nft[1]?.amount} MATIC</div>
                </div>
                <div className="introduction_card_bid_dollor">
                  <p>{`$ ${nft[1]?.amount * usd}`}</p>
                </div>
                <div className="introduction_card_bid_dollor">

                </div>
                <Link to={"/searchallcard"}>View more</Link>
              </div>
              <Introductioncard data={nft[0]} usd={usd}/>
              <Introductioncard data={nft[2]} usd={usd}/>
            </div>
          </div>
        </div>
      </div>
      <div className="our_mission">
        <h4>Our mission</h4>
        <p>
          Empowering digital NFT market enthusiasts to create and discover rare
          digital NFTs.
        </p>
      </div>
      <div className="our_story">
        <h4>Our story</h4>
        <p>
          [Your Company Name] was brought to life through the common vision of
          our co-founders, [Founder 1] and [Founder 2]. With a deep passion for
          the Digital NFT market, they recognized the untapped potential in
          leveraging blockchain technology. Eager to establish a marketplace
          that is both transparent and secure for digital NFT collectors, they
          united a team of highly skilled and diverse individuals to turn their
          vision into reality.
        </p>
        <div className="about_img">
          <div></div>
          <div className="about_detail">
            <div>
              <h4>2023</h4>
              <p>Founded</p>
            </div>
            <div>
              <h4>1234</h4>
              <p>User</p>
            </div>
            <div>
              <h4>1234</h4>
              <p>Creator</p>
            </div>
            <div>
              <h4>1234</h4>
              <p>Art works</p>
            </div>
          </div>
        </div>
      </div>
      <div className="our_team">
        <h4>Our team</h4>
        <p>
          "Unleashing the potential of digital NFT enthusiasts to navigate the
          realm of NFT creativity”
        </p>
        <div className="profile_our_card">
          <div className="profile_our_card1"></div>
          <div className="profile_our_card1"></div>
        </div>
      </div>
      <div className="our_future">
        <div>
          <h4>Our future</h4>
          <p>
            Our journey of growth and advancement remains steadfast at [Your
            Company Name]. We are unwavering in our mission to deliver a safe
            and seamless experience to our valued users. As we embrace new
            possibilities, expand our range of offerings, and cultivate a lively
            community of Digital NFT collectors and enthusiasts."
          </p>
        </div>
        <div>
          <p className="our_future_p">
            {" "}
            Join hands with us as we redefine what's possible in the world of
            Digital NFTs
          </p>
        </div>
        <Link to={"/contact"}>Join now</Link>
      </div>
    </div>
  );
};

export default Aboutus;
