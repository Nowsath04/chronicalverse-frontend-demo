import React from "react";
import "./itemDetailCard.css";
import followeImg from "../../Assets/Group 272.png";

const ItemDetailCard = ({ data,type }) => {
  return (
    <div className="itemDetailCard">
      <img src={data.imgpath} alt="" className="follower_profile_img" />
      <div className="Info_content">
        <p>{data.name} <span>({type})</span></p>
        <h4>{`${data?.userid?.substring(0,20)}..${data?.userid?.substring(30)}`}</h4>
      </div>
    </div>
  );
};

export default ItemDetailCard;
