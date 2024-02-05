import { Link } from "react-router-dom";
import "./Card1.css";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Card1({ item }) {
  console.log(item);
  return (
    <div className="Card1">
      <div className="topnft_card_div">
        <div className="topnft_card">
          <div className="topnft_img ">
            <img src={item.coverimg} />
          </div>
          <div className="topnft_displayImg">
            <img src={item.imgpath} className="displayImg" />
            <BsCheckCircleFill className="checkIcon" />
          </div>
          <div className="topnftcard_content">
            <h3>{item.name}</h3>
            <p>{`${item.bio.substring(0,36)}...`}</p>
            <div className="topnftcard_button">
              <Link to={`/otherprofile/onsale/${item.userid}`}>View Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
