import { useNavigate } from "react-router-dom";
import coin from "../../Assets/coin.png";
import data_collection from "../../Assets/data-collection.png";
import paint_palette from "../../Assets/Group 13063.png";
import task_list from "../../Assets/Vector (1).png";
import "./Details.css";
import { useEffect } from "react";

const cardDetails = [
  {
    title: "Best collection",
    img: data_collection,
    description:
      "Curating the finest NFT collection for ultimate digital art enthusiasts.",
  },
  {
    title: "List of theme",
    img: task_list,
    description:
      "Exceptional NFTs by great artists define a new era in creativity.",
  },
  {
    title: "Great artists",
    img: paint_palette,
    description:
      "Diverse NFT themes to captivate collectors with unique artistic expressions.",
  },
  {
    title: "Coin exchange",
    img: coin,
    description:
      "Trade art seamlessly with our cutting-edge NFT coin exchange platform.",
  },
];

function DetailsCard({ card }) {
  const { title, img, description } = card;

  return (
    <div className="Card">
      <div className="card_top">
        <img src={img} />
      </div>
      <div className="card_content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Details() {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClick = () => {
    navigate("/searchallcard")
  }
  
  return (
    <>
      <div className="About2">
        <div className="About2_div">
          <div className="About2_Content">
            <div className="About2_heading">
              We made great
              <br />
              <span>NFTs</span> for you
            </div>
            <p className="About2_paragraph">
              Explore greatness in every pixel with our meticulously crafted NFTs.
              Join us in redefining digital art as we bring you a collection designed exclusively for your appreciation.
            </p>
            <div className="Jesus_div1_details">
              <button className="Jesus_Button" onClick={handleClick}>See more</button>
            </div>
          </div>
          <div className="About2_Box">
            {cardDetails.map((card, index) => {
              return (
                <div className="About2_Box_container">
                  <DetailsCard card={card} className="Card_split" key={index} />
                </div>
              );
            })}
          </div>
          <div className="Jesus_div2_details">
            <button className="Jesus_Button" onClick={handleClick}>See more</button>
          </div>
        </div>
      </div>
    </>
  );
}
