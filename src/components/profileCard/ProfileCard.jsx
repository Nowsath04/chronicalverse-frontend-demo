import React from "react";
import "./ProfileCard.css";
// import cardimg from "../../asserts/images/WhatsApp Image 2023-07-27 at 1.19 8.png";
import heart from "../../asserts/images/heart.png";
import { Link } from "react-router-dom";
const ProfileCard = ({ data }) => {
  return (
    <div className="ProfileCard">
      <img src={data.image} alt="" />
      <div className="ProfileCard_name">
        <p>{data.nft_name}</p>
        <div className="heart_value">
          <img src={heart} alt="" />
          <p>{data.likes}</p>
        </div>
      </div>
      <div className="ProfileCard_paragraph">
        <p>
          {`${data.nft_description.substring(0, 95)} ...`}
        </p>
      </div>
      <div className="ProfileCard_bid">
        <p>Current bid</p>
        <div>{data.price}</div>
      </div>
      <div className="ProfileCard_bid_dollor">
        <p>{data.price_USD}</p>
      </div>
      <Link to={data.pathname}>View Details</Link>
    </div>
  );
};

export default ProfileCard;
