import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai"
import AllCard from "./AllCard";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/userConstants";
import { useSelector } from "react-redux";
import "./AllCard.css"

export default function Allcardfunction({ item, usd }) {
  const [instantSale, setInstantSale] = useState(false)
  const [putOnSale, setPutOneSale] = useState(false)

  const { user } = useSelector((selector) => selector.auth);
  const handleClick = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/user-recommended`, { user: user.userid, collection_id: item.collection_id })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (item?.type == "instantSale") {
      setInstantSale(true)
    }
    if (item?.type == "putonsale") {
      setPutOneSale(true)
    }
  }, [item])


  return (
    <div className="Card2">
      <div className="topnft_card2_div">
        <div className="topnft_card2">
          <div className="topnft_img2">
            <img src={item?.image} />
          </div>
          <div className="topnftcard_content2">
            <div>
              {
                item.nft_name.length > 25 ? <h3>{`${item.nft_name.substring(0, 25)}...`}</h3> : <h3>{item.nft_name}</h3>
              }
            </div>
            <div
              style={{
                color: "#B8B8B8",
                fontSize: "0.8rem",
                display: "flex",
                gap: "5px",
              }}
            >
       
              {item.rightText1}
            </div>
          </div>
          <p className="topnftcard_content2_P">{`${item.nft_description.substring(0, 75)}...`}</p>
          <div className="item_price">
            {
              instantSale ? <div className="nft_price_title">Price</div> : putOnSale ? <div className="nft_price_title">current bid</div> : ""
            }
            <div className="nft_price">
              <p className="nft_matic_price">{item?.amount}Matic</p>
              <p>${(item?.amount * usd).toFixed(4)}</p>
            </div>
          </div>
          <div className="topnftcard_button2">
            <Link className="linkbutton" to={item.pathname} onClick={user ? handleClick : ""} >View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

