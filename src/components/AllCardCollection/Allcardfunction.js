import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai"
import AllCard from "./AllCard";
import { Link } from "react-router-dom";


export default function Allcardfunction({ item }) {

  return (

    <div className="topnft_card4_div">
      <div className="topnft_card4">
        <div className="topnft_img4">
          <img src={item.image} />
        </div>
        <div className="topnftcard_content2">
          <div>
            <h3>{item.nft_name}</h3>
          </div>
         
        </div>
        <p className="topnftcard_content2_P">{`${item.nft_description.substring(0,95)}...`}</p>
  
        <div className="topnftcard_button2">
          <Link className="linkbutton" to={item.pathname}>View More</Link>
        </div>
      </div>
    </div>
  );
}
