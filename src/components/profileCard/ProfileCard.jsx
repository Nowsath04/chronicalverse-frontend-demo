import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
// import cardimg from "../../asserts/images/WhatsApp Image 2023-07-27 at 1.19 8.png";
import heart from "../../asserts/images/heart.png";
import { Link } from "react-router-dom";
const ProfileCard = ({ data }) => {
  const [instantSale, setInstantSale] = useState(false)
  const [putOnSale, setPutOneSale] = useState(false)
  useEffect(() => {
    if (data?.type == "instantSale") {
      setInstantSale(true)
    }
    if (data?.type == "putonsale") {
      setPutOneSale(true)
    }
  }, [data])
  console.log(data);
  return (
    <div className="ProfileCard">
      <img src={data?.image} alt="" />
      <div className="ProfileCard_name">
        <p>{`${data?.nft_name.substring(0, 30)}...`}</p>
        <div className="heart_value">
        
          <p>{data?.likes}</p>
        </div>
      </div>
      <div className="ProfileCard_paragraph">

          {`${data?.nft_description.substring(0, 75)} ...`}

      </div>
      <div className="ProfileCard_bid">
        {
          instantSale ? <p>price</p> : putOnSale ? <p>Current bid</p> : ""
        }
        {
          (instantSale || putOnSale) ? <div>{data?.amount}</div> : ""
        }
      </div>
      <div className="ProfileCard_bid_dollor">
        <p>{data?.price_USD}</p>
      </div>
      <Link to={data?.pathname}>View Details</Link>
    </div>
  );
};

export default ProfileCard;
