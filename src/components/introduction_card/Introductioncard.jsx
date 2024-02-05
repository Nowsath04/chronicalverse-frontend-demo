import React from "react";
import heart from "../../asserts/images/heart.png";
import "./Introduction_card.css";
import { Link } from "react-router-dom";
const introduction_cardcard = ({ data,usd }) => {
  return (
    <div className="introduction_card">
      <img src={data?.image} alt="" />
      <div className="introduction_card_name">
        <p>`${data?.nft_name.substring(0, 30)}...`</p>
      </div>
      <div className="introduction_card_bid">
        <p>Current bid</p>
        <div>{data?.amount}</div>
      </div>
      <div className="introduction_card_bid_dollor">
        <p>{`$ ${data?.amount* usd}`}</p>
      </div>
      <Link to={"/searchallcard"}>View more</Link>
    </div>
  );
};

export default introduction_cardcard;
