import React from "react";
import "./itemDetailCard.css";
import followeImg from "../../Assets/Group 272.png";

const ItemDetailCard = ({ data }) => {
  return (
    <div className="itemDetailCard">
      <img src={data.img} alt="" className="follower_profile_img" />
      <img src={followeImg} className="follower_img" />
      <div className="Info_content">
        <p>{data.name}</p>
        <h4>{data.value}</h4>
      </div>
    </div>
  );
};

export default ItemDetailCard;
