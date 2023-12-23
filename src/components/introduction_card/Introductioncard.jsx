import React from "react";
import heart from "../../asserts/images/heart.png";
import "./Introduction_card.css";
const introduction_cardcard = ({ data }) => {
  return (
    <div className="introduction_card">
      <img src={data.img} alt="" />
      <div className="introduction_card_name">
        <p>Metaverse man</p>
        <div>
          <img src={heart} alt="" />
          <p>{data.likes}</p>
        </div>
      </div>
      <div className="introduction_card_bid">
        <p>Current bid</p>
        <div>{data.price}</div>
      </div>
      <div className="introduction_card_bid_dollor">
        <p>{data.price_USD}</p>
      </div>
      <button>Place bid</button>
    </div>
  );
};

export default introduction_cardcard;
