import {AiFillHeart} from "react-icons/ai"


export default function SearchCard({ item }) {
  return (
    <div className="Search_card">
      <div className="Search_card_img">
        <img src={item.image} />
      </div>
      <div className="topnftcard_content2">
        <div>
          <h3>{item.leftText1}</h3>
        </div>
        <div style={{ color: "#B8B8B8", fontSize: "0.8rem",display:"flex" ,gap:"5px" }}>
            <span className="cardheart_gredient_span"><AiFillHeart className="cardheart_gredient"/></span>
            {item.rightText1}
          </div>
      </div>
      <p className="topnftcard_content2_P">{item.description}</p>
      <div className="topnftcard_content2_price">
        <div style={{ fontSize: "0.875rem", color: "white" }}>
          {item.leftText2}
        </div>
        <div>
          <div className="griedient_text_card">
            {item.rightText2}
          </div>
          <div style={{ color: " #B8B8B8", fontSize: "0.875rem" }}>
            {item.rightText3}
          </div>
        </div>
      </div>
      <div className="topnftcard_button2">
        <button>Place bid</button>
      </div>
    </div>
  );
}
