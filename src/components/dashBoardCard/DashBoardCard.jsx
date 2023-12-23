import React from "react";
import "./DashBoardCard.css";

const DashBoardCard = ({ item }) => {
  return (
    <div className="dashboardcard">
      <img src={item.img} alt="" />
      <div className="dashboardcard_content">
        <div className="dashboardcard_name">
          <h4>{item.name}</h4>
          <div>
            <button>{item.type}</button>
          </div>
        </div>
        <p className="Dashboard_card_paragraph">
          The attack on Pearl Harbor was a surprise military strike by the
          imperial Japanese navy.
        </p>
        <div className="dashboardcard_rs">{item.dollar}</div>
        {item.transfer && item.to ? (
          <div className="dashboardcard_name">
            <p>{item.transfer}</p>
            <p>{item.to}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashBoardCard;
