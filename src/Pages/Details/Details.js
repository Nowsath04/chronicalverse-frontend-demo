import coin from "../../Assets/coin.png";
import data_collection from "../../Assets/data-collection.png";
import paint_palette from "../../Assets/Group 13063.png";
import task_list from "../../Assets/Vector (1).png";
import "./Details.css";

const cardDetails = [
  {
    title: "Best collection",
    img: data_collection,
    description:
      "Art does not exist only to entertain, but also to challenge one to think",
  },
  {
    title: "List of theme",
    img: task_list,
    description:
      "Art does not exist only to entertain, but also to challenge one to think",
  },
  {
    title: "Great artists",
    img: paint_palette,
    description:
      "Art does not exist only to entertain, but also to challenge one to think",
  },
  {
    title: "Coin exchange",
    img: coin,
    description:
      "Art does not exist only to entertain, but also to challenge one to think",
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
              Lorem ipsum dolor sit amet consectetur. Viverra sagittis dignissim
              amet cursus urna vitae et. Amet aliquet volutpat ac at nunc.
            </p>
            <div className="Jesus_div1_details">
              <button className="Jesus_Button">See more</button>
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
            <button className="Jesus_Button">See more</button>
          </div>
        </div>
      </div>
    </>
  );
}
